/*
Generates JSON files for all available posts and tutorials, and generates a
sitemap.
*/

const fsPromises = require('fs').promises
const slugify = require('slugify')
const rmfr = require('rmfr')
const showdown  = require('showdown')
const showdownHighlight = require("showdown-highlight")

const converter = new showdown.Converter({extensions: [showdownHighlight]})
const dividingString = '<!-- start -->'


async function processPosts() {
    var output = []

    let mdDirectory = '../md/posts'
    let htmlDirectory = '../public/html/posts'
    let files = await fsPromises.readdir(mdDirectory)

    // Make sure it's empty
    await rmfr(htmlDirectory)
    await fsPromises.mkdir(htmlDirectory)

    for (i=0; i < files.length; i++) {
        let file = files[i]

        let contents = await fsPromises.readFile(`${mdDirectory}/${file}`)
        contents = contents.toString()

        let [jsonString, markdownString] = contents.split(dividingString)
        let json = JSON.parse(jsonString)
        let html = converter.makeHtml(markdownString)

        let title = json.title
        let slug = slugify(title).toLowerCase()
        let src = slug + '.html'

        try {
            await fsPromises.writeFile(`${htmlDirectory}/${src}`, html)
        } catch(error) {
            console.log('error')
        }

        output.push({
            title,
            slug,
            src
        })
    }

    await fsPromises.writeFile(
        '../public/json/posts.json',
        JSON.stringify(output)
    )
}

function createSitemap() {
    // Install Mustache?
    // Or can Node handle XML?
}


async function createTutorialsJSON() {
    let folder = '../md/tutorials'

    var tutorials = []

    var files = await fsPromises.readdir(folder)

    for (i = 0; i < files.length; i++) {
        let file = files[i]

        let filePath = `${folder}/${file}`

        var stats = await fsPromises.stat(filePath, [])

        if (stats.isDirectory()) {
            console.log('a directory!!!')

            var tutorial = {
                name: file,
                steps: []
            }
            tutorials.push(tutorial)

            var _files = await fsPromises.readdir(filePath)
            for (j = 0; j < _files.length; j++) {
                let _file = _files[j]
                let _contents = await fsPromises.readFile(`${filePath}/${_file}`)

                let _contentsString = _contents.toString()

                tutorial.steps.push({
                    name: _file
                })
            }
        }
    }

    console.log('Done!')
    console.log(tutorials)
    await fsPromises.writeFile(
        '../public/json/tutorials.json',
        JSON.stringify(tutorials)
    )
}

async function main() {
    await Promise.all([
        processPosts(),
        //createTutorialsJSON()
    ])
}


if (require.main === module) {
    main()
}
