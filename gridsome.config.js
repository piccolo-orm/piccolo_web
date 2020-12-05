// This is where project configuration and plugin options are located.
// Learn more: https://gridsome.org/docs/config

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

module.exports = {
    siteName: 'Piccolo',
    siteUrl: 'https://www.piccolo-orm.com',
    plugins: [
        {
            use: '@gridsome/source-filesystem',
            options: {
                typeName: 'BlogPost',
                path: './content/blog/*.md',
            }
        },
        {
            use: '@gridsome/source-filesystem',
            options: {
                typeName: 'Example',
                path: './content/examples/home_examples.md',
            }
        },
        {
            use: '@gridsome/source-filesystem',
            options: {
                typeName: 'Tutorial',
                path: './content/tutorials/*.md',
            }
        },
        {
            use: '@gridsome/plugin-sitemap',
            options: {
                exclude: ['/privacy'],
                config: {
                    '/blog': {
                        changefreq: 'daily',
                        priority: 0.8
                    },
                    '/blog/*': {
                        changefreq: 'monthly',
                        priority: 0.8
                    },
                    '/': {
                        changefreq: 'weekly',
                        priority: 1.0
                    },
                }
            }
        },
        {
            use: 'gridsome-plugin-feed',
            options: {
                contentTypes: ['BlogPost'],
                feedOptions: {
                    title: 'Piccolo',
                    description: 'Articles about the Piccolo ORM and Python development.'
                },
                rss: {
                    enabled: true,
                    output: '/feed.xml'
                },
                maxItems: 1000,
                nodeToFeedItem: (node) => ({
                    title: node.title,
                    date: node.date,
                    content: ''
                })
            }
        }
    ],
    templates: {
        BlogPost: '/blog/:title/',
        Tutorial: '/tutorial/:title/'
    },
    transformers: {
        //Add markdown support to all file-system sources
        remark: {
            externalLinksTarget: '_blank',
            externalLinksRel: ['nofollow', 'noopener', 'noreferrer'],
            anchorClassName: 'icon icon-link',
            plugins: [
                '@gridsome/remark-prismjs'
            ]
        }
    },
    // chainWebpack (config) {
    //   config.mode('development')
    // }
}
