# Reasons to use an ORM

## Benefits of an ORM

### Convenience

A good ORM should make a developer's life easier. It should take care of the tedious things, like escaping values. An ORM can also have a more compact syntax than SQL. This is most obvious with joins.

```python
query = Band.select.columns(Band.name, Band.genre.name)

query.__str__()

SELECT name, genre.name FROM band JOIN genre ON band.genre = genre.id

```

### Batteries included

One of the most useful things an ORM comes bundled with is migrations. Handling migrations manually can be tedious and error prone.

ORMs often include other tools and features which make a developer's life easier. Examples include test runners, data fixtures etc.

### Passing around partial queries

With Piccolo, you can pass around queries, and keep on chaining methods onto it.

```python
query = Band.select.columns(Band.name)

if rock == True:
    query = query.where(Band.genre == 'rock')

results = await query.run()

```

Doing this with raw SQL strings quickly becomes unmanageable.

## Downsides of an ORM

ORMs aren't without their issues.

### Performance

When you use an ORM, there is inevitable extra overhead in generating the SQL.

You'll sometimes hear people complain that an ORM generates inefficient SQL. This is usually only for very complex queries.

There's nothing wrong with writing raw SQL, but with Piccolo it means you don't have to write it 90% of the time.

Piccolo also makes it easy to see the SQL being executed - just print any query.

### Can be tedious to learn

A lot of ORMs have their own terminology which doesn't match closely to SQL.

Over time, learning an ORM can feel tedious - you know SQL, but you're having to re-learn concepts over and over for each ORM you use.

### Some database features aren't available

The Piccolo ORM covers the most common interactions an app will have to make with a database.

In cases where it's not possible, you can just drop down into raw SQL.

Trying to encapsulate every possible database features within an ORM is very challenging, and can lead to an unmanageable code base.
