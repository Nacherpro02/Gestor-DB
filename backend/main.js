document.addEventListener('DOMContentLoaded', function() {
    const token = localStorage.getItem('authToken');

    if (!token) {
        // Si no hay token, redirigir al login
        window.location.href = 'index.html';
    }

    // Verificar el token en el servidor
    fetch('http://localhost:3000/api/verifyToken', {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + token
        }
    })
    .then(response => response.json())
    .then(data => {
        if (data.message !== 'Token valid') {
            window.location.href = 'login.html';
        }
    })
    .catch(err => {
        console.log('Error verifying token:', err);
        window.location.href = 'login.html';
    });
});
