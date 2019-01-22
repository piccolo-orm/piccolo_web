# Why Python type annotations are awesome

For me, the two stand out features of Python 3 are asyncio and type annotations.

I think both were essential for keeping Python competitive as a language for building backend systems.

In this article I'll talk about why I think type annotations in particular are awesome, and why Piccolo uses them so heavily.

## Documentation

The first reason to use type annotations is to document your code. Taking this very simple example:

<pre>
<code class="language-python">
def email_user(user):
    # some code
</code>
</pre>

User could be any number of different things - an integer, a User object, a string ... the list does on. It adds cognitive load to someone new to a project, having to work out what's going on.

Before type annotations, this was solved using specially formatted docstrings.

<pre>
<code class="language-python">
def email_user(user):
    """
    :type user: User
    """
    # some code
</code>
</pre>

This is better, but having the type annotation in a string is limiting. Using the Python 3 approach:

<pre>
<code class="language-python">
def email_user(user: User):
    # some code
</code>
</pre>

The advantage here is with code editors like Visual Studio Code you can now command + click on the User annotation. and it'll take you to the definition of User in your project, which is a great usability improvement over doing a manual search.

Declaring your type annotation here make it available in a __annotations__ property, which you access using `typing.get_type_hints`.

## Imports required

This is a pro and a con.

## Progressive enhancement

...

## What's the point if there's no performance enhacement?

Actually ... there's a small performance penalty ...
