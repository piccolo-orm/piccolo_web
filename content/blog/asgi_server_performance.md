---
title: What is the fastest ASGI server?
date: 2021-02-28
description: Testing the main Python ASGI servers to see which fastest.
draft: false
---


[ASGI](../introduction-to-asgi/) is a specification which allows interoperability of async Python web frameworks and servers. There are several different ASGI servers ([Daphne](https://pypi.org/project/daphne/), [Hypercorn](https://pypi.org/project/Hypercorn/), [Uvicorn](https://pypi.org/project/uvicorn/)).

I was recently doing some load testing for a website, which has to support large numbers of visitors concurrently. I didn't expect there to be any dramatic differences in performance between the different ASGI servers, but even if there's a 20% difference, I'll take it.

It's also a good opportunity to show off [Locust](https://locust.io/), which is a nice load testing tool.

The testing process and results are documented on [GitHub](https://github.com/piccolo-orm/asgi_server_performance).

## Results

Uvicorn:

![Uvicorn](https://raw.githubusercontent.com/piccolo-orm/asgi_server_performance/master/images/uvicorn.png)

Hypercorn:

![Hypercorn](https://raw.githubusercontent.com/piccolo-orm/asgi_server_performance/master/images/hypercorn.png)

Daphne:

![Daphne](https://raw.githubusercontent.com/piccolo-orm/asgi_server_performance/master/images/daphne.png)

## Conclusions

Uvicorn achieved roughly 40% more throughput than the others in this test. However, they all did well, and were stable under high load.
