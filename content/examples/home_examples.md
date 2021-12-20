# Select

```python
>>> await Band.select(
>>>     Band.name
>>> ).where(
>>>     Band.popularity > 100
>>> )

[
    {
        'name': 'Pythonistas',
    }
]
```

# Join

```python
>>> await Band.select(
>>>     Band.name,
>>>     Band.manager.name.as_alias('manager_name')
>>> )

[
    {
        'name': 'Pythonistas',
        'manager_name': 'Guido'
    },
    ...
]
```

# Delete

```python
await Band.delete().where(
    (Band.band_members == 0) | (Band.manager.status == 'disabled')
)
```

# Update

```python
await Band.update({Band.members: 5}).where(
    Band.name == 'Pythonistas'
)
```

Or, alternatively:

```python
band = await Band.objects().get(Band.name == 'Pythonistas')
band.members = 5
await band.save()
```
