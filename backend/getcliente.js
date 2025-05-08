document.getElementById('searchForm').addEventListener('submit', function(event) {
  event.preventDefault();

  const nombre = document.getElementById('nombre').value;
  const localidad = document.getElementById('localidad').value;
  const provincia = document.getElementById('provincia').value;
  const telefono1 = document.getElementById('telefono1').value;
  const nif = document.getElementById('nif').value;

  fetch('http://localhost:3000/api/auth/search-all-data', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ nombre, localidad, provincia, telefono1, nif })
  })
  .then(res => res.json())
  .then(data => {
    if (Array.isArray(data) && data.length > 0) {
      const cliente = data[0]; // Usamos solo el primer resultado

      // CLIENTE
      document.querySelector('#clienteTable tbody').innerHTML = `
        <tr class="table-row">
          <td class="table-cell" data-label="Nombre">${cliente.nombre}</td>
          <td class="table-cell" data-label="Apellido 1">${cliente.apellido_1}</td>
          <td class="table-cell" data-label="Apellido 2">${cliente.apellido_2 || ''}</td>
          <td class="table-cell" data-label="NIF">${cliente.nif}</td>
          <td class="table-cell" data-label="Teléfono 1">${cliente.telefono1}</td>
          <td class="table-cell" data-label="Teléfono 2">${cliente.telefono2 || ''}</td>
          <td class="table-cell" data-label="Localidad">${cliente.localidad}</td>
          <td class="table-cell" data-label="Provincia">${cliente.provincia}</td>
          <td class="table-cell" data-label="Fecha Nacimiento">${cliente.fecha_nacimiento ? new Date(cliente.fecha_nacimiento).toLocaleDateString() : ''}</td>
          <td class="table-cell" data-label="Estado Civil">${cliente.estado_civil}</td>
          <td class="table-cell" data-label="Número de Hijos">${cliente.numero_hijos}</td>
          <td class="table-cell" data-label="Dirección">${cliente.direccion}</td>
          <td class="table-cell" data-label="Código Postal">${cliente.codigo_postal}</td>
          <td class="table-cell" data-label="Vivienda">${cliente.vivienda}</td>
          <td class="table-cell" data-label="Situación">${cliente.situacion}</td>
          <td class="table-cell" data-label="Profesión">${cliente.profesion}</td>
          <td class="table-cell" data-label="Empresa">${cliente.empresa}</td>
          <td class="table-cell" data-label="Dirección Empresa">${cliente.direccion_empresa}</td>
          <td class="table-cell" data-label="Teléfono Empresa">${cliente.telefono_empresa}</td>
          <td class="table-cell" data-label="Antigüedad Laboral">${cliente.antiguedad_laboral}</td>
          <td class="table-cell" data-label="Ingreso Neto Mensual">${cliente.ingreso_neto_mensual}</td>
        </tr>
      `;

      // CONTRATO
      document.querySelector('#contratoTable tbody').innerHTML = `
        <tr class="table-row">
          <td class="table-cell" data-label="Número">${cliente.numero_contrato}</td>
          <td class="table-cell" data-label="Código Agente">${cliente.codigo_agente}</td>
          <td class="table-cell" data-label="Fecha Contrato">${cliente.fecha_contrato ? new Date(cliente.fecha_contrato).toLocaleDateString() : ''}</td>
          <td class="table-cell" data-label="Total Financiado">${cliente.total_financiado}</td>
          <td class="table-cell" data-label="Total Incluido">${cliente.total_incluido}</td>
          <td class="table-cell" data-label="Observaciones">${cliente.observaciones}</td>
        </tr>
      `;

      // ARTÍCULOS
      document.querySelector('#articulosTable tbody').innerHTML = `
        <tr class="table-row">
          <td class="table-cell" data-label="Descripción">${cliente.descripcion}</td>
          <td class="table-cell" data-label="Precio">${cliente.precio}</td>
          <td class="table-cell" data-label="Cantidad">${cliente.cantidad}</td>
        </tr>
      `;

      // PAGOS
      document.querySelector('#pagosTable tbody').innerHTML = `
        <tr class="table-row">
          <td class="table-cell" data-label="Forma de Pago">${cliente.forma_pago || ''}</td>
          <td class="table-cell" data-label="Cantidad">${cliente.cantidad || ''}</td>
          <td class="table-cell" data-label="Fecha de Pago">${cliente.fecha_pago ? new Date(cliente.fecha_pago).toLocaleDateString() : ''}</td>
          <td class="table-cell" data-label="Observaciones">${cliente.observaciones || ''}</td>
        </tr>
      `;

      // FIRMAS
      document.querySelector('#firmasTable tbody').innerHTML = `
        <tr class="table-row">
          <td class="table-cell" data-label="Firma Cliente">${cliente.firma_cliente || 'No disponible'}</td>
          <td class="table-cell" data-label="Firma Agente">${cliente.firma_agente || 'No disponible'}</td>
          <td class="table-cell" data-label="Firma Repartidor">${cliente.firma_repartidor || 'No disponible'}</td>
        </tr>
      `;

    } else {
      alert('No se encontraron resultados.');
    }
  })
  .catch(error => {
    console.error('Error:', error);
    alert('Ocurrió un error al buscar.');
  });
});
