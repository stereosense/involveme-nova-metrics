<?php

namespace Involveme\Metrics;

use Carbon\CarbonImmutable;
use Carbon\CarbonInterface;
use Laravel\Nova\Http\Requests\NovaRequest;
use Laravel\Nova\Metrics\Trend;

class TrendMetric extends Trend
{
    public $component = 'date-range-trend-metric';

    protected ?CarbonInterface $custom_ending_date = null;

    public function getCacheKey(NovaRequest $request)
    {
        return parent::getCacheKey($request)
            . '.' . $request->input('startDate', 'no-start')
            . '.' . $request->input('endDate', 'no-end');
    }

    protected function getAggregateStartingDate(NovaRequest $request, string $unit, ?string $timezone): CarbonInterface
    {
        if ($request->filled('startDate') && $request->filled('endDate')) {
            $this->custom_ending_date = CarbonImmutable::parse($request->input('endDate'), $timezone)->endOfDay();

            return CarbonImmutable::parse($request->input('startDate'), $timezone)->startOfDay();
        }

        $this->custom_ending_date = null;

        return parent::getAggregateStartingDate($request, $unit, $timezone);
    }

    protected function getAggregateEndingDate(?string $timezone): CarbonInterface
    {
        return $this->custom_ending_date ?? parent::getAggregateEndingDate($timezone);
    }
}
