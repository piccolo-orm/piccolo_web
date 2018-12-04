# Introduction to ASGI

In order to make full use of Piccolo in a web application, you'll need to use it with an async routing framework.

There are a few options, including [Sanic](https://github.com/huge-success/sanic), [Quart](https://gitlab.com/pgjones/quart), and [Starlette](https://github.com/encode/starlette).

As the number of frameworks are growing, there's an increasing need for some level of standarisation, allowing different components to work together in clearly defined ways.

With synchronous frameworks, a community standard called WSGI specifies how an application talks to a web server. This meant you could combine any WSGI web framework, with any WSGI web server, using any WSGI middleware.

WSGI doesn't works for async frameworks though, because it ties a single request to a single response. For async applications, such a web sockets, a single request can result in multiple responses over time.

To solve this problem, [ASGI](https://channels.readthedocs.io/en/latest/asgi.html) (Asynchronous Server Gateway Interface) was proposed.

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
