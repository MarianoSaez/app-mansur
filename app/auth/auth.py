from flask import Blueprint, render_template

auth_blueprint = Blueprint('auth', __name__, url_prefix='/auth')

@auth_blueprint.route('/login')
def login():
    return render_template("login.html")

@auth_blueprint.route('/logout')
def logout():
    return ## TO DEFINE

