export class Tutorial {
    constructor(config) {
        this.id = config.id
        this.title = config.title
        this.slug = config.slug
    }
}


export class TutorialStep {

    constructor(config) {
        this.id = config.id
        this.title = config.title
        this.src = config.src
        this.slug = config.slug
    }
}


export class Post {
    constructor(config) {
        this.id = config.id
        this.title = config.title
        this.src = config.src
        this.slug = config.slug
    }
}

export default {Post, Tutorial, TutorialStep}
