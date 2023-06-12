<?php

namespace Involveme\Metrics\Console;

use Illuminate\Console\GeneratorCommand;

class MultipleValueMetricCommand extends GeneratorCommand
{

    protected $name = 'nova:multiple-value-metric';
    protected $description = 'Create a new multiple value metric class';
    protected $type = 'MultipleValueMetric';

    protected function getStub()
    {
        return __DIR__.'/stubs/multiple-value-metric.stub';
    }

    protected function getDefaultNamespace($rootNamespace)
    {
        return $rootNamespace.'\Nova\Metrics';
    }
}
