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
          style="z-index: 100"
          teleport
          @update:modelValue="handleDateRangeSelected"
      />
    </div>

    <div class="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-2 gap-y-4">
      <div v-for="(metricData, idx) in metricsData" :key="idx" class="justify-center text-center">
        <span class="text-4xl">{{ metricData.value }}</span>
        <div class="flex flex-col text-center">
          <a v-if="metricData.link" :href="metricData.link" :title="metricData.tooltip" target="_blank" class="link-default">{{ metricData.name }}</a>
          <span v-else class="text-base" :title="metricData.tooltip">{{ metricData.name }}</span>
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
  props: ['card'],
  mixins: [MetricBehavior],
  components: {
    Datepicker,
  },
  data: () => ({
    metricsData: [],
    startDate: null,
    endDate: null,
    loading: true,
  }),
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
                  startDate = new Date(1900, 0, 1)
                  break
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
        this.metricsData = response.data.value
        this.loading = false
      }
    },
  }
}
</script>
