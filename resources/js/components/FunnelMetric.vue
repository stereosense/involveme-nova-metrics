<template>
  <LoadingCard :loading="loading" class="py-3 im-nova-metrics">
    <div class="h-6 flex items-center justify-between px-6 mb-4">
      <h3 class="mr-3 leading-tight text-sm font-bold">{{ card.name }}</h3>
      <Datepicker
          dark
          :enable-time-picker="false"
          v-if="hasRanges"
          v-model="dateRange"
          range
          format="dd/MM/yyyy"
          :preset-dates="presetValues"
          :placeholder="__('Custom Range')"
          class="ml-4 w-[18rem]"
          teleport
          @update:modelValue="handleDateRangeSelected"
      />
    </div>


    <div class="flex flex-wrap items-center justify-start px-6">
      <div v-for="(metricData, idx) in metricsData" :key="idx"
           class="flex items-center justify-between h-14 w-1/4 ">
        <div class="flex justify-between flex-1 items-center space-x-3">
          <span class="text-4xl">{{ formatNumber(metricData.value) }}</span>
          <div class="flex flex-col flex-grow text-center">
            <a v-if="metricData.link" :href="metricData.link" :title="metricData.tooltip" target="_blank"
               class="link-default flex-grow">{{ metricData.name }}</a>
            <span v-else :title="metricData.tooltip" class="flex-grow">{{ metricData.name }}</span>
            <div>
                            <span class="text-sm"
                                  title="Compared to previous">{{ calculatePercentageTo(idx, idx - 1) }}%</span>
              <span v-if="idx > 1" class="text-sm font-bold"
                    title="Compared to first">&nbsp;/ {{ calculatePercentageTo(idx, 0) }}%</span>
            </div>
          </div>
        </div>
        <div v-if="idx !== (metricsData.length - 1)">
          <svg class="w-12 h-12" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"
               xmlns="http://www.w3.org/2000/svg">
            <path d="M8.25 4.5l7.5 7.5-7.5 7.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
      </div>
    </div>
  </LoadingCard>
</template>

<script>

import MetricBehavior from '../mixins/MetricBehavior'
import Datepicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'

export default {
  props: [
    'card',
  ],
  mixins: [MetricBehavior],
  data: () => ({
    metricsData: [],
    startDate: null,
    endDate: null,
    loading: true,
  }),
  components: {
    Datepicker,
  },
  computed: {
    dateRange: {
      get() {
        return this.startDate && this.endDate ? [this.startDate, this.endDate] : null
      },
      set(val) {
        if (Array.isArray(val) && val.length === 2) {
          this.startDate = val[0]
          this.endDate = val[1]
        } else {
          this.startDate = null
          this.endDate = null
        }
      }
    },
    presetValues() {
      const today = new Date()

      return this.card.ranges
          .map(({ label, value }) => {
            let startDate = null

            if (typeof value === 'number') {
              const start = new Date(today)
              start.setDate(today.getDate() - value + 1)
              startDate = start
            } else {
              switch (value) {
                case 'TODAY':
                  startDate = new Date(today)
                  break
                case 'MTD':
                  startDate = new Date(today.getFullYear(), today.getMonth(), 1)
                  break
                case 'QTD': {
                  const startMonth = Math.floor(today.getMonth() / 3) * 3
                  startDate = new Date(today.getFullYear(), startMonth, 1)
                  break
                }
                case 'YTD':
                  startDate = new Date(today.getFullYear(), 0, 1)
                  break
                case 'ALL':
                  return null
              }
            }

            return startDate ? { label: label, value: [startDate, today] } : null
          })
          .filter(Boolean)
    },
    hasRanges() {
      return this.card.ranges.length > 0;
    },
    metricPayload() {
      const params = {
        timezone: this.userTimezone,
      }

      if (this.startDate && this.endDate) {
        params.startDate = this.startDate.toISOString().split('T')[0]
        params.endDate = this.endDate.toISOString().split('T')[0]
      }

      return { params }
    },
  },
  created() {
    const today = new Date()
    const firstRange = this.card.ranges[0]

    if (firstRange) {
      let startDate = null

      if (typeof firstRange.value === 'number') {
        const start = new Date(today)
        start.setDate(today.getDate() - firstRange.value + 1)
        startDate = start
      } else {
        switch (firstRange.value) {
          case 'TODAY':
            startDate = new Date(today)
            break
          case 'MTD':
            startDate = new Date(today.getFullYear(), today.getMonth(), 1)
            break
          case 'QTD': {
            const startMonth = Math.floor(today.getMonth() / 3) * 3
            startDate = new Date(today.getFullYear(), startMonth, 1)
            break
          }
          case 'YTD':
            startDate = new Date(today.getFullYear(), 0, 1)
            break
          case 'ALL':
            startDate = new Date(1900, 0, 1)
            break
        }
      }

      if (startDate) {
        this.startDate = startDate
        this.endDate = today
      }
    }

    this.fetch()
  },
  methods: {
    handleDateRangeSelected() {
      this.fetch()
    },
    handleFetchCallback() {
      return (response) => {
        this.metricsData = response.data.value;
        this.loading = false;
      }
    },
    calculatePercentageTo(idx, idy) {
      if (idx === 0) {
        return 100;
      }
      if (this.metricsData[idy].value === 0) {
        return 0;
      }
      return Math.round((this.metricsData[idx].value / this.metricsData[idy].value) * 10000) / 100;
    },
    formatNumber(number) {
      return new Intl.NumberFormat('en-US', {maximumFractionDigits: 0}).format(number);
    }
  }
};
</script>
