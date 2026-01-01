<h1 style='font-size: 32px; text-align: center; margin-bottom: 20px auto; background-color:black;color: white;padding: 30px 1px;'>WEATHER APP</h1>

<h1 style='color:blue;'>Introduction</h1>
<p>A Flask-based weather application that displays real-time weather data for Kenyan cities using the OpenWeatherMap API. Get weather information for random cities or search for specific locations.</p>

<h1 style='color:blue;'>Project Preview</h1>
<div style='text-align:center;'>
  <img style="border-radius: 15px; border:4px solid green;" src="/images/preview.jpg" alt="Weather App Preview">
</div>

<h1 style='color:blue;'>Project Setup and Installation</h1>

<p><strong>1. Clone the repository:</strong></p>

```bash
git clone <your-repo-url>
cd WeatherApp
�
2. Create a virtual environment:


python -m venv env
source env/bin/activate  # On Windows: env\Scripts\activate
�
3. Install dependencies:


pip install flask flask-cors python-dotenv requests
�
4. Set up environment variables:


�
Create a .env file in the root directory:


cp .env.example .env
�
Add your API keys to .env:


API_KEY=your_openweathermap_api_key_here
SECRET_KEY=your_secret_key_here
�
5. Get an OpenWeatherMap API Key:
Sign up at OpenWeatherMap
Get your free API key
Add it to your .env file

�
6. Run the application:


python main.py
�
The server will run on http://127.0.0.1:5000. Open index.html in your browser.


�
Project Structure

￼ 


�
Note: The .env file is required but not tracked in git. Use .env.example as a template.


�
Technologies Used


�
Backend: Python, Flask, Flask-CORS, python-dotenv, requests


�
Frontend: HTML5, CSS3, JavaScript


�
API: OpenWeatherMap API


�
Live Demo

🚀 Deployed App Link (Coming soon)


�
Contact

GitHub: @braverachacha

Email: braverachacha@gmail.com


�
License

MIT License
