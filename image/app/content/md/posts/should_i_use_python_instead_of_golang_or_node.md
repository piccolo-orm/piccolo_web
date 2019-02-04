# Should I use Python instead of Golang or Node?

In recent years the go-to solution for high performance web services has been Node JS or Golang.

Both of them have strong concurrency support. In the case of Node, it used to be callbacks, and is now promises with async / await, on top of a single threaded event loop. With Golang it's goroutines, which are automatically scheduled onto threads by the Golang runtime.

With asyncio, Python now has a compelling concurrency story in the standard library, which makes it worthy of consideration for new web projects.

The comparisons are based on my own experiences.

## Node pros and cons

### + Quick prototyping

With Node, you can build a web service very quickly using Express.

### + Performance

The performance of Node JS is remarkable, due to the effort that has gone into the V8 Javascript engine. It uses JIT compilation, which means that any 'hot paths' are compiled to machine code. Hot paths are chunks of code which are run repeatedly with the same arguments, meaning the engine can infer the correct types and compile them.

In my own testing, I can get about 3000 requests per second out of a simple Express service, which is staggering for an interpretted language.

### - Typing support

When building large Javascript projects, it's getting increasingly common to use a language like Typescript, which provides typing support and transpiles to Javascript.

Typing supports helps make code more understandable, and testable.

With Python, there's now standard library support via the typing module. This makes it really easy to implement.

It soon gets tedious with Typescript constantly having to transpile it to Javascript (unless you run it through ts-node). Everything requires a build step. Have unit tests which include Typescript code? Need to transpile them first before running.

### - Testing

There's no standard testing framework built into Node JS, meaning you have to rely on third party alternatives. Libraries such as Jasmine and Karma are good, but it still feels slightly inferior and harder work than in Python.

### - Library overload

The greatest strength and weakness of Javascript is the abundance of libraries. The options can be bewildering when you're getting started.

## Golang pros and cons

### + Performance

Golang is a compiled language, so as expected it provides greater performance than either Node or Python.

In my own testing, I can get about 4000 requests per second out of a simple Golang web service, built using Gin.

### + Typing support

Golang has builtin supports for type annotations.

### - Limited language

When coming from a more feature rich language, Golang can feel both liberating and incredibly constraining.

Golang compiles very quickly. It feels like compromises were made to enable this, namely limiting the number of features in the language.

In Golang, there are no classes - only structs. It would be nice to have the choice, like in a language like Swift, where the programmer gets to choose. Classes make more sense for some use cases, and structs do in others.

The limitations of the language also make it trickier for library authors. In Python and Swift you can overload operators and such, creating syntax which feels more natural.

One common complaint about Golang is it has no support for generics. This is likely to change soon though.

### - No nested folders

When writing a package, all of the files and tests are in a single folder, without subfolders.

Some people might like this, but I find it limiting and quite annoying.

### - Package management

Package management is an ongoing saga.

## Python Asyncio Pros and Cons

### - Performance

Relative to Node and Golang, you will get worse performance with Python.

However, the differences aren't as large when using asyncio. Uvicorn + Starlette, or Sanic, can get you to over 1000 requests per second. With synchronous Python frameworks like Flask and Django, you'll get around 300 requests per second.

### + Error tracking

One place where Python absolutely shines is in error handling. In Golang, errors are just strings. With Python, you can throw exceptions, and get a nice stack trace. It makes debugging Python web services very simple, especially when used in conjunction with a logging service like Sentry. It's easy to take this stuff for granted, but it's a huge win.

### + Typing support

Python 3 added the typing module. This allows you to add type annotations to your Python code. It doesn't result in higher performance code, but it does make large projects easier to maintain. In conjunction with mypy you get many of the benefits of a statically compiled language.

### + Everything you love about Python

There's a lot to love about Python. List comprehensions, exploring ideas in the interpretter, ease of learning for new programmers etc.

## Conclusions

The aim of this article isn't to suggest that Python is always the best solution.

However, with recent changes to the language, it is more competitive than ever. The performance gap has been lessened, and what you lose in performance you gain in terms of usability and programmer productivity.

In particular, if you're someone who already knows Python, take another look before jumping ship.