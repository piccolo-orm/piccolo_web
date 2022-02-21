---
title: Creating a new Sphinx theme for our docs
date: 2022-02-21
description: A look at the new Piccolo Theme for Sphinx, and the thought process behind it.
draft: false
---

Last week we updated the [Piccolo docs](https://piccolo-orm.readthedocs.io/en/latest/index.html) to use our brand new [Sphinx theme](https://github.com/piccolo-orm/piccolo_theme).

All of the Piccolo projects will be updated to use this theme in the near future. You can also use it for your own projects.

Previously, we used the [Read the Docs theme](https://sphinx-rtd-theme.readthedocs.io/en/stable/). I really like this theme, but there's a few things I wanted to change (just my personal taste).

## Previous Design

### Autodoc

When you embed code in Sphinx using [autodoc](https://www.sphinx-doc.org/en/master/usage/extensions/autodoc.html), it gets a bit messy (especially if you have type annotations).

![Code snippets](/images/blog/documentation-theme/code_snippets.png)

### Typography and white space

I generally like the typography, with the bold headings. I personally prefer sans-serif header fonts though.

The theme has some grey unused space on the right, which could be utilised for something.

![Dead space](/images/blog/documentation-theme/dead_space.png)

### Next buttons

The next button doesn't tell you the title of the next page.

![Next buttons](/images/blog/documentation-theme/next_buttons.png)

### Sidebar

Everything goes in a single sidebar, which can get a bit overwhelming.

![Sidebar](/images/blog/documentation-theme/sidebar.png)

## New design

In the new design we:

- Have a left and right sidebar. The left sidebar shows the page hierarchy, and right sidebar shows the contents of the current page.
- Use sans-serif header fonts.
- Have a header bar, to add a splash of colour.
- The next / previous buttons show the title of the adjacent page.

![New Design](/images/blog/documentation-theme/new_design.png)

We also modified the autodoc output so it's more legible (each argument is on its own line).

![New Design Code Blocks](/images/blog/documentation-theme/new_design_code_blocks.png)

## Did we succeed?

Changing the docs for a project is high risk - people get used to a certain look and feel. Hopefully the community will like the changes!

If you have any feedback on the new design, please create a new [discussion](https://github.com/piccolo-orm/piccolo_theme/discussions) or [issue](https://github.com/piccolo-orm/piccolo_theme/issues).

## Why choose Sphinx?

Sphinx is a very powerful tool, and an incredible asset for the Python community. With [intersphinx](https://www.sphinx-doc.org/en/master/usage/extensions/intersphinx.html) you can link between Sphinx projects. So in Piccolo, we can link directly to the main Python docs (because they're also written using Sphinx).

Sphinx is also very actively maintained, with new features coming out regularly.

By creating this new theme, we obviously benefit ourselves as Piccolo maintainers and users, but it's also our way of giving back to the Sphinx community.
