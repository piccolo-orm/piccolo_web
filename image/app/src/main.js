import Vue from 'vue'
import VueAnalytics from 'vue-analytics'
import VueHighlightJS from 'vue-highlightjs'
import App from './App.vue'
import './icons.js'

Vue.use(VueHighlightJS)

Vue.config.productionTip = false

/*****************************************************************************/

import router from './router'
import store from './store'


Vue.use(
    VueAnalytics,
    {
        id: 'UA-16187310-13',
        router,
        debug: {
            enabled: false
        }
    }
)

/*****************************************************************************/

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
