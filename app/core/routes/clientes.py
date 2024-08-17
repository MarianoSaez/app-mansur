from flask import Blueprint, render_template

clientes_blueprint = Blueprint('clientes', __name__, url_prefix='/clientes')

@clientes_blueprint.route('/')
def clientes_content():
    # Aquí obtienes los datos de los clientes desde tu base de datos y los pasas al template
    clientes = get_lista_de_clientes()  # Implementa esta función para obtener los datos
    return render_template('clientes.html', clientes=clientes)

@clientes_blueprint.route("/<cliente_id>")
def single_cliente(cliente_id):
    cliente = get_cliente(cliente_id)
    return render_template('single-cliente.html', cliente=cliente)


def get_lista_de_clientes():
    # Simulación de clientes. Aquí debes consultar tu base de datos real.
    return [
        {'tipo_persona': 'Natural', 'nombre': 'Juan', 'apellido': 'Pérez', 'nombre_empresa': None, 'tipo_identificacion': 'DNI', 'numero_identificacion': '12345678', 'pais': 'Argentina', 'provincia': 'Buenos Aires', 'direccion': 'Calle Falsa 123', 'geolocalizacion': (-34.6037, -58.3816), 'observaciones': 'Cliente VIP'},
        {'tipo_persona': 'Juridica', 'nombre': None, 'apellido': None, 'nombre_empresa': 'TechCorp S.A.', 'tipo_identificacion': 'CUIT', 'numero_identificacion': '30-12345678-9', 'pais': 'Argentina', 'provincia': 'Buenos Aires', 'direccion': 'Av. Siempreviva 456', 'geolocalizacion': (-34.6037, -58.3816), 'observaciones': 'Empresa con grandes volúmenes de compra'}
    ]

def get_cliente(cliente_id):
    return {
        "tipo_persona": "Natural",
        "nombre": "Juan",
        "apellido": "Pérez",
        "nombre_empresa": None,
        "tipo_identificacion": "DNI",
        "numero_identificacion": "12345678",
        "pais": "Argentina",
        "provincia": "Buenos Aires",
        "direccion": "Calle Falsa 123",
        "geolocalizacion": {
            "latitud": -34.6037,
            "longitud": -58.3816
        },
        "observaciones": "Cliente regular, con historial de compras frecuente."
    }


def create_cliente():
    pass

def update_cliente(cliente_id):
    pass

def delete_cliente(cliente_id):
    pass