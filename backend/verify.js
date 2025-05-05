document.getElementById("verifyCodeForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    const code = document.getElementById("code").value;
    const email = localStorage.getItem("recovery_email");
  
    const res = await fetch("http://127.0.0.1:3000/api/auth/verifycode", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, code })
    });
  
    if (res.ok) {
      alert("Código correcto");
      window.location.href = "/resetpassword.html";
    } else {
      alert("Código incorrecto o expirado");
    }
  });
  