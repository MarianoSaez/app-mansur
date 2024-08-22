from enum import Enum

class TipoPersona(Enum):
    NATURAL = "Natural"
    JURIDICA = "Juridica"

class TipoIdentificacion(Enum):
    CUIT = "CUIT"
    CUIL = "CUIL"
    DNI = "DNI"
    PASAPORTE = "PASAPORTE"
    OTRO = "OTRO"

class Cliente:
    def __init__(self, tipo_persona=None, nombre=None, apellido=None, nombre_empresa=None, tipo_identificacion=None, numero_identificacion=None, pais=None, provincia=None, direccion=None, geolocalizacion=None, observaciones=None):
        self.tipo_persona = TipoPersona(tipo_persona)
        self.nombre = nombre
        self.apellido = apellido
        self.nombre_empresa = nombre_empresa
        self.tipo_identificacion = TipoIdentificacion(tipo_identificacion) if tipo_identificacion else None
        self.numero_identificacion = numero_identificacion
        self.pais = pais
        self.provincia = provincia
        self.direccion = direccion
        self.geolocalizacion = geolocalizacion  # Esperando un tuple (latitud, longitud)
        self.observaciones = observaciones
    
def serialize(cliente):
    data = {
        'tipo_persona': cliente["tipo_persona"],
        'nombre': cliente["nombre"],
        'apellido': cliente["apellido"],
        'nombre_empresa': cliente["nombre_empresa"],
        'tipo_identificacion': cliente["tipo_identificacion"],
        'numero_identificacion': cliente["numero_identificacion"],
        'pais': cliente["pais"],
        'provincia': cliente["provincia"],
        'direccion': cliente["direccion"],
        'geolocalizacion': cliente["geolocalizacion"],
        'observaciones': cliente["observaciones"],
    }
    # Eliminar claves con valores vacíos
    return {k: v for k, v in data.items() if v is not None}
    
def parse_from_request(request):
    data = [
        'tipo_persona',
        'nombre',
        'apellido',
        'nombre_empresa',
        'tipo_identificacion',
        'numero_identificacion',
        'pais',
        'provincia',
        'direccion',
        'geolocalizacion',
        'observaciones',
    ]
    return { k : request.form.get(k) for k in data }