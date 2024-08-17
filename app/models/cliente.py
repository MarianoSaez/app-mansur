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
    def __init__(self, tipo_persona, nombre=None, apellido=None, nombre_empresa=None, tipo_identificacion=None, numero_identificacion=None, pais=None, provincia=None, direccion=None, geolocalizacion=None, observaciones=None):
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
    
    def serialize(self):
        data = {
            'tipo_persona': self.tipo_persona.value,
            'nombre': self.nombre,
            'apellido': self.apellido,
            'nombre_empresa': self.nombre_empresa,
            'tipo_identificacion': self.tipo_identificacion.value if self.tipo_identificacion else None,
            'numero_identificacion': self.numero_identificacion,
            'pais': self.pais,
            'provincia': self.provincia,
            'direccion': self.direccion,
            'geolocalizacion': self.geolocalizacion,
            'observaciones': self.observaciones
        }
        # Eliminar claves con valores vacíos
        return {k: v for k, v in data if v is not None}