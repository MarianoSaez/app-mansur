from enum import Enum

class TipoMuestra(Enum):
    SUELO = "SUELO"
    VEGETACION = "VEGETACION"
    AGUA = "AGUA"
    FRUTOS = "FRUTOS"
    SEMILLAS = "SEMILLAS"
    AIRE = "AIRE"
    ROCA = "ROCA"
    OTROS = "OTROS"
    # TODO: Implementar clase TipoMuestra en el futuro.

class Muestra:
    def __init__(self, cliente_key, tipo_muestra, subtipo=None, geolocalizacion=None, fotografia_url=None, numero_seguimiento=None, observaciones=None):
        self.cliente_key = cliente_key  # Key de la entidad Cliente en Datastore
        self.tipo_muestra = TipoMuestra(tipo_muestra)
        self.subtipo = subtipo
        self.geolocalizacion = geolocalizacion  # Esperando un tuple (latitud, longitud)
        self.fotografia_url = fotografia_url
        self.numero_seguimiento = numero_seguimiento
        self.observaciones = observaciones
    
    def serialize(self):
        data = {
            'cliente_key': self.cliente_key,  # La clave se serializa automáticamente en Datastore
            'tipo_muestra': self.tipo_muestra.value,
            'subtipo': self.subtipo,
            'geolocalizacion': self.geolocalizacion,
            'fotografia_url': self.fotografia_url,
            'numero_seguimiento': self.numero_seguimiento,
            'observaciones': self.observaciones,
        }
        # Eliminar claves con valores vacíos
        return {k: v for k, v in data.items() if v is not None}