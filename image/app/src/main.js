import Vue from 'vue'
import VueHighlightJS from 'vue-highlightjs'
import App from './App.vue'

Vue.use(VueHighlightJS)

Vue.config.productionTip = false

/*****************************************************************************/

import { library } from '@fortawesome/fontawesome-svg-core'
//import { faGithub } from '@fortawesome/fontawesome-free-brands'
//import { faGithub } from '@fortawesome/vue-fontawesome'

//library.add(faGithub)

//Vue.component('font-awesome-icon', FontAwesomeIcon)

/*****************************************************************************/

new Vue({
  render: h => h(App)
}).$mount('#app')
