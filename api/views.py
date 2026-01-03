from flask import Blueprint, jsonify, request
import requests
import random
import os 

API_KEY = os.environ.get('API_KEY')

views = Blueprint('views',__name__)

kenyaCities = ["Nairobi","Mombasa","Kisumu","Nakuru","Eldoret","Thika","Machakos","Meru","Embu","Nyeri","Kericho","Bomet","Narok","Naivasha","Kitale","Bungoma","Kakamega","Busia","Siaya","Homa Bay","Migori","Kisii","Nyamira","Rongo","Oyugis","Ahero","Voi","Taveta","Wundanyi","Malindi","Kilifi","Lamu","Garissa","Wajir","Mandera","Isiolo","Marsabit","Moyale","Kapenguria","Lodwar"];


@views.route('/data/')
def weather_data():
  city = random.choice(kenyaCities)
  url = f'https://api.openweathermap.org/data/2.5/weather?q={city}&appid={API_KEY}&units=metric'
  response = requests.get(url)
  if response.status_code == 200:
    values = response.json()
    formated_data = data_format(values)
    return jsonify(formated_data)
  else:
    return jsonify({'error': 'Error occured!'}), 400

@views.route('/search/', methods=['POST'])
def weather_search():
  data = request.get_json()
  city = data.get('city')
  
  if not city:
    return jsonify({'error': 'City is required'}), 400
  else:
    url = f'https://api.openweathermap.org/data/2.5/weather?q={city}&appid={API_KEY}&units=metric'
    response = requests.get(url)
    if response.status_code == 200:
      values = response.json()
      formated_data = data_format(values)
      return jsonify(formated_data)
    else:
      return jsonify({'error': 'Error occured!'}), 404
    
def data_format(data):
  return {
    'city': data['name'],
    'temp': data['main']['temp'],
    'temp_max': data['main']['temp_max'],
    'temp_min': data['main']['temp_min'],
    'feels_like': data['main']['feels_like'],
    'sea_level': data['main'].get('sea_level', 'N/A'),
    'pressure': data['main']['pressure'],
    'humidity': data['main']['humidity'],
    'grnd_level': data['main'].get('grnd_level', 'N/A'),
    'description': data['weather'][0]['description'],
    'main': data['weather'][0]['main'],
    'icon': data['weather'][0]['icon'],
    'wind': data['wind']['speed'],
    'country': data['sys']['country'],
    'sunrise': data['sys']['sunrise'],
    'sunset': data['sys']['sunset'],
  }