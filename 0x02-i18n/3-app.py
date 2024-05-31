#!/usr/bin/env python3

"""
Flask web application that uses Flask-Babel for internationalization.
"""

from flask import Flask, render_template, request
from flask_babel import Babel, _


class Config:
    """
    Configuration class for Flask app.

    Attributes:
        LANGUAGES (list): List of supported languages.
        BABEL_DEFAULT_LOCALE (str): Default locale.
        BABEL_DEFAULT_TIMEZONE (str): Default timezone.
    """
    LANGUAGES = ['en', 'fr']
    BABEL_DEFAULT_LOCALE = 'en'
    BABEL_DEFAULT_TIMEZONE = 'UTC'


app = Flask(__name__)

# Configure the application using the Config class
app.config.from_object(Config)

# Initialize Flask-Babel
babel = Babel(app)


def get_locale():
    """
    Function to get the best-matched locale based on the request's
    Accept-Language header.

    Returns:
        str: The best-matched locale.
    """
    locale = request.args.get('locale')
    if locale in app.config['LANGUAGES']:
        return locale

    # Return the best match from the supported languages
    return request.accept_languages.best_match(app.config['LANGUAGES'])


# Initialize Flask-Babel with the get_locale function as the locale selector
babel = Babel(app, locale_selector=get_locale)


@app.route('/')
def index():
    """
    Route to render the index page.

    Returns:
        The rendered index page.
    """
    return render_template('3-index.html')


if __name__ == '__main__':
    # Run the application in debug mode
    app.run(debug=True)
