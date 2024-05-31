#!/usr/bin/env python3
"""
This is a Flask web application that demonstrates the usage of
Flask-Babel and timezone support.
"""

from flask import Flask, render_template, request, g
from flask_babel import Babel, _
import pytz
from pytz.exceptions import UnknownTimeZoneError

# Dictionary of user information
users = {
    1: {"name": "Balou", "locale": "fr", "timezone": "Europe/Paris"},
    2: {"name": "Beyonce", "locale": "en", "timezone": "US/Central"},
    3: {"name": "Spock", "locale": "kg", "timezone": "Vulcan"},
    4: {"name": "Teletubby", "locale": None, "timezone": "Europe/London"},
}


class Config:
    """
    Configuration class for the Flask application.
    """
    LANGUAGES = ['en', 'fr']
    BABEL_DEFAULT_LOCALE = 'en'
    BABEL_DEFAULT_TIMEZONE = 'UTC'


app = Flask(__name__)
app.config.from_object(Config)
babel = Babel(app)


def get_user():
    """
    Retrieves the user object based on the provided 'login_as' query parameter

    Returns:
        The user object if the 'login_as' query parameter is present
        and matches a valid user ID.
        None otherwise.
    """
    user_id = request.args.get('login_as')
    if user_id and int(user_id) in users:
        return users[int(user_id)]
    return None


@app.before_request
def before_request():
    """
    A function that is executed before each request is processed.
    It sets the 'g.user' variable to the result of the 'get_user' function.
    This function does not take any parameters and does not return any value.
    """
    g.user = get_user()


def get_locale():
    """
    Function to get the best-matched locale based on the request's
    Accept-Language header and URL parameters.

    Returns:
        str: The best-matched locale.
    """
    locale = request.args.get('locale')
    if locale and locale in app.config['LANGUAGES']:
        return locale
    if g.user:
        user_locale = g.user.get('locale')
        if user_locale in app.config['LANGUAGES']:
            return user_locale
    return request.accept_languages.best_match(app.config['LANGUAGES'])


babel = Babel(app, locale_selector=get_locale)


def get_timezone():
    """
    Function to get the timezone based on the request's
    URL parameters and user information.

    Returns:
        str: The timezone.
    """
    timezone = request.args.get('timezone')
    if not timezone and g.user:
        timezone = g.user.get('timezone')
    if timezone:
        try:
            return pytz.timezone(timezone).zone
        except UnknownTimeZoneError:
            pass
    return app.config['BABEL_DEFAULT_TIMEZONE']


babel = Babel(app, locale_selector=get_timezone)


@app.route('/')
def index():
    """
    Route for the home page of the web application.

    Returns:
        The rendered template '7-index.html'.
    """
    return render_template('7-index.html')


if __name__ == '__main__':
    app.run(debug=True)
    app.run(debug=True)
