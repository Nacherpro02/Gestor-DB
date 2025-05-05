document.getElementById("resetPassForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    const newPass = document.getElementById("newPass").value;
    const email = localStorage.getItem("recovery_email");
  
    const res = await fetch("http://127.0.0.1:3000/api/auth/resetpassword", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, newPass })
    });
  
    if (res.ok) {
      alert("Contraseña actualizada");
      localStorage.removeItem("recovery_email");
      window.location.href = "/login.html";
    } else {
      alert("Error al cambiar la contraseña");
    }
  });
  