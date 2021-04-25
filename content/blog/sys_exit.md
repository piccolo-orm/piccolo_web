---
title: Understanding sys.exit
date: 2021-04-22
description: Understanding how to use sys.exit in Python.
draft: false
---

Some of the Piccolo commands use ``sys.exit`` to indicate to the user whether the code ran successfully or not.

Here's a very simple example:

```python
import sys


def my_command():
    was_successful = do_something()
    if was_successful:
        sys.exit(0)
    else:
        sys.exit(1)
```

The number passed to `sys.exit` is the **exit code**. In Unix, an exit code of `1` means something went wrong. An exit code of `0` means it was successful.

## Using exit codes

On the command line, you can see the exit code of the last command using `echo $?`.

```bash
>>> python successful_script.py
>>> echo $?
0

>>> python failing_script.py
>>> echo $?
1
```

You can then use these exit codes in things like `if` statements.

```bash
>>> if python successful_script.py; then echo "successful"; else echo "error"; fi;
successful

>>> if python failing_script.py; then echo "successful"; else echo "error"; fi;
error
```

Also, exit codes are very important in build tools like Docker. If the exit code indicates a command has failed, then the build will fail.

## Exit messages

If you want to indicate why the failure occured, then a string can be passed to `sys.exit`, in which case the exit code is treated as `1` (i.e. a failure), and the string is printed out.

```python
# failing_script.py
import sys

sys.exit("Something bad happened")
```

Let's try it:

```bash
>>> python failing_script.py
Something bad happened
```

## How does sys.exit work?

When calling `sys.exit` it actually just raises an exception. The exception is `SystemExit`. It's unusual for a codebase to catch `SystemExit` exceptions - but it can be done.

```python
# refuse.py
import sys

try:
    sys.exit(1)
except SystemExit:
    print("I refuse!")

```

If we call it:

```bash
>>> python refuse.py
I refuse!
>>> echo $?
0
```

## Are there other exit codes?

In 99% of situations, `0` and `1` are sufficient as exit codes. There are [others](https://tldp.org/LDP/abs/html/exitcodes.html) though, but using them is rare.

```python
import sys

sys.exit(127)  # 127 means 'command not found'
```

## Why not just raise exceptions instead?

Rather than using `sys.exit`, you can just raise an exception.

```python
# exception_script.py
raise Exception('Something went wrong')
```

If this exception in unhandled, and causes the program to crash, the exit code will be `1`, and a traceback will be printed out:

```bash
>>> python exception_script.py
Traceback (most recent call last):
  File "exception_script.py", line 1, in <module>
    raise Exception("Something went wrong")
Exception: Something went wrong
```

Having more verbose output may be useful for debugging purposes. However, you don't necessarily want this level of information being shown to a user if it's a known exception.

By using `sys.exit` you can exit the program, and just show a message without a traceback.

Also, by using `sys.exit`, it indicates clearly within your code that the intention is to stop the program, vs an exception, which is often meant to be handled.

## Conclusions

So, should you use `sys.exit`? In summary, here are some situations where it is useful:

  * If you're writing code which will be consumed on the command line, and you want to exit the program without showing a traceback.
  * If you want to return an exit code other than 0 or 1.
  * To indicate clearly within your code that the intention is to stop the program.
