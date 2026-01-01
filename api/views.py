from flask import Blueprint, jsonify
import requests
import random

views = Blueprint('views',__name__)

kenyaCities = ["Nairobi","Mombasa","Kisumu","Nakuru","Eldoret","Thika","Machakos","Meru","Embu","Nyeri","Kericho","Bomet","Narok","Naivasha","Kitale","Bungoma","Kakamega","Busia","Siaya","Homa Bay","Migori","Kisii","Nyamira","Rongo","Oyugis","Ahero","Voi","Taveta","Wundanyi","Malindi","Kilifi","Lamu","Garissa","Wajir","Mandera","Isiolo","Marsabit","Moyale","Kapenguria","Lodwar"];

@views.route('/data/')
def weather_data():
  return jsonify({'msg': f'{kenyaCities}'})