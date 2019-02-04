# Insert

We can now use insert data into our table. Create a main.py file.

There are two ways to do this, both of which are shown below.

```python
"""
main.py
"""
import asyncio

from tables import Band


async def insert_row():
    await Band.insert(
        Band(name="Pythonistas")
    ).run()


if __name__ == "__main__":
    asyncio.run(
        insert_row()
    )
```

Now you can run it, making sure you use a Python version >= 3.7.

```bash
python3.7 main.py
```

Inspect your database, and a row should have been inserted.
