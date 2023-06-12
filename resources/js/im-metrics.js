import FunnelMetric from './components/FunnelMetric';
import MultipleValueMetric from './components/MultipleValueMetric';

Nova.booting((app, store) => {
    app.component('funnel-metric', FunnelMetric);
    app.component('multiple-value-metric', MultipleValueMetric);
});
