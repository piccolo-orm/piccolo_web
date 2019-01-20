import Vue from 'vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faCaretRight, faChevronCircleLeft, faChevronCircleRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faCaretRight, faChevronCircleLeft, faChevronCircleRight)

Vue.component('font-awesome-icon', FontAwesomeIcon)
