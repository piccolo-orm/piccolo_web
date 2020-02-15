// This is where project configuration and plugin options are located.
// Learn more: https://gridsome.org/docs/config

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

module.exports = {
    siteName: 'Piccolo',
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
