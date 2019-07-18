# Select

```python
await Band.select.columns(
    Band.name
).where(
    Band.popularity > 100
).run()
```

# Join

```python
await Band.select.columns(
    Band.name,
    Band.manager.name
).run()
```

# Delete

```python
await Band.delete.where(
    Band.band_members == 0 | Band.manager.status == 'disabled'
).run()
```

# Update

```python
await Band.update.values({Band.members: 5}).where(
    Band.name == 'Pythonistas'
).run()
```

Or, alternatively:

```python
band = await Band.select.where(Band.name == 'Pythonistas').first.run()
band.members = 5
await band.save.run()
```
