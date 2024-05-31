#!/usr/bin/env python3

"""
Web application that uses Flask-Babel for internationalization.
"""


class Config:
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
    if user_id and int(user_id) in users:
        return users[int(user_id)]
    return None


babel = Babel(app, locale_selector=get_locale)


@app.before_request
def before_request():
    """
    A function that is executed before each request is processed.
    It sets the 'g.user' variable to the result of the 'get_user' function.
    This function does not take any parameters and does not return any value.
    """


def get_locale():
    """
    Function to get the best-matched locale based on the request's
    Accept-Language header and URL parameters.

    Returns:
        str: The best-matched locale.
    """
    if locale and locale in app.config['LANGUAGES']:
        return locale
    if g.user:
        user_locale = g.user.get('locale')
        if user_locale in app.config['LANGUAGES']:
            return user_locale
    return request.accept_languages.best_match(app.config['LANGUAGES'])


@app.route('/')
def index():
    """
    Route decorator for the root URL ("/") that handles the index page.

    Returns:
        The rendered template for the "5-index.html" page.
    """


if __name__ == '__main__':
    app.run(debug=True)
