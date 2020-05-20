---
title: Python package versioning
date: 2020-05-18
description: How to version your Python packages on PyPI.
draft: false
---

When releasing software on the [Python Packaging Index](http://pypi.org/) (PyPI), you typically use [semantic versioning](https://semver.org/) e.g. 1.2.1 (major.minor.patch).

If a user installs your library, they'll usually version pin it in their requirements.txt file, so in this case `some_package==1.2.1`. The advantage of doing this is when a colleague clones your project, or you deploy to production, you know the software dependencies are exactly correct.

With Piccolo, which consists of a set of related, interdependent projects, specifying the exact version poses some challenges.

The main Piccolo packages as of May 2020 are:

 * piccolo (the main ORM)
 * piccolo_admin
 * piccolo_api

Both piccolo_admin and piccolo_api have piccolo as dependencies.

Every time a new piccolo package is released, ideally we will also release new versions of piccolo_api and piccolo_admin. That means that whoever installs piccolo_admin or piccolo_api gets the latest and greatest version of piccolo too. But there are practical limitations to this. Manually releasing packages is time consuming. Even if it's completely automated using something like [Github Actions](https://github.com/features/actions), you will end up with a lot of releases which are just updating dependencies.

Another challenge I've encountered, is all three projects started at different times, and their versions have no relation to each other. For example, the latest versions as of May 2020 are:

 * piccolo - 0.10.7
 * piccolo_api - 0.7.4
 * piccolo_admin - 0.6.4

It's tempting to synchronise their versions, so they all share the same major and minor version.

 * piccolo - 0.10.7
 * piccolo_api - 0.10.4
 * piccolo_admin - 0.10.4

But this is somewhat limiting, as you can only manipulate the bug fix version.

## What about merging it into a single package?

Software developers have been influenced by the Unix philosophy, where simple components are combined to perform complex tasks. With Unix though, the components aren't dependent on each other. In fact, they don't even know that the output is being piped into the input of another command.

The Unix philosophy isn't always the best approach though. By merging all of the packages together, you remove the problem of having to synchronise version numbers.

I think there's a reasonable middle ground, where a package isn't broken down needlessly into small chunks, and on the other hand, isn't too large.

What's too large? In my experience, projects which are too large are the ones you're worried to release. Where one change can potentially have a large number of side effects.

In terms of libraries, I don't think file size is a particularly big concern for most people anymore.

## Loosening dependency versions

Another solution is to loosen dependency versions. So rather than piccolo_api requiring version 0.10.7 of piccolo, instead you can specify version 0.10.*. [Pip](https://pypi.org/project/pip/) handles this fine. You can also do something like piccolo>=10.2,<11.

This is a reasonable solution. It does create some ambiguity though, which could result in bugs. It's unlikely you'll run unit tests for your project with every dependency version in the range. It's important that the developer is disciplined with their package versioning, so the major version is incremented if there are any backwards incompatible changes.

## Sanity check

I think it's really important for a library author to have a sanity check in place, so they know that the latest version of their library can be installed, and works as expected. For the piccolo admin, I deploy a [demo site](http://demo1.piccolo-orm.com/), so I can check it all still works at a high level.

## Conclusions

For Piccolo, I've decided to loosen the dependency requirements. I'd also like to get to version 1.0 very soon.
