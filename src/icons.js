import Vue from 'vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import {
    faCaretRight,
    faChevronCircleLeft,
    faChevronCircleRight,
    faChevronLeft,
    faCheck,
    faComment,
    faExternalLinkAlt
} from '@fortawesome/free-solid-svg-icons'
import { faPython } from '@fortawesome/free-brands-svg-icons'

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(
    faCaretRight,
    faChevronCircleLeft,
    faChevronCircleRight,
    faChevronLeft,
    faCheck,
    faComment,
    faPython,
    faExternalLinkAlt
)

Vue.component('font-awesome-icon', FontAwesomeIcon)
