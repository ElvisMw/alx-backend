#!/usr/bin/env python3

"""
Simple Flask application with internationalization and user-specific settings
"""

from flask import Flask, render_template, request, g
from flask_babel import Babel, _

app = Flask(__name__)

# Configuration
app.config['BABEL_DEFAULT_LOCALE'] = 'en'  # Default locale
app.config['BABEL_DEFAULT_TIMEZONE'] = 'UTC'  # Default timezone
app.config['LANGUAGES'] = ['en', 'fr']  # Supported languages

# Babel initialization
babel = Babel(app)

# List of users with their profile information
users = {
    1: {"name": "Balou", "locale": "fr", "timezone": "Europe/Paris"},
    2: {"name": "Beyonce", "locale": "en", "timezone": "US/Central"},
    3: {"name": "Spock", "locale": "kg", "timezone": "Vulcan"},
    4: {"name": "Teletubby", "locale": None, "timezone": "Europe/London"},
}


def get_user():
    """
    Get the user's profile information based on the 'login_as'
    query parameter.
    Returns None if the parameter is not present or invalid.
    """
    try:
        user_id = int(request.args.get('login_as'))
        return users.get(user_id)
    except (TypeError, ValueError):
        return None


@app.before_request
def before_request():
    """
    Store the user's profile information in the global g object for
    use in templates.
    """
    g.user = get_user()


@babel.localeselector
def get_locale():
    """
    Select the best-matched locale based on the 'locale' query parameter, the
    user's locale, or the
    default locale.
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
    app.run()
