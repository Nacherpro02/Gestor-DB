const token = localStorage.getItem('token');

document.getElementById('logoutBtn').addEventListener('click', () => {
  localStorage.removeItem('token');
  window.location.href = 'login.html';
});


if (!token) {
  window.location.href = 'login.html';
}

fetch('http://localhost:3000/api/auth/protected', {
  method: 'GET',
  headers: { 'x-auth-token': token } 
})
  .then(res => res.json())
  .then(data => {
    if (data.msg !== 'Valid token') {
      alert(data.msg);
      localStorage.removeItem('token');
      window.location.href = 'login.html';
    } else {
      console.log(data); 
    }
  })
  .catch(() => {
    window.location.href = 'login.html';
  });
