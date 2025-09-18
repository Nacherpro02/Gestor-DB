document.getElementById('registerForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const pass1 = document.getElementById("password").value;
  const pass2 = document.getElementById("password2").value;
  console.log("Pass1:", pass1)
  console.log("Pass2:", pass2)
  if (pass1 != pass2){
    alert("La contraseña no coincide")
  } else {
    alert("coincide")
  }

});
