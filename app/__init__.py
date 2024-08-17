from flask import Flask
from .auth.auth import auth_blueprint
from .core.routes.dashboard import dashboard_blueprint
from .core.routes.clientes import clientes_blueprint

def create_app():
    app = Flask(__name__)

    # Registrar los Blueprints
    app.register_blueprint(auth_blueprint)
    app.register_blueprint(dashboard_blueprint)
    app.register_blueprint(clientes_blueprint)

    return app