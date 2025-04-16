<template>
  <Card class="py-3 im-nova-metrics">
    <div class="h-6 flex items-center px-6 mb-4">
      <h3 class="mr-3 leading-tight text-sm font-bold">{{card.name}}</h3>
      <SelectControl
          v-if="hasRanges"
          v-model="selectedRangeKey"
          :aria-label="__('Select Ranges')"
          :options="card.ranges"
          class="ml-auto w-[9rem] flex-shrink-0"
          size="xxs"
          @selected="handleRangeSelected"
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
  </Card>
</template>

<script>
import MetricBehavior from '../mixins/MetricBehavior'
export default {
  props: [
    'card',
  ],
  mixins: [MetricBehavior],
  data: () => ({
    metricsData: [],
    selectedRangeKey: null,
  }),
  computed: {
    hasRanges() {
      return this.card.ranges.length > 0;
    },
    metricPayload() {
      const payload = {
        params: {
          timezone: this.userTimezone
        },
      }
      if (this.hasRanges) {
        payload.params.range = this.selectedRangeKey
      }
      return payload
    },
  },
  created() {
    if (this.hasRanges) {
      this.selectedRangeKey =
          this.card.selectedRangeKey || this.card.ranges[0].value
    }
    this.fetch()
  },
  methods: {
    handleFetchCallback() {
      return (response) => {
        this.metricsData = response.data.value;
      }
    },
  }
};
</script>
