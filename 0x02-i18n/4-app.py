#!/usr/bin/env python3

"""
Flask web application that uses Flask-Babel for internationalization.
"""

from flask import Flask, render_template, request
from flask_babel import Babel, _


# Create the Flask application
app = Flask(__name__)

# Configure the application
app.config['BABEL_DEFAULT_LOCALE'] = 'en'  # Default locale
app.config['BABEL_DEFAULT_TIMEZONE'] = 'UTC'  # Default timezone
app.config['LANGUAGES'] = ['en', 'fr']  # Supported languages

# Initialize Flask-Babel
babel = Babel(app)


"""Function to select the best match locale based on
the request's Accept-Language header"""


def get_locale():
    """
    Select the best match locale based on the request's Accept-Language header

    If the 'locale' query parameter is present and is a supported language,
    return that locale.
    Otherwise, return the best match from the supported languages.

    :return: The best match locale.
    """
    locale = request.args.get('locale')
    if locale in app.config['LANGUAGES']:
        return locale
    return request.accept_languages.best_match(app.config['LANGUAGES'])

babel.init_app(app, locale_selector= get_locale)

# Route to render the index page
@app.route('/')
def index():
    """
    Route to render the index page.

    :return: The rendered index page.
    """
    return render_template('4-index.html')


# Run the application
if __name__ == "__main__":
    app.run()
