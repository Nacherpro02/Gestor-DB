document.addEventListener('DOMContentLoaded', () => {
    const submitBtn = document.querySelector('.button-p');
    const form1 = document.getElementById('form1');
    const form2 = document.getElementById('form2');
  
    submitBtn.addEventListener('click', (event) => {
      event.preventDefault();
  
      // Datos form1
      const formData1 = new FormData(form1);
      const data1 = Object.fromEntries(formData1.entries());
  
      // Datos form2
      const formData2 = new FormData(form2);
      const data2 = Object.fromEntries(formData2.entries());
  
      // Valores inputs radio
      const vivienda = document.querySelector('input[name="vivienda"]:checked');
      const situacion = document.querySelector('input[name="situacion"]:checked');
  
      data1.vivienda = vivienda ? vivienda.value : '';
      data1.situacion_laboral = situacion ? situacion.value : '';
  
      // Unir los datos
      const finalData = {
        ...data1,
        ...data2,
      };
  
      fetch('https://localhost:3000/api/auth/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(finalData),
      })
      .then(response => {
        if (!response.ok) throw new Error('Error al enviar los datos');
        return response.json();
      })
      .then(data => {
        console.log('Cliente guardado:', data);
        alert('Cliente añadido correctamente');
      })
      .catch(err => {
        console.error(err);
        alert('Hubo un error al guardar el cliente');
      });
    });
  });
  