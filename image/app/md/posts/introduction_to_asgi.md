# Introduction to ASGI

In order to make full use of Piccolo, you'll probably use it with an async routing framework (i.e. an async version of Flask).

There are a few options, including Sanic, Quart, and Starlette.

With synchronous frameworks, a community standard called WSGI allowed them to talk to a web server in a standardised way. The meant you could combine any WSGI web framework, with an WSGI web server.

WSGI doesn't ...
