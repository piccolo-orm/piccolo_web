/*
Generates JSON files for all available posts and tutorials, and generates a
sitemap.
*/

const path = require('path')
const fsPromises = require('fs').promises
const slugify = require('slugify')
const rmfr = require('rmfr')
const showdown  = require('showdown')
const showdownHighlight = require('showdown-highlight')
const builder = require('xmlbuilder')

const converter = new showdown.Converter({extensions: [showdownHighlight]})
const dividingString = '<!-- start -->'


// content: a string containing json and markdown
function parseFileContents(contents) {
    let [jsonString, markdownString] = contents.split(dividingString)
    let json = JSON.parse(jsonString)
    let html = converter.makeHtml(markdownString)
    return [json, html]
}


async function recreateFolder(path) {
    try {
        await rmfr(path)
    } catch(error) {
        console.log('Unable to remove folder - probably doesnt exist')
    }
    await fsPromises.mkdir(path, {recursive: true})
}


function absPath(_path) {
    return path.join(__dirname, _path)
}


async function processPosts() {
    let mdDirectory = absPath('./md/posts')
    let htmlDirectory = absPath('../public/html/posts')
    let files = await fsPromises.readdir(mdDirectory)

    await recreateFolder(htmlDirectory)

    var posts = []

    for (var i=0; i < files.length; i++) {
        let file = files[i]

        let contents = await fsPromises.readFile(`${mdDirectory}/${file}`)
        contents = contents.toString()

        let [json, html] = parseFileContents(contents)

        let title = json.title
        let postedOn = json.postedOn
        let slug = slugify(title).toLowerCase()
        let src = slug + '.html'

        try {
            await fsPromises.writeFile(`${htmlDirectory}/${src}`, html)
        } catch(error) {
            console.log('Error writing post')
        }

        posts.push({
            title,
            slug,
            src,
            postedOn
        })
    }

    await fsPromises.writeFile(
        absPath('../public/json/posts.json'),
        JSON.stringify(posts, null, 2)
    )

    return posts
}


async function processTutorials() {
    let mdDirectory = absPath('./md/tutorials')
    let htmlDirectory = absPath('../public/html/tutorials')

    await recreateFolder(htmlDirectory)

    var tutorials = []

    var files = await fsPromises.readdir(mdDirectory)

    for (var i = 0; i < files.length; i++) {
        let file = files[i]

        let filePath = `${mdDirectory}/${file}`

        var stats = await fsPromises.stat(filePath, [])

        if (stats.isDirectory()) {
            var tutorialName = file.toLowerCase()
            var tutorial = {
                title: tutorialName,
                slug: slugify(tutorialName).toLowerCase(),
                steps: []
            }
            tutorials.push(tutorial)

            await recreateFolder(`${htmlDirectory}/${tutorialName}`)

            var _files = await fsPromises.readdir(filePath)
            for (var j = 0; j < _files.length; j++) {
                let _file = _files[j]
                let _contents = await fsPromises.readFile(`${filePath}/${_file}`)
                let _contentsString = _contents.toString()

                let [json, html] = parseFileContents(_contentsString)

                let title = json.title
                let slug = slugify(title).toLowerCase()
                let src = slug + '.html'

                try {
                    await fsPromises.writeFile(`${htmlDirectory}/${tutorialName}/${src}`, html)
                } catch(error) {
                    console.log('Error writing tutorial')
                }

                tutorial.steps.push({
                    title,
                    src,
                    slug
                })
            }
        }
    }

    await fsPromises.writeFile(
        absPath('../public/json/tutorials.json'),
        JSON.stringify(tutorials, null, 2)
    )

    return tutorials
}


async function createSitemap(urls) {
    var rootURL = 'https://piccolo-orm'

    var feed = builder.create(
        'urlset',
        {encoding: 'utf-8'}
    ).att(
        'xmlns',
        'http://www.sitemaps.org/schemas/sitemap/0.9'
    )

    urls.forEach(function(url) {
        feed = feed.ele(
            'url',
        ).ele(
            'loc',
            url
        ).up().up()
    })

    let output = feed.end({ pretty: true })
    let filePath = absPath('../public/sitemap.xml')
    await fsPromises.writeFile(filePath, output)
}


async function main() {
    let [posts, tutorials] = await Promise.all([
        processPosts(),
        processTutorials()
    ])

    var rootURL = 'https://piccolo-orm'
    var urls = [
        rootURL,
        `${rootURL}/tutorial`,
        `${rootURL}/blog`,
    ]

    posts.forEach(function(post) {
        urls.push(
            `${rootURL}/blog/${post.slug}`
        )
    })

    tutorials.forEach(function(tutorial) {
        tutorial.steps.forEach(function(step) {
            urls.push(
                `${rootURL}/tutorial/${tutorial.slug}/${step.slug}`
            )
        })
    })

    await createSitemap(urls)
}


if (require.main === module) {
    main()
}


module.exports = main
