#!/usr/bin/env python3

"""
This script defines a Flask application and sets up Babel for
internationalization.
"""

from flask import Flask, render_template
from flask_babel import Babel

# Create a Flask application
app = Flask(__name__)

# Set the default locale and timezone for Babel
app.config['BABEL_DEFAULT_LOCALE'] = 'en'
app.config['BABEL_DEFAULT_TIMEZONE'] = 'UTC'

# Set the languages to support
app.config['LANGUAGES'] = ['en', 'fr']

# Initialize Babel
babel = Babel(app)


@app.route('/')
def index():
    """
    This function handles the root route and renders the index.html template.

    Returns:
        The rendered index.html template.
    """
    return render_template('1-index.html')


if __name__ == "__main__":
    # Run the Flask application
    app.run()
