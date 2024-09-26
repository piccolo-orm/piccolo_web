---
title: SELECT FOR UPDATE in Piccolo / Postgres
date: 2024-09-27
description: Explaining how SELECT FOR UPDATE works in Postgres, and how to use it in Piccolo.
draft: false
---

<iframe width="728" height="400" src="https://www.youtube.com/embed/qlFYQXrNBBI?si=axeNMvwOCS46Dofu" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

In our latest video we explore how `SELECT FOR UPDATE` works in Postgres, and how to use it in Piccolo.

We also demonstrate how it prevents vulnerabilities like the [ACIDRain](https://dl.acm.org/doi/10.1145/3035918.3064037) attack.

To learn more about how to use `SELECT FOR UPDATE`, see the [Piccolo docs](https://piccolo-orm.readthedocs.io/en/latest/piccolo/query_clauses/lock_rows.html), and the [Postgres docs](https://www.postgresql.org/docs/current/sql-select.html#SQL-FOR-UPDATE-SHARE).

The source code used in the video is available [here](https://github.com/piccolo-orm/piccolo_videos/blob/main/select_for_update/main.py).
