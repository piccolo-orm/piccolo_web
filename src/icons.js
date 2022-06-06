import Vue from 'vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import {
    faCaretRight,
    faCheck,
    faChevronCircleLeft,
    faChevronCircleRight,
    faChevronLeft,
    faChevronRight,
    faComment,
    faExternalLinkAlt,
    faFile,
    faMoon,
    faRss,
    faSearch,
    faSun,
    faTimes,
    faTools
} from '@fortawesome/free-solid-svg-icons'
import { faGithub, faPython, faTwitter, faYoutube } from '@fortawesome/free-brands-svg-icons'

// It's important to load the CSS, otherwise the unsaturated version of the
// website will be missing these styles.
import '@fortawesome/fontawesome-svg-core/styles.css'

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(
    faCaretRight,
    faCheck,
    faChevronCircleLeft,
    faChevronCircleRight,
    faChevronLeft,
    faChevronRight,
    faComment,
    faExternalLinkAlt,
    faFile,
    faGithub,
    faMoon,
    faPython,
    faRss,
    faSearch,
    faSun,
    faTimes,
    faTools,
    faTwitter,
    faYoutube
)

Vue.component('font-awesome-icon', FontAwesomeIcon)
