<?php

namespace Involveme\Metrics;

use Laravel\Nova\Nova;
use Carbon\CarbonImmutable;
use Laravel\Nova\Metrics\RangedMetric;
use Laravel\Nova\Http\Requests\NovaRequest;

class MultipleValueMetric extends RangedMetric
{
    public $width = '2/3';
    public function component()
    {
        return 'multiple-value-metric';
    }
    protected function currentRange(NovaRequest $request)
    {
        $range = $request->range;
        $timezone = Nova::resolveUserTimezone($request) ?? $this->getDefaultTimezone($request);

        if ($request->filled('startDate') && $request->filled('endDate')) {
            return [
                CarbonImmutable::parse($request->get('startDate'), $timezone)->startOfDay(),
                CarbonImmutable::parse($request->get('endDate'), $timezone)->endOfDay(),
            ];
        }

        if ($range === 'TODAY') {
            return [
                CarbonImmutable::now($timezone)->startOfDay(),
                CarbonImmutable::now($timezone)->endOfDay(),
            ];
        }

        if ($range === 'YESTERDAY') {
            return [
                CarbonImmutable::now($timezone)->subDay()->startOfDay(),
                CarbonImmutable::now($timezone)->subDay()->endOfDay(),
            ];
        }

        if ($range === 'MTD') {
            return [
                CarbonImmutable::now($timezone)->startOfMonth(),
                CarbonImmutable::now($timezone),
            ];
        }

        if ($range === 'QTD') {
            return $this->currentQuarterRange($timezone);
        }

        if ($range === 'YTD') {
            return [
                CarbonImmutable::now($timezone)->startOfYear(),
                CarbonImmutable::now($timezone),
            ];
        }

        return false;
    }

    protected function currentQuarterRange($timezone)
    {
        return [
            CarbonImmutable::now($timezone)->startOfQuarter(),
            CarbonImmutable::now($timezone),
        ];
    }

    private function getDefaultTimezone($request)
    {
        return $request->timezone ?? config('app.timezone');
    }
}
