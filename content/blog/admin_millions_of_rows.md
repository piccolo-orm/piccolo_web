---
title: Building an admin to handle millions of rows
date: 2021-03-14
description: Building an effective admin GUI which can handle millions of rows of data.
draft: false
---

Many of the recent changes to [Piccolo Admin](https://github.com/piccolo-orm/piccolo_admin) have been about improving performance and usability when dealing with large database tables.

<figure>
<img src="/images/blog/admin-millions-of-rows/admin_screenshot.png" alt="Piccolo Admin screenshot" />
<figcaption>The Piccolo Admin, in dark mode</figcaption>
</figure>

## Generating lots of fake data

The first step in this process was generating lots of fake data for testing with. The example schema used in the Piccolo Admin contains two tables - `Movie` and `Director`.

The original dataset was painstakingly collected via Google searches - e.g. finding out what each movie grossed, and if they had Oscar nominations. Clearly this wasn't going to scale if we wanted to test with millions of rows. Plus there are only so many actual movies in existence.

To generate fake data, but keeping it semi-realistic, the [Faker](https://pypi.org/project/Faker/) library was used. The benefit of using semi-realistic data, is it's easier to get a better sense of the user experience, compared to using Lorem ipsum everywhere.

You can see the source code used for this [here](https://github.com/piccolo-orm/piccolo_admin/blob/6cd17f63b1d80c109695dbea3a6ab198be8868df/piccolo_admin/example.py#L91).

## What are the bottlenecks?

After generated lots of fake data, we could identify the main bottlenecks.

### Pagination

Currently the Piccolo Admin uses limit-offset pagination, which isn't efficient when the page number is high. However, even at very high page numbers, it's still usable. It just puts unnecessary load on the database. For a page size of 100, and reading page 1,000, the database will read 100,000 rows, and will throw away the first 99,900. That's just the way offset is implemented in Postgres.

Work has started on more efficient pagination methods, but for now, it's still usable at high row counts.

### Foreign key selectors

For the `Movie` table, each row has a foreign key to a `Director` row. The user needs an efficient way of selecting the director when inserting / editing rows, and also when filtering.

This is the main bottleneck for supporting large database tables. If a simple select element is used, it needs to load all possible options for a director, which means loading the ID and an identifier (e.g. director name) for every row in the `Director` table. Clearly this won't scale well in terms of performance. It also isn't a great UI - as the user needs to scroll through thousands of options in a select element to find the one they're after.

The solution is to use a search input instead. For the filter sidebar, this has now been implemented. But for the edit and add pages, it will be implemented soon.

<figure>
<img src="/images/blog/admin-millions-of-rows/search-empty.png" class="medium" alt="Foreign key selector - empty" />
<figcaption>Empty search field</figcaption>
</figure>

<figure>
<img src="/images/blog/admin-millions-of-rows/search-with-content.png" class="medium" alt="Foreign key selector - with content" />
<figcaption>Search field with content</figcaption>
</figure>

## Conclusions

The recent improvements are a good start in making the Piccolo Admin scalable. We'll continue to make the UI and performance as good as possible with large datasets.
