---
title: Taking our UI testing to the next level with Cypress
date: 2022-09-04
description: Piccolo Admin, a Python CMS, is now using Cypress to run integration / UI tests.
draft: false
---

<figure>
<a href="#" class="lightbox">
<img src="/images/blog/cypress-tests/cypress-results.png" alt="Cypress results" />
</a>
<figcaption>Cypress test results</figcaption>
</figure>

Testing is an integral part of software development, and arguably even more so with open source projects.

Piccolo and its related projects have extensive test suites, mostly consisting of unit tests for the backend Python code.

One of the most important parts of the Piccolo ecosystem is [Piccolo Admin](https://github.com/piccolo-orm/piccolo_admin/), a powerful admin interface / content management system. It contains a lot of UI code (written with Vue.js), and builds upon the rest of the Piccolo ecosystem ([`piccolo_admin`](https://github.com/piccolo-orm/piccolo_admin/) is built on [`piccolo_api`](https://github.com/piccolo-orm/piccolo_api/), which is built on [`piccolo`](https://github.com/piccolo-orm/piccolo/))

 By running integration / UI tests on Piccolo Admin we can make sure that the Piccolo ecosystem of libraries is working together as expected.

 ## Why Cypress?

 [Cypress](https://github.com/cypress-io/cypress) has become very popular. It's developer friendly, and productive. It's similar to tools like [Selenium](https://en.wikipedia.org/wiki/Selenium_(software)).

You write tests in Javascript, and the tests run within a web browser (typically headless Chrome).

The tests are simple to write - in the example below, we type some content into a form, and then submit it:

```javascript
// Fill the username
cy.get('[name="username"]')
    .type('piccolo')
    .should('have.value', 'piccolo');

// Fill the password
cy.get('[name="password"]')
    .type('piccolo123')
    .should('have.value', 'piccolo123');

// Locate and submit the form
cy.get('form')
    .submit();

// Make sure the correct page was rendered
cy.location('pathname', { timeout: 5000 })
    .should('eq', '/');
```

You can see some [full examples in our Git repo](https://github.com/piccolo-orm/piccolo_admin/tree/master/admin_ui/cypress/integration).

By writing these automated tests, we increase our confidence in the code base, and it reduces the amount of manual testing we have to do.

## GitHub Actions

Having Cypress tests is great, but to get the maximum value we need to run them as part of our CI pipeline. Luckily there's an official tool for doing this: [cypress-io/github-action](https://github.com/cypress-io/github-action).

You can see our [full YAML config here](https://github.com/piccolo-orm/piccolo_admin/blob/master/.github/workflows/cypress.yaml), and an [example of a successful pipeline run](https://github.com/piccolo-orm/piccolo_admin/actions/runs/2989278617).

Once the pipeline has run, we can see how many tests passed / failed:

<figure>
<a href="#" class="lightbox">
<img src="/images/blog/cypress-tests/cypress-results-github.png" alt="Cypress results on GitHub Actions" />
</a>
<figcaption>Cypress results on GitHub Actions</figcaption>
</figure>

Even though the tests are running in headless Chrome, Cypress can generate screenshots and videos of the tests, so we save these as artifacts:

<figure>
<a href="#" class="lightbox">
<img src="/images/blog/cypress-tests/cypress-artifacts.png" alt="Cypress artifacts on GitHub Actions" />
</a>
<figcaption>Cypress artifacts on GitHub Actions</figcaption>
</figure>

The artifacts are stored in a zip file, which we can download and inspect.

When I started using Cypress, the screenshots and videos were something which really impressed me.

Here we can see a test in action - which navigates around the app, and submits some forms:

<video width="1280" height="720" controls>
  <source src="/images/blog/cypress-tests/cypress-test-video.mp4" type="video/mp4">
</video>

It's like having our own personal android!

## Moving forward

Now we have some initial Cypress tests, and have it integrated with our CI, where do we go next?

There are lots more Cypress tests left to write, and we want to get to a position where every new feature is accompanied by a set of Cypress tests.

If you want to [get involved](https://github.com/piccolo-orm/piccolo_admin/), and learn more Cypress, then you're welcome to join us. Cypress is suprisingly fun, and a valuable skill to learn.

## Update - now using Playwright!

We ended up migrating to [Playwright](https://playwright.dev/), which is a similar framework, but the tests can be written in Python.

Being able to write the tests in Python is a huge boon for us, as we can test the UI (for example submitting a form), and then use Piccolo to query the database to make sure the data was modified.

I'm still a fan of Cypress, but Playwright is the obvious choice for Python developers.
