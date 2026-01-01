from flask import Blueprint, jsonify, json
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
  response = requests.get(f'{url}')
  if response.status_code == 200:
    values = response.json()
    return jsonify(values)
  else:
    return jsonify({'error': 'Error occured!'})