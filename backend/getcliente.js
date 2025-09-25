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
    console.log(data);

    if (Array.isArray(data) && data.length > 0) {
      // Limpiar tablas
      document.querySelector('#clienteTable tbody').innerHTML = '';
      document.querySelector('#contratoTable tbody').innerHTML = '';
      document.querySelector('#articulosTable tbody').innerHTML = '';
      document.querySelector('#pagosTable tbody').innerHTML = '';
      document.querySelector('#firmasTable tbody').innerHTML = '';

      data.forEach(entry => {
        const cliente = entry.datos_usuario;

        // Cliente
        document.querySelector('#clienteTable tbody').innerHTML += `
          <tr class="table-row">
            <td>${cliente.nombre}</td>
            <td>${cliente.apellido_1}</td>
            <td>${cliente.apellido_2 || ''}</td>
            <td>${cliente.nif || cliente.nie}</td>
            <td>${cliente.telefono1}</td>
            <td>${cliente.telefono2 || ''}</td>
            <td>${cliente.localidad}</td>
            <td>${cliente.provincia}</td>
            <td>${cliente.fecha_nacimiento ? new Date(cliente.fecha_nacimiento).toLocaleDateString() : ''}</td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
        `;

        entry.contratos.forEach(contrato => {
          const datos = contrato.datos_contrato;

          // Contrato
          document.querySelector('#contratoTable tbody').innerHTML += `
            <tr class="table-row">
              <td>${contrato.numero_contrato}</td>
              <td>${datos.codigo_agente}</td>
              <td>${datos.fecha_contrato ? new Date(datos.fecha_contrato).toLocaleDateString() : ''}</td>
              <td>${datos.total_financiado}</td>
              <td>${datos.total_incluido}</td>
              <td>${datos.observaciones || ''}</td>
            </tr>
          `;

          // Artículos
          if (Array.isArray(contrato.articulos)) {
            contrato.articulos.forEach(articulo => {
              document.querySelector('#articulosTable tbody').innerHTML += `
                <tr class="table-row">
                  <td>${contrato.numero_contrato}</td>
                  <td>${articulo.descripcion}</td>
                  <td>${articulo.precio}</td>
                  <td>${articulo.cantidad}</td>
                  <td>${articulo.fecha_entrega ? new Date(articulo.fecha_entrega).toLocaleDateString() : ''}</td>
                </tr>
              `;
            });
          }

          // Firmas
          if (contrato.firmas) {
            document.querySelector('#firmasTable tbody').innerHTML += `
              <tr class="table-row">
                <td>${contrato.firmas.firma_cliente || 'No disponible'}</td>
                <td>${contrato.firmas.firma_agente || 'No disponible'}</td>
                <td>${contrato.firmas.firma_repartidor || 'No disponible'}</td>
              </tr>
            `;
          }

          // Pagos (si tu backend lo devuelve después)
          if (Array.isArray(contrato.pagos)) {
            contrato.pagos.forEach(pago => {
              document.querySelector('#pagosTable tbody').innerHTML += `
                <tr class="table-row">
                  <td>${pago.forma_pago || ''}</td>
                  <td>${pago.cantidad || ''}</td>
                  <td>${pago.fecha_pago ? new Date(pago.fecha_pago).toLocaleDateString() : ''}</td>
                  <td>${pago.observaciones || ''}</td>
                </tr>
              `;
            });
          }
        });
      });

    } else {
      alert('No se encontraron resultados.');
    }
  })
  .catch(error => {
    console.error('Error:', error);
    alert('Ocurrió un error al buscar.');
  });
});
