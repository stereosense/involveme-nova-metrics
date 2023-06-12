let mix = require('laravel-mix');
require('./nova.mix');

mix
    .setPublicPath('dist')
    .js('resources/js/im-metrics.js', 'js')
    .vue({version: 3})
    .postCss('resources/css/im-metrics.css', 'css', [require('tailwindcss')])
    .nova('involveme/metrics-funnel');
