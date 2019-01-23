# ORM design challenges

Building ORMs isn't the easiest thing in the world. Based on past experience working on similar projects, I knew it wasn't impossible though.

Fundamentally an ORM is just a mechanism for converting Python objects into SQL strings, sending them to a database adapter, and converting the response back into Python objects. However, there are some subtleties which are challenging.

## Designing a nice API

This is perhaps the most important consideration when designing an ORM. Making something as user friendly and powerful as possible.

## SQL injection prevention

When generating SQL strings, the ORM needs to be careful not to include raw user input within the string - instead it should be parameterised.

<pre>
<code class="language-python">
# This is OK:
"SELECT * from user WHERE username = $1"

# If username = "1; DROP TABLE users", and the query wasn't parameterised:
"SELECT * from user WHERE username = 1; DROP TABLE users"
</code>
</pre>

This sounds simple enough, but is quite challenging.

## Joins

...

## Large selects

...
