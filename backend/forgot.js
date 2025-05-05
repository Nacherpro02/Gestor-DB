document.getElementById("formpass").addEventListener("submit", async (e) => {
    e.preventDefault();
    const destination = document.getElementById("destination").value;
    localStorage.setItem("recovery_email", destination);
  
    const res = await fetch('http://127.0.0.1:3000/api/auth/getcode', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ destination })
    });
  
    if (res.ok) {
      alert("Código enviado");
      window.location.href = "/verify.html";
    } else {
      alert("Error al enviar código");
    }
  });
  