#!/usr/bin/env python3
"""Main application module."""

from flask import Flask, render_template


app = Flask(__name__)


@app.route('/')
def index():
    """Handle root route."""
    return render_template('0-index.html')


if __name__ == "__main__":
    """Run the application."""
    app.run()
