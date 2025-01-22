(()=>{"use strict";var e,t={187:(e,t,a)=>{const n=Vue;var r={class:"h-6 flex items-center px-6 mb-4"},l={class:"mr-3 leading-tight text-sm font-bold"},o={class:"flex items-center justify-between px-6"},s={class:"flex items-center space-x-6"},c={class:"text-4xl"},i={class:"flex flex-col text-center"},u=["href","title"],m=["title"],d={class:"text-sm",title:"Compared to previous"},h={key:2,class:"text-sm",title:"Compared to first"},p={key:0};const g={props:["card"],data:function(){return{route:null,metricsData:[],ranges:[],selectedRangeKey:null}},computed:{hasRanges:function(){return this.card.ranges.length>0}},created:function(){this.route="/nova-api/metrics/".concat(this.card.uriKey),this.ranges=this.card.ranges,console.log(this.card),this.hasRanges&&(this.selectedRangeKey=this.card.selectedRangeKey||this.card.ranges[0].value),this.fetchData(this.selectedRangeKey)},methods:{fetchData:function(e){var t=this;Nova.request().get(this.route,{params:{range:e}}).then((function(e){t.metricsData=e.data.value})).catch((function(e){console.log("error",e)}))},calculatePercentageToPrevious:function(e){return 0===e?100:0===this.metricsData[e-1].value?0:Math.round(this.metricsData[e].value/this.metricsData[e-1].value*1e4)/100},calculatePercentageToFirst:function(e){return 0===e?100:0===this.metricsData[0].value?0:Math.round(this.metricsData[e].value/this.metricsData[0].value*1e4)/100},formatNumber:function(e){return new Intl.NumberFormat("us-US",{maximumFractionDigits:0}).format(e)}}};var f=a(262);const v=(0,f.A)(g,[["render",function(e,t,a,g,f,v){var k=(0,n.resolveComponent)("SelectControl"),x=(0,n.resolveComponent)("Card");return(0,n.openBlock)(),(0,n.createBlock)(x,{class:"py-3 im-nova-metrics"},{default:(0,n.withCtx)((function(){return[(0,n.createElementVNode)("div",r,[(0,n.createElementVNode)("h3",l,(0,n.toDisplayString)(a.card.name),1),v.hasRanges?((0,n.openBlock)(),(0,n.createBlock)(k,{key:0,selected:e.selectedRangeKey,"onUpdate:selected":t[0]||(t[0]=function(t){return e.selectedRangeKey=t}),"aria-label":e.__("Select Ranges"),options:e.ranges,class:"ml-auto w-[9rem] flex-shrink-0",size:"xxs",onChange:v.fetchData},null,8,["selected","aria-label","options","onChange"])):(0,n.createCommentVNode)("",!0)]),(0,n.createElementVNode)("div",o,[((0,n.openBlock)(!0),(0,n.createElementBlock)(n.Fragment,null,(0,n.renderList)(e.metricsData,(function(a,r){return(0,n.openBlock)(),(0,n.createElementBlock)("div",{key:r,class:"flex space-x-8"},[(0,n.createElementVNode)("div",s,[(0,n.createElementVNode)("span",c,(0,n.toDisplayString)(v.formatNumber(a.value)),1),(0,n.createElementVNode)("div",i,[a.link?((0,n.openBlock)(),(0,n.createElementBlock)("a",{key:0,href:a.link,title:a.tooltip,target:"_blank",class:"link-default"},(0,n.toDisplayString)(a.name),9,u)):((0,n.openBlock)(),(0,n.createElementBlock)("span",{key:1,class:"text-base",title:a.tooltip},(0,n.toDisplayString)(a.name),9,m)),(0,n.createElementVNode)("span",d,(0,n.toDisplayString)(v.calculatePercentageToPrevious(r))+"%",1),[0,1].includes(r)?(0,n.createCommentVNode)("",!0):((0,n.openBlock)(),(0,n.createElementBlock)("span",h,"/ "+(0,n.toDisplayString)(v.calculatePercentageToFirst(r))+"%",1))])]),r!==e.metricsData.length-1?((0,n.openBlock)(),(0,n.createElementBlock)("div",p,t[1]||(t[1]=[(0,n.createElementVNode)("svg",{class:"w-14 h-14",fill:"none",stroke:"currentColor","stroke-width":"1.5",viewBox:"0 0 24 24",xmlns:"http://www.w3.org/2000/svg"},[(0,n.createElementVNode)("path",{d:"M8.25 4.5l7.5 7.5-7.5 7.5","stroke-linecap":"round","stroke-linejoin":"round"})],-1)]))):(0,n.createCommentVNode)("",!0)])})),128))])]})),_:1})}]]);var k={class:"h-6 flex items-center px-6 mb-4"},x={class:"mr-3 leading-tight text-sm font-bold"},y={class:"grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-2 gap-y-4"},D={class:"text-4xl"},B={class:"flex flex-col text-center"},E=["href","title"],b=["title"];const N={props:["card"],data:function(){return{route:null,metricsData:[],ranges:[],selectedRangeKey:null}},computed:{hasRanges:function(){return this.card.ranges.length>0}},created:function(){this.route="/nova-api/metrics/".concat(this.card.uriKey),this.ranges=this.card.ranges,this.hasRanges&&(this.selectedRangeKey=this.card.selectedRangeKey||this.card.ranges[0].value),this.fetchData(this.selectedRangeKey)},methods:{fetchData:function(e){var t=this;Nova.request().get(this.route,{params:{range:e}}).then((function(e){t.metricsData=e.data.value})).catch((function(e){console.log("error",e)}))}}},C=(0,f.A)(N,[["render",function(e,t,a,r,l,o){var s=(0,n.resolveComponent)("SelectControl"),c=(0,n.resolveComponent)("Card");return(0,n.openBlock)(),(0,n.createBlock)(c,{class:"py-3 im-nova-metrics"},{default:(0,n.withCtx)((function(){return[(0,n.createElementVNode)("div",k,[(0,n.createElementVNode)("h3",x,(0,n.toDisplayString)(a.card.name),1),(0,n.createVNode)(s,{selected:e.selectedRangeKey,"onUpdate:selected":t[0]||(t[0]=function(t){return e.selectedRangeKey=t}),"aria-label":e.__("Select Ranges"),options:e.ranges,class:"ml-auto w-[9rem] flex-shrink-0",size:"xxs",onChange:o.fetchData},null,8,["selected","aria-label","options","onChange"])]),(0,n.createElementVNode)("div",y,[((0,n.openBlock)(!0),(0,n.createElementBlock)(n.Fragment,null,(0,n.renderList)(e.metricsData,(function(e,t){return(0,n.openBlock)(),(0,n.createElementBlock)("div",{key:t,class:"justify-center text-center"},[(0,n.createElementVNode)("span",D,(0,n.toDisplayString)(e.value),1),(0,n.createElementVNode)("div",B,[e.link?((0,n.openBlock)(),(0,n.createElementBlock)("a",{key:0,href:e.link,title:e.tooltip,target:"_blank",class:"link-default"},(0,n.toDisplayString)(e.name),9,E)):((0,n.openBlock)(),(0,n.createElementBlock)("span",{key:1,class:"text-base",title:e.tooltip},(0,n.toDisplayString)(e.name),9,b))])])})),128))])]})),_:1})}]]);Nova.booting((function(e,t){e.component("funnel-metric",v),e.component("multiple-value-metric",C)}))},799:()=>{},262:(e,t)=>{t.A=(e,t)=>{const a=e.__vccOpts||e;for(const[e,n]of t)a[e]=n;return a}}},a={};function n(e){var r=a[e];if(void 0!==r)return r.exports;var l=a[e]={exports:{}};return t[e](l,l.exports,n),l.exports}n.m=t,e=[],n.O=(t,a,r,l)=>{if(!a){var o=1/0;for(u=0;u<e.length;u++){for(var[a,r,l]=e[u],s=!0,c=0;c<a.length;c++)(!1&l||o>=l)&&Object.keys(n.O).every((e=>n.O[e](a[c])))?a.splice(c--,1):(s=!1,l<o&&(o=l));if(s){e.splice(u--,1);var i=r();void 0!==i&&(t=i)}}return t}l=l||0;for(var u=e.length;u>0&&e[u-1][2]>l;u--)e[u]=e[u-1];e[u]=[a,r,l]},n.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),(()=>{var e={192:0,757:0};n.O.j=t=>0===e[t];var t=(t,a)=>{var r,l,[o,s,c]=a,i=0;if(o.some((t=>0!==e[t]))){for(r in s)n.o(s,r)&&(n.m[r]=s[r]);if(c)var u=c(n)}for(t&&t(a);i<o.length;i++)l=o[i],n.o(e,l)&&e[l]&&e[l][0](),e[l]=0;return n.O(u)},a=self.webpackChunkinvolveme_metrics_funnel=self.webpackChunkinvolveme_metrics_funnel||[];a.forEach(t.bind(null,0)),a.push=t.bind(null,a.push.bind(a))})(),n.O(void 0,[757],(()=>n(187)));var r=n.O(void 0,[757],(()=>n(799)));r=n.O(r)})();