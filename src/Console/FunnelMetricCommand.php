<?php

namespace Involveme\Metrics\Console;

use Illuminate\Console\GeneratorCommand;

class FunnelMetricCommand extends GeneratorCommand
{
    protected $name = 'nova:funnel-metric';
    protected $description = 'Create a new funnel metric class';
    protected $type = 'FunnelMetric';

    protected function getStub()
    {
        return __DIR__.'/stubs/funnel-metric.stub';
    }

    protected function getDefaultNamespace($rootNamespace)
    {
        return $rootNamespace.'\Nova\Metrics';
    }
}
