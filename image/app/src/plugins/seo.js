export default {
    install: function(Vue, options) {
        Vue.prototype.$seo = {
            // Config should contain title and description attributes
            updateTags: function(config) {
                if (config.title) {
                    let title = document.head.querySelector("title")
                    title.innerText = config.title
                }
                if (config.description) {
                    let description = document.head.querySelector("meta[name=description]")
                    description.content = config.description
                }
            }
        }
    }
}
