from flask import (
    Blueprint,
    render_template,
    request,
    redirect,
    url_for,
    jsonify
    )
from google.cloud import datastore
from ...models.cliente import parse_from_request, Cliente, serialize

# Flask globals
clientes_blueprint = Blueprint('clientes', __name__, url_prefix='/clientes')

# Google globals
datastore_client = datastore.Client()

@clientes_blueprint.route('/')
def clientes_content():
    # Aquí obtienes los datos de los clientes desde tu base de datos y los pasas al template
    clientes = get_lista_de_clientes()  # Implementa esta función para obtener los datos
    return render_template('clientes.html', clientes=clientes)

@clientes_blueprint.route("/<cliente_id>")
def single_cliente(cliente_id):
    cliente = get_cliente(int(cliente_id))
    return render_template('single-cliente.html', cliente=cliente)

@clientes_blueprint.route("/create_cliente", methods=["POST"])
def crear_cliente():
    data = parse_from_request(request)

    # Limpiar campos no aplicables
    if data['tipo_persona'] == 'Natural':
        data['nombre_empresa'] = None
    else:
        data['nombre'] = None
        data['apellido'] = None

    create_cliente(data)
    return redirect(url_for("clientes.clientes_content"))

@clientes_blueprint.route('/editar_cliente', methods=['POST'])
def editar_cliente():
    cliente_id = request.form.get('cliente_id')
    
    # Aquí realizarías la lógica para actualizar el cliente en la base de datos
    cliente_key = datastore_client.key('Cliente', int(cliente_id))
    cliente = datastore_client.get(cliente_key)
    
    if cliente:
        data = serialize(parse_from_request(request))
        print(data)
        for k, v in data.items():
            cliente[k] = v
        print(cliente)
        datastore_client.put(cliente)
    
    return redirect(url_for('clientes.clientes_content'))

@clientes_blueprint.route('/eliminar_cliente', methods=['POST'])
def eliminar_cliente():
    cliente_id = request.form.get('cliente_id')
    print(request.form)
    if cliente_id:
        key = datastore_client.key('Cliente', int(cliente_id))
        datastore_client.delete(key)
        return redirect(url_for('clientes.clientes_content'))
    return 'Cliente no encontrado', 404

# REST
@clientes_blueprint.route("/api/<cliente_id>")
def get(cliente_id):
    cliente = get_cliente(int(cliente_id))
    cliente["cliente_id"] = int(cliente_id)
    return jsonify(cliente)

def get_lista_de_clientes():
    # Simulación de clientes. Aquí debes consultar tu base de datos real.
    query = datastore_client.query(kind="Cliente")
    query.order = ["nombre"]
    clientes = query.fetch(limit=25)
    return clientes

def get_cliente(cliente_id):
    cliente_entity = datastore_client.get(datastore_client.key("Cliente", cliente_id))
    if not cliente_entity:
        return "Cliente no encontrado", 404
    cliente_data = cliente_entity
    return cliente_data

def create_cliente(cliente_data):
    cliente = None
    message = None
    code = 200
    try:
        cliente = datastore.Entity(key=datastore_client.key('Cliente'))
        cliente.update(cliente_data)
        datastore_client.put(cliente)
        message = "OK"
    except Exception as e:
        code = 500
        message = str(e)
    
    return {
        "code": code,
        "message": message,
        "cliente": cliente
    }
 
def update_cliente(cliente_id):
    pass

def delete_cliente(cliente_id):
    pass