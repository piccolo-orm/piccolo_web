# Plugins for Python Projects

While writing Piccolo I started thinking about how to make it extensible.

There are various approaches to the problem. I'll outline the pros and cons below, using existing projects as examples.

## Django

[Django](https://www.djangoproject.com/) is batteries included. The core Django package contains a bunch of extensions already - just take a look in the [contrib folder](https://github.com/django/django/tree/066f26fe8b98609726f7962c21de7233afb4ff7e/django/contrib).

Django also allows you to extend it in various ways by installing third party extensions. Enabling these extensions happens in a central settings.py file, which configures everything about your Django project.

## Flask

[Flask](http://flask.pocoo.org/) just provides the core scaffolding for a web app - the routing and views layer.

A Flask project consists of a main app object. You can add register extensions with this app object.

## Pytest

[Pytest](https://docs.pytest.org/en/latest/) is a testing framework, and is really interesting from an extensions perspective. It leverages a feature of [setuptools](https://setuptools.readthedocs.io/en/latest/) which I wasn't familiar with until really digging into the subject.

Setuptools is a library used for creating Python packages. The meta data for a Python package is contained in a setup.py file at the root of the package. In the setup.py file you can specify entrypoints.

Here's a [good example from the Pytest documentation](https://docs.pytest.org/en/latest/writing_plugins.html#making-your-plugin-installable-by-others).

<pre>
<code class="language-python">
# sample ./setup.py file
from setuptools import setup

setup(
    name="myproject",
    packages=["myproject"],
    # the following makes a plugin available to pytest
    entry_points={"pytest11": ["name_of_plugin = myproject.pluginmodule"]},
    # custom PyPI classifier for pytest plugins
    classifiers=["Framework :: Pytest"],
)
</code>
</pre>

Pytest then uses a little known module bundled within setuptools called pkg_resources. It allows a Python project to discover other packages which were installed in the same environment, and which use a certain entrypoint identifier.

The advantage of this is you no longer need a configuration file (i.e. settings.py in Django), or have to manually register extensions with a central app object (like in Flask) - the package discovers plugins automatically.

The disadvantage is all extensions within the environment will automatically be used. This is fine when a user is disciplined - always using virtualenvs, and only installing what they need. But for users who install everything in the global environment, things soon get messy.

## Non-Python example - Vue JS

One of my favourite projects in any language is [Vue JS](https://vuejs.org/), a UI framework for the web.

The main reason for this is it's approach to extensibility. The main Vue JS package contains the core functionality. It has a well defined plugin system, so people can extend it as they want. But they offer official packages for the most common requirements - Vuex (data management) and Vue Router (routing).

This means that people who are new to the project aren't trauling through hundreds of extensions of mixed quality trying to find something that works. The official extensions provide sensible defaults which function well. The problem is particularly acute in Javascript, which has an overwhelming number of options when it comes to packages. Users can then swap in their own alternatives as they discover more about their project's particular requirements.

The cherry on top is another official project called [Vue CLI](https://cli.vuejs.org/). It's a tool which guides a user through setting up a project, presenting the various extensions which can be installed, and scaffolds a project in which they work together.

## What's ideal?

I think if Django started again from scratch, it would have been broken down into multiple projects. Many of the Django components are heavily interdependent, which makes it hard to swap out say the ORM for an alternative.

By having smaller components, it also makes them feel more manageable from a maintenence perspective. They are also more modular, meaning they can be reused by other projects.

For Piccolo, the plan is:

 * Move functionality into extensions where appropriate
 * Provide a low friction way of adding extensions (like in Pytest - just pip install)
 * Provide a CLI tool which orchestrates the various extensions (like Vue)
 * Configure extensions using a optional configuration file

## What sorts of extension are envisaged for Piccolo?

The scope for extensions is large.

 * A web based admin interface
 * Migrations
 * Auth
 * ASGI middleware
 * Auto REST APIs

And hopefully many more.
