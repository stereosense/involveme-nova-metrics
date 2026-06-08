import FunnelMetric from './components/FunnelMetric';
import MultipleValueMetric from './components/MultipleValueMetric';
import TrendMetric from './components/TrendMetric';

Nova.booting((app, store) => {
    app.component('funnel-metric', FunnelMetric);
    app.component('multiple-value-metric', MultipleValueMetric);
    app.component('date-range-trend-metric', TrendMetric);
});
