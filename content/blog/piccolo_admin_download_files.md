---
title: Piccolo Admin forms - downloading files!
date: 2024-10-08
description: Piccolo Admin forms now lets you download files (e.g. CSV, PDF, JPEG), which is useful for reporting purposes.
draft: false
---

<iframe width="728" height="400" src="https://www.youtube.com/embed/ZAtxXUsptaw" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

[Piccolo Admin](https://piccolo-admin.readthedocs.io/en/latest/) lets you easily add [custom forms](https://piccolo-admin.readthedocs.io/en/latest/custom_forms/index.html) to the UI - all you need to do is provide a Pydantic model and an endpoint.

Up until recently these forms could just return a string, which is shown to the user when the form is submitted.

You can now return files instead - see the [docs](https://piccolo-admin.readthedocs.io/en/latest/custom_forms/index.html#fileresponse).

This is really useful, especially for reporting purposes. For example, if your data science team needs a CSV report, we can build a custom form for them, so they can download the report whenever they want.
