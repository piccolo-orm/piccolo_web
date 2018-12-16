export class Tutorial {
    constructor(config) {
        this.title = config.title
        this.slug = config.slug
        this.steps = config.steps
    }
}


export class TutorialStep {

    constructor(config) {
        this.title = config.title
        this.src = config.src
        this.slug = config.slug
    }
}


export class Post {
    constructor(config) {        this.title = config.title
        this.src = config.src
        this.slug = config.slug
    }
}

export default {Post, Tutorial, TutorialStep}
