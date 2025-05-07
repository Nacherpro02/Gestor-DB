
document.addEventListener("DOMContentLoaded", async () => {
const exist_code_mail = localStorage.getItem("recovery_email");

if (!exist_code_mail){
  alert("No existe ningun codigo de recuperacion actualmente o está expirado")
  window.location = "forgot.html"
}
const req = await fetch("http://127.0.0.1:3000/api/auth/existcode", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ email: exist_code_mail })
});

if (!req.ok){
  alert("No existe ningun codigo de recuperacion actualmente o está expirado")
  window.location = "forgot.html"
}


  async function getTime(){
    const req = await fetch('http://127.0.0.1:3000/api/auth/gettime', {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({email: exist_code_mail})
    })
    const data = await req.json();
    return data.time
  } 

  const countdownElement = document.getElementById("countdown");
  let timeLeft = await getTime();

  const formatTime = (seconds) => {
    const m = String(Math.floor(seconds / 60)).padStart(2, '0');
    const s = String(seconds % 60).padStart(2, '0');
    return `${m}:${s}`;
  };

  countdownElement.textContent = formatTime(timeLeft);

  const timer = setInterval(() => {
    timeLeft--;
    countdownElement.textContent = formatTime(timeLeft);

    if (timeLeft <= 0) {
      clearInterval(timer);
      countdownElement.textContent = "Código expirado";
      countdownElement.classList.add("expired");

      const input = document.getElementById("code");
      if (input) input.disabled = true;
    }
  }, 1000);

  //

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
  
})

