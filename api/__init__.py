from flask import Flask
from dotenv import load_dotenv
from flask_cors import CORS 
import os


load_dotenv()

def create_app():
  app = Flask(__name__) 
  app.config['API_KEY'] = os.environ.get('API_KEY')
  app.config['SECRET_KEY'] = os.environ.get('SECRET_KEY')

  CORS(app)
  
  from .views import views
  
  app.register_blueprint(views, url_prefix='/api')
  
  return app