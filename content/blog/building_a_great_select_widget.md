---
title: Building a great select widget
date: 2021-12-10
description: How to build a great select widget using Vue JS, which handles lots of data, with a good user experience.
draft: false
---

<iframe width="735" height="400" src="https://www.youtube.com/embed/h819CBKIqKI" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

A [`select`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/select) widget is easy right? We just do this in HTML:

```html
<select name="director">
  <option value="george">George Lucas</option>
  <option value="peter">Peter Jackson</option>
  <option value="steven">Steven Spielberg</option>
</select>
```

Which gives us:

<select name="director">
  <option value="george">George Lucas</option>
  <option value="peter">Peter Jackson</option>
  <option value="steven">Steven Spielberg</option>
</select>

This works well when there are only a few options. However, when there are lots of options it causes some major issues:

1. The user experience becomes quite poor because the user has to scroll through lots of options looking for the right one. We could use a [`datalist`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/datalist) instead, which is searchable. However, it doesn't solve our second problem.
1. If the number of options is really high it can actually crash the web browser. This is a possibility when pulling all of the options from an API and creating the widget with Javascript. In [Piccolo Admin](https://github.com/piccolo-orm/piccolo_admin) we encountered this issue, because depending on the database table there could be millions of options.

The obvious solution is to add a [`search`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/search) field instead:

```html
<input type="search" placeholder="Search" />
```

Which gives us:

<input type="search" placeholder="Search" />

Now the user can just search for what they want, and there's no risk of crashing the web browser with lots of data.

But even this isn't perfect. With a search field you assume that the user knows what they're searching for. And it's a far worse user experience if there are only a few options available - picking an option from a select widget is less effort than searching in this scenario.

We need a widget which works for all cases. If there are only a few options, it should be convenient, and shouldn't require the user to search. But when there are lots of options, we allow the user to search, and it shouldn't crash the web browser.

After much experimentation, we came up with this hybrid widget:

<figure>
<a href="#" class="lightbox">
    <img src="/images/blog/building-a-great-select-widget/hybrid_select_widget.jpeg" alt="Hybrid select widget" />
</a>
<figcaption>The hybrid select widget</figcaption>
</figure>

We render a search widget, and when the user clicks on it, we open the hybrid widget in a popup.

<figure>
<a href="#" class="lightbox">
    <img src="/images/blog/building-a-great-select-widget/hybrid_select_widget.gif" alt="Hybrid select widget demo" />
</a>
<figcaption>Demo</figcaption>
</figure>

The hybrid select widget preloads the first 5 results. This means that for situations where there aren't many options (for example gender) the user immediately clicks on the one they want, and job done.

If they want to see a few more options, they click on load more. And finally, they can just search.

In this way we're able to have a widget which scales well - whether there's two options, or two million options.

The widget is written in [Vue JS](https://vuejs.org/) - the [source code is on GitHub](https://github.com/piccolo-orm/piccolo_admin/blob/master/admin_ui/src/components/KeySearchModal.vue). It's available for [Piccolo Admin](https://github.com/piccolo-orm/piccolo_admin) users from version 0.19.1 onwards.
