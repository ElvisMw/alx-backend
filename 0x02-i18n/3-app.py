#!/usr/bin/env python3

"""
Main application module for the Flask app.
"""

from flask import Flask, render_template, request
from flask_babel import Babel, _


app = Flask(__name__)

# Configuring the application
app.config['BABEL_DEFAULT_LOCALE'] = 'en'  # Default locale
app.config['BABEL_DEFAULT_TIMEZONE'] = 'UTC'  # Default timezone
app.config['LANGUAGES'] = ['en', 'fr']  # Supported languages

# Initializing Babel
babel = Babel(app)


@babel.localeselector
def get_locale():
    """
    Function to get the best-matched locale based on the request's
    Accept-Language header.
    """
    return request.accept_languages.best_match(app.config['LANGUAGES'])


@app.route('/')
def index():
    """
    Route to render the index page.
    """
    return render_template('3-index.html')


if __name__ == "__main__":
    app.run()
