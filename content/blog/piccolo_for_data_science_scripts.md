---
title: Piccolo for Data Science Scripts
date: 2021-09-17
description: Piccolo can be used in the simplest of data science scripts, here's an example of fetching data from a weather API and storing it in a SQLite database.
draft: false
---

We recently added the `create_tables` function to Piccolo ([docs](https://piccolo-orm.readthedocs.io/en/latest/piccolo/query_types/create_table.html)).

The idea was to make it easier for people writing simple data science scripts, who don't need more advanced features like migrations.

Here's a new [tutorial video](https://www.youtube.com/watch?v=yBGgK09H5rI) about it. And the example code from the video, which fetches data from [Open Weather Map](https://openweathermap.org/api), and loads it into SQLite:

```python
import asyncio
import decimal
import os

import httpx
from piccolo.columns.column_types import (
    Varchar,
    Numeric,
    ForeignKey,
    Timestamp,
)
from piccolo.engine.sqlite import SQLiteEngine
from piccolo.table import Table, create_tables
import dotenv


DB = SQLiteEngine("weather.sqlite")


class City(Table, db=DB):
    name = Varchar()


class WeatherData(Table, db=DB):
    city = ForeignKey(City)
    temp = Numeric()
    fetched_at = Timestamp()


dotenv.load_dotenv()
API_KEY = os.environ.get("API_KEY")


async def get_data(city_name: str, client: httpx.AsyncClient):
    """
    Fetch weather data from the Open Weather Map API.
    """
    url = (
        "https://api.openweathermap.org/data/2.5/weather"
        f"?q={city_name}&appid={API_KEY}"
    )
    response = await client.get(url)
    data = response.json()
    city = await City.objects().get_or_create(City.name == city_name).run()
    weather_data = WeatherData(
        temp=decimal.Decimal(data["main"]["temp"]), city=city
    )
    await weather_data.save().run()


async def main():
    create_tables(City, WeatherData, if_not_exists=True)

    async with httpx.AsyncClient() as client:
        await asyncio.gather(
            *[
                get_data(city_name=city_name, client=client)
                for city_name in ["London", "New York", "Paris"]
            ]
        )

    print("Loaded weather data")


if __name__ == "__main__":
    asyncio.run(main())
```
