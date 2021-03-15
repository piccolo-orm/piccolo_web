import Vue from 'vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import {
    faCaretRight,
    faCheck,
    faChevronCircleLeft,
    faChevronCircleRight,
    faChevronLeft,
    faComment,
    faExternalLinkAlt,
    faTimes,
} from '@fortawesome/free-solid-svg-icons'
import { faPython } from '@fortawesome/free-brands-svg-icons'

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(
    faCaretRight,
    faCheck,
    faChevronCircleLeft,
    faChevronCircleRight,
    faChevronLeft,
    faComment,
    faExternalLinkAlt,
    faPython,
    faTimes,
)

Vue.component('font-awesome-icon', FontAwesomeIcon)
