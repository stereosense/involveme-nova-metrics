<template>
  <div class="relative im-nova-metrics">
    <BaseTrendMetric
      :title="card.name"
      :help-text="card.helpText"
      :help-width="card.helpWidth"
      :value="value"
      :chart-data="data"
      :ranges="[]"
      :format="format"
      :prefix="prefix"
      :suffix="suffix"
      :suffix-inflection="suffixInflection"
      :loading="loading"
    />

    <div v-if="hasRanges" class="absolute right-6 top-4 z-20">
      <Datepicker
          dark
          :enable-time-picker="false"
          v-model="dateRange"
          range
          format="dd/MM/yyyy"
          :preset-dates="presetValues"
          :clearable="false"
          teleport
          @update:modelValue="handleDateRangeSelected"
      >
        <template #trigger>
          <button
              type="button"
              :title="__('Select date range')"
              class="flex items-center gap-1.5 text-gray-400 hover:text-gray-500"
          >
            <span v-if="rangeLabel" class="text-xs leading-none whitespace-nowrap">{{ rangeLabel }}</span>
            <svg class="h-4 w-4 shrink-0" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fill-rule="evenodd"
                    d="M6 2a1 1 0 0 1 1 1v1h6V3a1 1 0 1 1 2 0v1h1a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h1V3a1 1 0 0 1 1-1Zm10 6H4v8h12V8Z"
                    clip-rule="evenodd"/>
            </svg>
          </button>
        </template>
      </Datepicker>
    </div>
  </div>
</template>

<script>
import MetricBehavior from '../mixins/MetricBehavior'
import DateRangeBehavior from '../mixins/DateRangeBehavior'
import Datepicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'

export default {
  props: ['card'],

  mixins: [MetricBehavior, DateRangeBehavior],

  components: {
    Datepicker,
  },

  data: () => ({
    loading: true,
    value: '',
    data: [],
    format: '(0[.]00a)',
    prefix: '',
    suffix: '',
    suffixInflection: true,
  }),

  created() {
    this.initDateRange()
    this.fetch()
  },

  computed: {
    metricPayload() {
      return {
        params: {
          timezone: this.userTimezone,
          twelveHourTime: false,
          ...this.dateRangeParams,
        },
      }
    },
  },

  methods: {
    handleDateRangeSelected() {
      this.fetch()
    },

    handleFetchCallback() {
      return ({ data: { value: result } }) => {
        const trend = result.trend

        this.value = result.value
        this.data = {
          labels: Object.keys(trend),
          series: [
            Object.entries(trend).map(([key, val]) => ({ meta: `${key}`, value: val })),
          ],
        }
        this.format = result.format || this.format
        this.prefix = result.prefix || this.prefix
        this.suffix = result.suffix || this.suffix
        this.suffixInflection = result.suffixInflection
        this.loading = false
      }
    },
  },
}
</script>
