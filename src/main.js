// This is the main.js file. Import global CSS and scripts here.
// The Client API can be used here. Learn more: gridsome.org/docs/client-api

import VueAnalytics from 'vue-analytics'

import 'prismjs/themes/prism-tomorrow.css'
import DefaultLayout from '~/layouts/Default.vue'
import './icons.js'
import './assets/css/prism-railscasts.css'

export default function (Vue, { router, head, isClient }) {
    // Set default layout as a global component
    Vue.component('Layout', DefaultLayout)

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

    head.link.push({
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css?family=Open+Sans&display=swap'
    })
    // https://fonts.googleapis.com/css?family=Source+Sans+Pro&display=swap

    Vue.filter('customString', function (value) {
        var monthNames = [
            'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
        ]

        if (!value) {
            return ''
        }

        if (typeof (value) == "string") {
            value = new Date(value)
        }

        let day = value.getDate()
        let month = monthNames[value.getMonth()]
        let year = value.getUTCFullYear()
        return `${day} ${month} ${year}`
    })
}
