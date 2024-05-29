#!/usr/bin/env python3

"""
Simple web application that demonstrates Flask-Babel.
"""

from flask import Flask, render_template, request, g
from flask_babel import Babel, _
import pytz
from pytz import exceptions

# Initialize Flask application
app = Flask(__name__)

# Set default locale and timezone
app.config['BABEL_DEFAULT_LOCALE'] = 'en'
app.config['BABEL_DEFAULT_TIMEZONE'] = 'UTC'

# Set supported languages
app.config['LANGUAGES'] = ['en', 'fr']

# Initialize Babel extension
babel = Babel(app)

# Dictionary of users with their locale and timezone
users = {
    1: {"name": "Balou", "locale": "fr", "timezone": "Europe/Paris"},
    2: {"name": "Beyonce", "locale": "en", "timezone": "US/Central"},
    3: {"name": "Spock", "locale": "kg", "timezone": "Vulcan"},
    4: {"name": "Teletubby", "locale": None, "timezone": "Europe/London"},
}


def get_user():
    """
    Get user information from the request arguments.
    """
    try:
        user_id = int(request.args.get('login_as'))
        return users.get(user_id)
    except (TypeError, ValueError):
        return None


@app.before_request
def before_request():
    """
    Set the user in the request global state before each request.
    """
    g.user = get_user()


@babel.localeselector_func
def get_locale():
    """
    Select the locale for the user based on the request arguments.
    """
    locale = request.args.get('locale')
    if locale in app.config['LANGUAGES']:
        return locale
    user = g.get('user')
    if user and user['locale'] in app.config['LANGUAGES']:
        return user['locale']
    return request.accept_languages.best_match(app.config['LANGUAGES'])


@app.route('/')
def index():
    """
    Route to render the index page.
    """
    return render_template('3-index.html')


if __name__ == "__main__":
    """
    Run the application.
    """
    app.run()
