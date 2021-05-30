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
    faFile,
    faMoon,
    faSearch,
    faSun,
    faTimes,
    faTools
} from '@fortawesome/free-solid-svg-icons'
import { faGithub, faPython } from '@fortawesome/free-brands-svg-icons'

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(
    faCaretRight,
    faCheck,
    faChevronCircleLeft,
    faChevronCircleRight,
    faChevronLeft,
    faComment,
    faExternalLinkAlt,
    faFile,
    faGithub,
    faMoon,
    faPython,
    faSearch,
    faSun,
    faTimes,
    faTools
)

Vue.component('font-awesome-icon', FontAwesomeIcon)
