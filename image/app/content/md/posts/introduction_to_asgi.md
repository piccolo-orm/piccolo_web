# Introduction to ASGI

In order to make full use of Piccolo in a web application, you'll need to use it with an async routing framework.

There are a few options, including [Sanic](https://github.com/huge-success/sanic), [Quart](https://gitlab.com/pgjones/quart), and [Starlette](https://github.com/encode/starlette).

As the number of frameworks grows, there's an increasing need for some level of standardisation, allowing different components to work together in clearly defined ways.

With synchronous frameworks, a community standard called [WSGI](https://www.python.org/dev/peps/pep-3333/) specifies how an application talks to a web server. This meant you could combine any WSGI web framework, with any WSGI web server, using any WSGI middleware.

WSGI doesn't work for async frameworks though, because it ties a single request to a single response. For async applications, such a web sockets, a single request can result in multiple responses over time.

To solve this problem, [ASGI](https://asgi.readthedocs.io/en/latest/) (Asynchronous Server Gateway Interface) was proposed.

## ASGI App

An ASGI application is a double callable. This double callable can be implemented how you like, but here's one example.

```python
class ASGIApp():
    def __init__(self, scope):
        self.scope = scope

    async def __call__(self, receive, send):
        message = await receive()
        await send({
            "type": "http.response.start",
            "status": 200,
            "headers": []
        })
        await send({
            'type': 'http.response.body',
            'body': bytes('hello world', 'utf-8')
        })

app = ASGIApp
```

The first callable accepts a scope argument, which tells the ASGI app about the connection. For a HTTP connection, this will include things like headers, the path, query parameters etc.

The second callable acccepts receive and send arguments, which is how the ASGI app receives/sends data.

A double callable sounds fancy, but all it means is the ASGI server can call your application like this:

```python
asgi = app(scope)
await asgi(receive, send)
```

## ASGI Middleware

Middleware modifies the scope passed to ASGI apps, or can do things like return a 403 error if no auth token if provided.

```python
class ASGIMiddleware():
    def __init__(self, asgi_app):
        self.asgi_app = asgi_app

    def __call__(self, scope):
        scope['some_param'] = True
        return self.asgi_app(scope)

app = ASGIMiddleware(ASGIApp)

```

## ASGI all the way down

What's interesting about an ASGI application is every component of that app is also ASGI. Routing is ASGI, middleware is ASGI, views are ASGI. Want to embed another ASGI app, built with a totally different framework, within your ASGI app? No problem.

With WSGI, frameworks often didn't achieve this level of modularity / composability. For example, Django views and middleware aren't WSGI - only the top level app is.

## ASGI servers

There are already three great ASGI servers - [Uvicorn](https://github.com/encode/uvicorn), [Hypercorn](https://gitlab.com/pgjones/hypercorn), and [Daphne](https://github.com/django/daphne).

Any of them will do fine. In my own testing, I got marginally better performance out of Hypercorn, though this could change over time.

Hypercorn makes a great development server, because it can automatically reload the server when it detects changes to your application (in the same was the Django dev server does).

```bash
hypercorn --uvloop --reload --b localhost:8000 views:app
```

## ASGI frameworks

Quart and Starlette already support ASGI.

In a recent episode of [Talk Python to Me](https://talkpython.fm/episodes/show/188/async-for-the-pythonic-web-with-sanic), a Sanic maintainer mentioned that they plan to support ASGI, so expect that soon.

Django Channels is another ASGI framework, which brings asynchronous capabilities (web sockets, HTTP2) to Django. The author of Django Channels, Andrew Godwin, was also the author of the ASGI spec.

### Which one should I use?

Quart seeks to be compatible with Flask, a popular WSGI framework. If this is important to you, then it's a sensible choice. The API will be familiar, meaning you don't have to relearn concepts, and many Flask extensions will also still work.

Django Channels is perfect if you want to add some async to a Django project.

Starlette is my current favourite for new projects which don't require Django or Flask interoperability. It also feels the most like a pure ASGI framework. Every component is ASGI, so it delivers on the promise of composability and modularity that I find so appealing. It can be used as a framework in its own right, or you can use it as a source of building blocks, and build your own framework on top of it ([Responder](https://github.com/kennethreitz/responder) is one example).

## Conclusions

ASGI is an important pillar in the world of async Python. I'll show some examples in the future incorporating Piccolo with an ASGI framework.
