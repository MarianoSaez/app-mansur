from flask import Blueprint, render_template

dashboard_blueprint = Blueprint('dashboard', __name__, url_prefix='/')

@dashboard_blueprint.route('/')
def index():
    return render_template("index.html")

