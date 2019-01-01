import Vue from 'vue'
import VueHighlightJS from 'vue-highlightjs'
import App from './App.vue'

Vue.use(VueHighlightJS)

Vue.config.productionTip = false

/*****************************************************************************/

import router from './router'
import store from './store'

if (process.env.NODE_ENV == 'production') {
    import VueAnalytics from 'vue-analytics'
    Vue.use(
        VueAnalytics,
        {
            id: 'UA-16187310-13',
            router
        }
    )
}

/*****************************************************************************/

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
