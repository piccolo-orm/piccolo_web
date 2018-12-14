export class Tutorial {
    constructor(title, slug, steps) {
        this.title = title
        this.slug = slug
        this.steps = steps
    }
}


export class TutorialStep {
    constructor(title, src, slug) {
        this.title = title
        this.src = src
        this.slug = slug
    }
}


export class Post {
    constructor(title, src, slug) {
        this.title = title
        this.src = src
        this.slug = slug
    }
}

export default {Post, Tutorial, TutorialStep}
