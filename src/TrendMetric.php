<?php

namespace Involveme\Metrics;

use Carbon\CarbonImmutable;
use Carbon\CarbonInterface;
use Illuminate\Contracts\Database\Eloquent\Builder;
use Illuminate\Contracts\Database\Query\Expression;
use Illuminate\Database\Eloquent\Model;
use Laravel\Nova\Http\Requests\NovaRequest;
use Laravel\Nova\Metrics\Trend;
use Laravel\Nova\Metrics\TrendResult;

class TrendMetric extends Trend
{
    public $component = 'date-range-trend-metric';

    public const WEEKLY_GRANULARITY_THRESHOLD = 60;

    protected ?CarbonInterface $custom_ending_date = null;

    public function getCacheKey(NovaRequest $request)
    {
        return parent::getCacheKey($request)
            . '.' . $request->input('startDate', 'no-start')
            . '.' . $request->input('endDate', 'no-end');
    }

    protected function aggregate(NovaRequest $request, Builder|Model|string $model, string $unit, string $function, Expression|string|null $column, ?string $dateColumn): TrendResult
    {
        return parent::aggregate($request, $model, $this->resolveUnit($request, $unit), $function, $column, $dateColumn);
    }

    protected function resolveUnit(NovaRequest $request, string $unit): string
    {
        if ($unit === self::BY_DAYS && $this->resolveRangeInDays($request) >= self::WEEKLY_GRANULARITY_THRESHOLD) {
            return self::BY_WEEKS;
        }

        return $unit;
    }

    protected function resolveRangeInDays(NovaRequest $request): int
    {
        if ($request->filled('startDate') && $request->filled('endDate')) {
            $start = CarbonImmutable::parse($request->input('startDate'))->startOfDay();
            $end = CarbonImmutable::parse($request->input('endDate'))->startOfDay();

            return (int) $start->diffInDays($end) + 1;
        }

        return (int) ($request->range ?? 1);
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
