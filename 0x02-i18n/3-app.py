#!/usr/bin/env python3

"""
Main application module.
"""

from flask import Flask, render_template, request
from flask_babel import Babel, _

app = Flask(__name__)

# Set default configuration
app.config['BABEL_DEFAULT_LOCALE'] = 'en'
app.config['BABEL_DEFAULT_TIMEZONE'] = 'UTC'
app.config['LANGUAGES'] = ['en', 'fr']

# Initialize Babel
babel = Babel(app)


def get_locale():
    """
    Function to get the best-matched locale based on the request's
    Accept-Language header.

    Returns:
        str: The best-matched language.
    """
    return request.accept_languages.best_match(app.config['LANGUAGES'])


@babel.localeselector
def get_locale():
    """
    Select the best-matched locale based on the request's Accept-Language
    header.

    Returns:
        str: The best-matched language.
    """
    return request.accept_languages.best_match(app.config['LANGUAGES'])


@app.route('/')
def index():
    """
    Route to render the index page.

    Returns:
        rendered template '3-index.html'
    """
    return render_template('3-index.html')


if __name__ == "__main__":
    app.run()
