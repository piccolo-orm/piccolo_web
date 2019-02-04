/*
Generates JSON files for all available posts and tutorials, and generates a
sitemap.
*/

const fs = require('fs')
const path = require('path')
const fsPromises = require('fs').promises
const showdown = require('showdown')
const showdownHighlight = require('showdown-highlight')
const builder = require('xmlbuilder')

const posts = require('./json/posts.js')
const tutorials = require('./json/tutorials.js')


const converter = new showdown.Converter({ extensions: [showdownHighlight] })
const publicDir = path.join(path.dirname(__dirname), 'public')


async function createSitemap(urls) {
    var feed = builder.create(
        'urlset',
        { encoding: 'utf-8' }
    ).att(
        'xmlns',
        'http://www.sitemaps.org/schemas/sitemap/0.9'
    )

    urls.forEach(function (url) {
        feed = feed.ele(
            'url',
        ).ele(
            'loc',
            url
        ).up().up()
    })

    let output = feed.end({ pretty: true })
    let filePath = path.join(publicDir, 'sitemap.xml')
    await fsPromises.writeFile(filePath, output)
}


// Recursively gets all markdown files from the directory
var walkSync = function (dir, filelist) {
    var files = fs.readdirSync(dir);
    filelist = filelist || [];
    files.forEach(function (file) {
        if (fs.statSync(`${dir}/${file}`).isDirectory()) {
            filelist = walkSync(`${dir}/${file}`, filelist);
        }
        else {
            if (file.endsWith('.md')) {
                filelist.push(`${dir}/${file}`);
            }
        }
    });
    return filelist;
};


// Output the HTML files.
async function compileMarkdown() {
    let filesList = walkSync(path.join(__dirname, 'md'))
    filesList.forEach(async function(filePath) {
        let contents = await fsPromises.readFile(filePath)
        contents = contents.toString()
        let html = converter.makeHtml(contents)
        let subPath = filePath.split('/md/')[1].replace('.md', '')
        let outputPath = path.join(publicDir, 'html', `${subPath}.html`)

        await fsPromises.mkdir(path.dirname(outputPath), {recursive: true})

        try {
            await fsPromises.writeFile(outputPath, html)
        } catch (error) {
            console.log('Error writing tutorial')
        }
    })
}


async function outputJSON() {
    const jsonFiles = [
        {
            name: 'posts.json',
            content: posts
        },
        {
            name: 'tutorials.json',
            content: tutorials
        }
    ]
    jsonFiles.forEach(async function(jsonFile) {
        await fsPromises.writeFile(
            path.join(publicDir, 'json', jsonFile.name),
            JSON.stringify(jsonFile.content, null, 2)
        )
    })
}


async function main() {

    await compileMarkdown()

    var rootURL = 'https://piccolo-orm.com'
    var urls = [
        rootURL,
        `${rootURL}/tutorial`,
        `${rootURL}/blog`,
    ]

    posts.forEach(function (post) {
        urls.push(
            `${rootURL}/blog/${post.slug}/`
        )
    })

    tutorials.forEach(function (tutorial) {
        tutorial.steps.forEach(function (step) {
            urls.push(
                `${rootURL}/tutorial/${tutorial.slug}/${step.slug}/`
            )
        })
    })

    await Promise.all([
        createSitemap(urls),
        outputJSON()
    ])
}


if (require.main === module) {
    main()
}


module.exports = main
