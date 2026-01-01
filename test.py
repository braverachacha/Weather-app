data_example = {
  "base": "stations",
  "clouds": {
    "all": 62
  },
  "cod": 200,
  "coord": {
    "lat": -0.509,
    "lon": 34.7358
  },
  "dt": 1767263435,
  "id": 181702,
  "main": {
    "feels_like": 27.09,
    "grnd_level": 862,
    "humidity": 30,
    "pressure": 1009,
    "sea_level": 1009,
    "temp": 27.99,
    "temp_max": 27.99,
    "temp_min": 27.99
  },
  "name": "Oyugis",
  "sys": {
    "country": "KE",
    "sunrise": 1767238792,
    "sunset": 1767282529
  },
  "timezone": 10800,
  "visibility": 10000,
  "weather": [
    {
      "description": "broken clouds",
      "icon": "04d",
      "id": 803,
      "main": "Clouds"
    }
  ],
  "wind": {
    "deg": 334,
    "gust": 4.79,
    "speed": 3.91
  }
}

print(data_example['wind']['speed'])
# print(data_example['weather'][0]['description'])