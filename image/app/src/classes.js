export class Tutorial {
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

export default {Post, Tutorial}
