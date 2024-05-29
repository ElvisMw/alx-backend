#!/usr/bin/env python3
"""
Create a get_locale function with the babel.localeselector decorator.
Use request.accept_languages to determine the
best match with our supported languages.
"""
from flask import Flask, render_template, request
from flask_babel import Babel

app = Flask(__name__)

babel = Babel(app)


@app.route('/')
def index():
    """
    Route to render the index page.
    """
    return render_template('2-index.html')


@babel.localeselector
def get_locale():
    """
    Function to get the best-matched locale based on the request's
    Accept-Language header.
    """
    return request.accept_languages.best_match(app.config['LANGUAGES'])


if __name__ == "__main__":
    app.run()
