/**
 * Clientes JS - Aca van funciones relacionadas a toda ruta bajo /clientes
 */
// Creacion de clientes
document.addEventListener('DOMContentLoaded', function () {
    const toggleCreateFormBtn = document.getElementById('toggle-create-form');
    const createFormContainer = document.getElementById('create-form-container');
    const tipoPersonaSelect = document.getElementById('tipo_persona');
    const nombreApellidoGroup = document.getElementById('nombre-apellido-group');
    const nombreEmpresaGroup = document.getElementById('nombre-empresa-group');

    // Toggle visibility of the create form
    toggleCreateFormBtn.addEventListener('click', function () {
        createFormContainer.style.display = createFormContainer.style.display === 'none' ? 'block' : 'none';
    });

    // Adjust form fields based on selected tipo_persona
    tipoPersonaSelect.addEventListener('change', function () {
        if (this.value === 'Natural') {
            nombreApellidoGroup.style.display = 'block';
            nombreEmpresaGroup.style.display = 'none';
        } else {
            nombreApellidoGroup.style.display = 'none';
            nombreEmpresaGroup.style.display = 'block';
        }
    });

    // Initialize form state
    tipoPersonaSelect.dispatchEvent(new Event('change'));
});

const provincias = {
    "Argentina": ["Buenos Aires", "Córdoba", "Santa Fe", "Mendoza", "Tucumán", "Salta", "Jujuy", "Chaco", "Misiones", "Entre Ríos", "Corrientes", "Santiago del Estero", "San Juan", "San Luis", "La Rioja", "Catamarca", "La Pampa", "Neuquén", "Río Negro", "Chubut", "Santa Cruz", "Tierra del Fuego"],
    "Bolivia": ["Chuquisaca", "Cochabamba", "La Paz", "Oruro", "Pando", "Potosí", "Santa Cruz", "Tarija", "Beni"],
    "Brasil": ["Acre", "Alagoas", "Amapá", "Amazonas", "Bahía", "Ceará", "Distrito Federal", "Espírito Santo", "Goiás", "Maranhão", "Mato Grosso", "Mato Grosso del Sur", "Minas Gerais", "Pará", "Paraíba", "Paraná", "Pernambuco", "Piauí", "Río de Janeiro", "Río Grande del Norte", "Río Grande del Sur", "Rondônia", "Roraima", "Santa Catarina", "São Paulo", "Sergipe", "Tocantins"],
    "Canadá": ["Alberta", "Columbia Británica", "Manitoba", "Nuevo Brunswick", "Terranova y Labrador", "Territorios del Noroeste", "Nueva Escocia", "Nunavut", "Ontario", "Isla del Príncipe Eduardo", "Quebec", "Saskatchewan", "Yukón"],
    "Chile": ["Arica y Parinacota", "Tarapacá", "Antofagasta", "Atacama", "Coquimbo", "Valparaíso", "Metropolitana de Santiago", "O'Higgins", "Maule", "Ñuble", "Biobío", "Araucanía", "Los Ríos", "Los Lagos", "Aysén", "Magallanes"],
    "Colombia": ["Amazonas", "Antioquia", "Arauca", "Atlántico", "Bolívar", "Boyacá", "Caldas", "Caquetá", "Casanare", "Cauca", "Cesar", "Chocó", "Córdoba", "Cundinamarca", "Guainía", "Guaviare", "Huila", "La Guajira", "Magdalena", "Meta", "Nariño", "Norte de Santander", "Putumayo", "Quindío", "Risaralda", "San Andrés y Providencia", "Santander", "Sucre", "Tolima", "Valle del Cauca", "Vaupés", "Vichada"],
    "Costa Rica": ["San José", "Alajuela", "Cartago", "Heredia", "Guanacaste", "Puntarenas", "Limón"],
    "Cuba": ["Pinar del Río", "Artemisa", "La Habana", "Mayabeque", "Matanzas", "Cienfuegos", "Villa Clara", "Sancti Spíritus", "Ciego de Ávila", "Camagüey", "Las Tunas", "Holguín", "Granma", "Santiago de Cuba", "Guantánamo", "Isla de la Juventud"],
    "Ecuador": ["Azuay", "Bolívar", "Cañar", "Carchi", "Chimborazo", "Cotopaxi", "El Oro", "Esmeraldas", "Galápagos", "Guayas", "Imbabura", "Loja", "Los Ríos", "Manabí", "Morona Santiago", "Napo", "Orellana", "Pastaza", "Pichincha", "Santa Elena", "Santo Domingo de los Tsáchilas", "Sucumbíos", "Tungurahua", "Zamora Chinchipe"],
    "El Salvador": ["Ahuachapán", "Cabañas", "Chalatenango", "Cuscatlán", "La Libertad", "La Paz", "La Unión", "Morazán", "San Miguel", "San Salvador", "Santa Ana", "San Vicente", "Sonsonate", "Usulután"],
    "Guatemala": ["Alta Verapaz", "Baja Verapaz", "Chimaltenango", "Chiquimula", "Guatemala", "El Progreso", "Escuintla", "Huehuetenango", "Izabal", "Jalapa", "Jutiapa", "Petén", "Quetzaltenango", "Quiché", "Retalhuleu", "Sacatepéquez", "San Marcos", "Santa Rosa", "Sololá", "Suchitepéquez", "Totonicapán", "Zacapa"],
    "Honduras": ["Atlántida", "Colón", "Comayagua", "Copán", "Cortés", "Choluteca", "El Paraíso", "Francisco Morazán", "Gracias a Dios", "Intibucá", "Islas de la Bahía", "La Paz", "Lempira", "Ocotepeque", "Olancho", "Santa Bárbara", "Valle", "Yoro"],
    "México": ["Aguascalientes", "Baja California", "Baja California Sur", "Campeche", "Chiapas", "Chihuahua", "Ciudad de México", "Coahuila", "Colima", "Durango", "Estado de México", "Guanajuato", "Guerrero", "Hidalgo", "Jalisco", "Michoacán", "Morelos", "Nayarit", "Nuevo León", "Oaxaca", "Puebla", "Querétaro", "Quintana Roo", "San Luis Potosí", "Sinaloa", "Sonora", "Tabasco", "Tamaulipas", "Tlaxcala", "Veracruz", "Yucatán", "Zacatecas"],
    "Nicaragua": ["Boaco", "Carazo", "Chinandega", "Chontales", "Estelí", "Granada", "Jinotega", "León", "Madriz", "Managua", "Masaya", "Matagalpa", "Nueva Segovia", "Rivas", "Río San Juan", "Región Autónoma de la Costa Caribe Norte", "Región Autónoma de la Costa Caribe Sur"],
    "Panamá": ["Bocas del Toro", "Coclé", "Colón", "Chiriquí", "Darién", "Herrera", "Los Santos", "Panamá", "Panamá Oeste", "Veraguas", "Guna Yala", "Emberá-Wounaan", "Ngäbe-Buglé"],
    "Paraguay": ["Alto Paraguay", "Alto Paraná", "Amambay", "Asunción", "Boquerón", "Caaguazú", "Caazapá", "Canindeyú", "Central", "Concepción", "Cordillera", "Guairá", "Itapúa", "Misiones", "Ñeembucú", "Paraguarí", "Presidente Hayes", "San Pedro"],
    "Perú": ["Amazonas", "Áncash", "Apurímac", "Arequipa", "Ayacucho", "Cajamarca", "Callao", "Cusco", "Huancavelica", "Huánuco", "Ica", "Junín", "La Libertad", "Lambayeque", "Lima", "Loreto", "Madre de Dios", "Moquegua", "Pasco", "Piura", "Puno", "San Martín", "Tacna", "Tumbes", "Ucayali"],
    "Uruguay": ["Artigas", "Canelones", "Cerro Largo", "Colonia", "Durazno", "Flores", "Florida", "Lavalleja", "Maldonado", "Montevideo", "Paysandú", "Río Negro", "Rivera", "Rocha", "Salto", "San José", "Soriano", "Tacuarembó", "Treinta y Tres"],
    "Venezuela": ["Amazonas", "Anzoátegui", "Apure", "Aragua", "Barinas", "Bolívar", "Carabobo", "Cojedes", "Delta Amacuro", "Distrito Capital", "Falcón", "Guárico", "Lara", "Mérida", "Miranda", "Monagas", "Nueva Esparta", "Portuguesa", "Sucre", "Táchira", "Trujillo", "Vargas", "Yaracuy", "Zulia"],
    "Estados Unidos": ["Alabama", "Alaska", "Arizona", "Arkansas", "California", "Carolina del Norte", "Carolina del Sur", "Colorado", "Connecticut", "Dakota del Norte", "Dakota del Sur", "Delaware", "Florida", "Georgia", "Hawái", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", "Luisiana", "Maine", "Maryland", "Massachusetts", "Míchigan", "Minnesota", "Misisipi", "Misuri", "Montana", "Nebraska", "Nevada", "Nueva Jersey", "Nueva York", "Nuevo Hampshire", "Nuevo México", "Ohio", "Oklahoma", "Oregón", "Pensilvania", "Rhode Island", "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Virginia Occidental", "Washington", "Wisconsin", "Wyoming"],
    "Guyana": ["Barima-Waini", "Cuyuni-Mazaruni", "Demerara-Mahaica", "East Berbice-Corentyne", "Essequibo Islands-West Demerara", "Mahaica-Berbice", "Pomeroon-Supenaam", "Potaro-Siparuni", "Upper Demerara-Berbice", "Upper Takutu-Upper Essequibo"],
    "Surinam": ["Brokopondo", "Commewijne", "Coronie", "Marowijne", "Nickerie", "Para", "Paramaribo", "Saramacca", "Sipaliwini", "Wanica"],
    "Belice": ["Belice", "Cayo", "Corozal", "Orange Walk", "Stann Creek", "Toledo"],
    "Bahamas": ["Acklins", "Ábaco", "Andros", "Berry Islands", "Bimini", "Cat Island", "Crooked Island and Long Cay", "Eleuthera", "Exuma", "Grand Bahama", "Inagua", "Long Island", "Mayaguana", "New Providence", "Ragged Island", "Rum Cay", "San Salvador"],
    "Barbados": ["Christ Church", "Saint Andrew", "Saint George", "Saint James", "Saint John", "Saint Joseph", "Saint Lucy", "Saint Michael", "Saint Peter", "Saint Philip", "Saint Thomas"],
    "Trinidad y Tobago": ["Arima", "Chaguanas", "Couva-Tabaquite-Talparo", "Diego Martín", "Mayaro-Rio Claro", "Penal-Debe", "Point Fortin", "Port of Spain", "Princes Town", "San Fernando", "San Juan-Laventille", "Sangre Grande", "Siparia", "Tobago", "Tunapuna-Piarco"],
    "Jamaica": ["Clarendon", "Hanover", "Kingston", "Manchester", "Portland", "Saint Andrew", "Saint Ann", "Saint Catherine", "Saint Elizabeth", "Saint James", "Saint Mary", "Saint Thomas", "Trelawny", "Westmoreland"]
}

document.addEventListener('DOMContentLoaded', function () {
    const paisSelect = document.getElementById('pais');
    const provinciaSelect = document.getElementById('provincia');

    // Llenar el desplegable de países
    Object.keys(provincias).forEach(pais => {
        const option = document.createElement('option');
        option.value = pais;
        option.textContent = pais;
        paisSelect.appendChild(option);
    });

    // Actualizar el desplegable de provincias cuando se seleccione un país
    paisSelect.addEventListener('change', function () {
        const selectedPais = paisSelect.value;
        provinciaSelect.innerHTML = '<option value="">Seleccione...</option>'; // Limpiar opciones anteriores

        if (selectedPais) {
            provincias[selectedPais].forEach(provincia => {
                const option = document.createElement('option');
                option.value = provincia;
                option.textContent = provincia;
                provinciaSelect.appendChild(option);
            });
        }
    });
})

document.addEventListener('DOMContentLoaded', function () {
    const paisSelect = document.getElementById('edit_pais');
    const provinciaSelect = document.getElementById('edit_provincia');

    // Llenar el desplegable de países
    Object.keys(provincias).forEach(pais => {
        const option = document.createElement('option');
        option.value = pais;
        option.textContent = pais;
        paisSelect.appendChild(option);
    });

    // Actualizar el desplegable de provincias cuando se seleccione un país
    paisSelect.addEventListener('click', function () {
        const selectedPais = paisSelect.value;
        provinciaSelect.innerHTML = '<option value="">Seleccione...</option>'; // Limpiar opciones anteriores

        if (selectedPais) {
            provincias[selectedPais].forEach(provincia => {
                const option = document.createElement('option');
                option.value = provincia;
                option.textContent = provincia;
                provinciaSelect.appendChild(option);
            });
        }
    });
})


// Mostrar u ocultar campos según el tipo de persona
document.getElementById('tipo_persona').addEventListener('change', function () {
    const isNatural = this.value === 'Natural';
    document.getElementById('nombre-group').style.display = isNatural ? 'block' : 'none';
    document.getElementById('apellido-group').style.display = isNatural ? 'block' : 'none';
    document.getElementById('nombre_empresa-group').style.display = isNatural ? 'none' : 'block';

    // Manejo de validaciones
    document.getElementById('nombre').required = isNatural;
    document.getElementById('apellido').required = isNatural;
    document.getElementById('nombre_empresa').required = !isNatural;
})

export const openEditModal = (clienteId) => {
// Hacer una solicitud AJAX al backend para obtener los datos del cliente
fetch(`/clientes/api/${clienteId}`)
.then(response => response.json())
.then(cliente => {
  // Precargar los datos en el formulario de edición
  document.getElementById('edit_cliente_id').value = cliente.numero_identificacion;
  document.getElementById('edit_tipo_persona').value = cliente.tipo_persona;
  document.getElementById('edit_nombre').value = cliente.nombre;
  document.getElementById('edit_apellido').value = cliente.apellido;
  document.getElementById('edit_nombre_empresa').value = cliente.nombre_empresa;
  document.getElementById('edit_tipo_identificacion').value = cliente.tipo_identificacion;
  document.getElementById('edit_numero_identificacion').value = cliente.numero_identificacion;
  document.getElementById('edit_pais').value = cliente.pais;
  document.getElementById('edit_provincia').value = cliente.provincia;
  document.getElementById('edit_observaciones').value = cliente.observaciones;

  // Mostrar el modal de edición
  $('#editClienteModal').modal('show');

  // Lógica para mostrar u ocultar los campos según el tipo de persona
  if (cliente.tipo_persona === 'Natural') {
    document.getElementById('edit_nombre_group').style.display = 'block';
    document.getElementById('edit_apellido_group').style.display = 'block';
    document.getElementById('edit_nombre_empresa_group').style.display = 'none';
  } else {
    document.getElementById('edit_nombre_group').style.display = 'none';
    document.getElementById('edit_apellido_group').style.display = 'none';
    document.getElementById('edit_nombre_empresa_group').style.display = 'block';
  }
})
.catch(error => {
  console.error('Error al obtener los datos del cliente:', error);
  alert('No se pudo cargar la información del cliente.');
});
  }


