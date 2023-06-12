<?php

namespace Involveme\Metrics;

use Laravel\Nova\Nova;
use Carbon\CarbonImmutable;
use Laravel\Nova\Metrics\RangedMetric;
use Laravel\Nova\Http\Requests\NovaRequest;

class FunnelMetric extends RangedMetric
{
    public $width = '2/3';
    public function component()
    {
        return 'funnel-metric';
    }
    protected function currentRange(NovaRequest $request)
    {
        $range = $request->range;
        $timezone = Nova::resolveUserTimezone($request) ?? $this->getDefaultTimezone($request);

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
        if ($range === 'ALL') {
            return false;
        }

        return [
            CarbonImmutable::now($timezone)->subDays($range),
            CarbonImmutable::now($timezone),
        ];
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
