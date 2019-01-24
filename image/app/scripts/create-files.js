/*
Generates JSON files for all available posts and tutorials, and generates
*/

let fsPromises = require("fs").promises


// Current limitations - no punctuation in titles
async function createPostJSON() {
    var output = []

    let files = await fsPromises.readdir('../md/posts')

    files.forEach(file => {
        let prefix = file.replace('.md', '')
        let slug = prefix.replace(/_/g, '-').toLowerCase()
        let title = prefix.replace(/_/g, ' ')
        let src = prefix + '.html'

        output.push({
            title,
            slug,
            src
        })
    });

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
        createPostJSON(),
        createTutorialsJSON()
    ])
}


if (require.main === module) {
    main()
}
