<template>
    <Card class="py-3 im-nova-metrics">
        <div class="h-6 flex items-center px-6 mb-4">
            <h3 class="mr-3 leading-tight text-sm font-bold">{{card.name}}</h3>
            <SelectControl
                v-if="hasRanges"
                v-model:selected="selectedRangeKey"
                :aria-label="__('Select Ranges')"
                :options="ranges"
                class="ml-auto w-[9rem] flex-shrink-0"
                size="xxs"
                @change="fetchData"
            />
        </div>


        <div class="flex items-center justify-between px-6">
            <div v-for="(metricData, idx) in metricsData" :key="idx" class="flex space-x-8">
                <div class="flex items-center space-x-6">
                    <span class="text-4xl">{{ formatNumber(metricData.value) }}</span>
                    <div class="flex flex-col text-center">
                        <a v-if="metricData.link" :href="metricData.link" :title="metricData.tooltip" target="_blank" class="link-default">{{ metricData.name }}</a>
                        <span v-else class="text-base" :title="metricData.tooltip">{{ metricData.name }}</span>
                        <span class="text-sm" title="Compared to previous">{{calculatePercentageToPrevious(idx)}}%</span>
                        <span v-if="![0,1].includes(idx)" class="text-sm" title="Compared to first">/ {{calculatePercentageToFirst(idx)}}%</span>
                    </div>
                </div>
                <div v-if="idx !== (metricsData.length - 1)">
                    <svg class="w-14 h-14" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M8.25 4.5l7.5 7.5-7.5 7.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
                </div>
            </div>
        </div>
    </Card>
</template>

<script>
    export default {
        props: [
            'card',
        ],
        data: () => ({
            route: null,
            metricsData: [],
            ranges: [],
            selectedRangeKey: null,
        }),
        computed: {
            hasRanges() {
                return this.card.ranges.length > 0;
            },
        },
        created() {
            this.route = `/nova-api/metrics/${this.card.uriKey}`;
            this.ranges = this.card.ranges;
            console.log(this.card);
            if(this.hasRanges) {
                this.selectedRangeKey = this.card.selectedRangeKey || this.card.ranges[0].value;
            }
            this.fetchData(this.selectedRangeKey);
        },
        methods: {
            fetchData(range) {
                Nova.request().get(this.route, {
                    params: {
                        range: range,
                    },
                })
                    .then(response => {
                        this.metricsData = response.data.value;
                    })
                    .catch(error => {
                        console.log('error', error);
                    });
            },
            calculatePercentageToPrevious(idx) {
                if(idx === 0) {
                    return 100;
                }
                if(this.metricsData[idx - 1].value === 0) {
                    return 0;
                }
                return Math.round((this.metricsData[idx].value / this.metricsData[idx - 1].value) * 10000) / 100;
            },
            calculatePercentageToFirst(idx) {
                if(idx === 0) {
                    return 100;
                }
                if(this.metricsData[0].value === 0) {
                    return 0;
                }
                return Math.round((this.metricsData[idx].value / this.metricsData[0].value) * 10000) / 100;
            },
            formatNumber(number) {
                return new Intl.NumberFormat('us-US', {maximumFractionDigits:0}).format(number);
            }
        }
    };
</script>
