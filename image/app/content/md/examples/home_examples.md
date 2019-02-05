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
await Band.update(band_members=5).where(
    Band.name == 'Pythonistas'
).run()
```
