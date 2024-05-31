#!/usr/bin/env python3
"""
Flask web application that uses Flask-Babel for internationalization.
"""

from flask import Flask, render_template, request
from flask_babel import Babel, _


class Config:
    """
    Configuration class for Flask app.
    """
    LANGUAGES = ['en', 'fr']
    BABEL_DEFAULT_LOCALE = 'en'
    BABEL_DEFAULT_TIMEZONE = 'UTC'


app = Flask(__name__)
app.config.from_object(Config)
babel = Babel(app)


def get_locale():
    """
    Function to get the best-matched locale based on the request's
    Accept-Language header and URL parameters.

    Returns:
        str: The best-matched locale.
    """
    # Check for a locale argument in the URL parameters
    locale = request.args.get('locale')
    if locale in app.config['LANGUAGES']:
        return locale
    return request.accept_languages.best_match(app.config['LANGUAGES'])


babel = Babel(app, locale_selector=get_locale)


@app.route('/')
def index():
    """
    Route to render the index page.

    Returns:
        The rendered index page.
    """
    return render_template('4-index.html')


if __name__ == '__main__':
    # Run the application in debug mode
    app.run(debug=True)
