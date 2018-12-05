# Introduction to ASGI

In order to make full use of Piccolo in a web application, you'll need to use it with an async routing framework.

There are a few options, including [Sanic](https://github.com/huge-success/sanic), [Quart](https://gitlab.com/pgjones/quart), and [Starlette](https://github.com/encode/starlette).

As the number of frameworks grows, there's an increasing need for some level of standardisation, allowing different components to work together in clearly defined ways.

With synchronous frameworks, a community standard called [WSGI](https://www.python.org/dev/peps/pep-3333/) specifies how an application talks to a web server. This meant you could combine any WSGI web framework, with any WSGI web server, using any WSGI middleware.

WSGI doesn't work for async frameworks though, because it ties a single request to a single response. For async applications, such a web sockets, a single request can result in multiple responses over time.

To solve this problem, [ASGI](https://asgi.readthedocs.io/en/latest/) (Asynchronous Server Gateway Interface) was proposed.

An ASGI application is a double callable. This double callable can be implemented how you like, but here's one example.

<pre><code class="language-python">
class ASGIApp():
    def __init__(self, some_param):
        """The first callable. Allows the ASGI app to wrap other ASGI apps."""
        self.some_param = some_param

    def __call__(self, scope):
        """
        The second callable.
        """
        pass
</code></pre>

What's fascinating about an ASGI application is every component of that app is also ASGI. Middleware is ASGI, views are ASGI. Want to embed another ASGI app, built with a totally different framework, within your ASGI app? No problem.

With WSGI, frameworks often didn't achieve this level of modularity / composability. For example, Django views and middleware aren't WSGI - only the top level app is.

## ASGI servers

There are already two great ASGI servers - [Uvicorn](https://github.com/encode/uvicorn), and [Hypercorn](https://gitlab.com/pgjones/hypercorn).

Either will do fine. In my own testing, I got marginally better performance out of Hypercorn, though this could change over time.

Hypercorn makes a great development server, because it can automatically reload the server when it detects changes to your application (in the same was the Django dev server does).

```
hypercorn --uvloop --reload --b localhost:8000 views:app
```

## ASGI frameworks

Quart and Starlette already support ASGI. In a recent episode of [Talk Python to Me](https://talkpython.fm/episodes/show/188/async-for-the-pythonic-web-with-sanic), a Sanic maintainer mentioned that they plan to support ASGI, so expect that soon.

### Which one should I use?

Quart seeks to be compatible with Flask, a popular WSGI framework. If this is important to you, then it's a sensible choice. The API will be familiar, meaning you don't have to relearn concepts, and many Flask extensions will also still work.

Sanic has a large community behind it, but I'm personally hesistant to use any async framework which doesn't support ASGI, but as previously mentioned, this could change soon.

Starlette is my current favourite. I'm not personally invested in Flask, so don't care about compatibility. It also feels the most like a pure ASGI framework. Every component is ASGI, so it delivers on the promise of composability and modularity that I find so appealing. It can be used as a framework in its own right, or you can use it as a source of building blocks, and build your own framework on top of it ([Responder](https://github.com/kennethreitz/responder) is one example).

There are countless others, but some seem to have stalled or been abandoned (Japronto, Vibora), or don't have appealing APIs.
