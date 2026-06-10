<<<<<<< HEAD
// ============================================
// CONFIGURACIÓN
// ============================================
const API_URL = 'https://mi-rifa-backend.onrender.com/api';

// ============================================
// UTILIDADES
// ============================================

// Obtener token del localStorage
function getToken() {
    return localStorage.getItem('token');
}

// Obtener usuario del localStorage
function getUser() {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
}

// Verificar si está logueado
function isLoggedIn() {
    return getToken() !== null;
}

// Cerrar sesión
function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/index.html';
}

// Mostrar alerta
function showAlert(message, type = 'success') {
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type}`;
    alertDiv.textContent = message;
    
    const container = document.querySelector('.container') || document.body;
    container.insertBefore(alertDiv, container.firstChild);
    
    setTimeout(() => alertDiv.remove(), 5000);
}

// Headers con autenticación
function getHeaders() {
    const headers = {
        'Content-Type': 'application/json'
    };
    
    const token = getToken();
    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }
    
    return headers;
}

// ============================================
// FUNCIONES DE AUTENTICACIÓN
// ============================================

// Registro
async function register(nombre, email, password, telefono) {
    try {
        const response = await fetch(`${API_URL}/auth/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nombre, email, password, telefono })
        });

        const data = await response.json();

        if (data.success) {
            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data.user));
            showAlert('¡Registro exitoso!');
            setTimeout(() => window.location.href = '/pages/dashboard.html', 1000);
            return data;
        } else {
            showAlert(data.message || 'Error en el registro', 'error');
            return null;
        }
    } catch (error) {
        showAlert('Error de conexión', 'error');
        return null;
    }
}

// Login
async function login(email, password) {
    try {
        const response = await fetch(`${API_URL}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();

        if (data.success) {
            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data.user));
            showAlert('¡Inicio de sesión exitoso!');
            setTimeout(() => window.location.href = '/pages/dashboard.html', 1000);
            return data;
        } else {
            showAlert(data.message || 'Credenciales inválidas', 'error');
            return null;
        }
    } catch (error) {
        showAlert('Error de conexión', 'error');
        return null;
    }
}

// ============================================
// FUNCIONES DE RIFAS
// ============================================

// Crear rifa
async function crearRifa(rifaData) {
    try {
        const response = await fetch(`${API_URL}/rifas`, {
            method: 'POST',
            headers: getHeaders(),
            body: JSON.stringify(rifaData)
        });

        const data = await response.json();

        if (data.success) {
            showAlert('¡Rifa creada exitosamente!');
            return data.rifa;
        } else {
            showAlert(data.message || 'Error al crear rifa', 'error');
            return null;
        }
    } catch (error) {
        showAlert('Error de conexión', 'error');
        return null;
    }
}

// Obtener mis rifas
async function getMisRifas() {
    try {
        const response = await fetch(`${API_URL}/rifas`, {
            headers: getHeaders()
        });

        const data = await response.json();

        if (data.success) {
            return data.rifas;
        } else {
            return [];
        }
    } catch (error) {
        return [];
    }
}

// Obtener rifa pública
async function getRifaPublica(slug) {
    try {
        const response = await fetch(`${API_URL}/rifas/public/${slug}`);
        const data = await response.json();

        if (data.success) {
            return data.rifa;
        } else {
            return null;
        }
    } catch (error) {
        return null;
    }
}

// Reservar número
async function reservarNumero(rifaId, numero, comprador) {
    try {
        const response = await fetch(`${API_URL}/rifas/${rifaId}/reservar`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ numero, comprador })
        });

        const data = await response.json();

        if (data.success) {
            showAlert('¡Número reservado exitosamente!');
            return data.numero;
        } else {
            showAlert(data.message || 'Error al reservar', 'error');
            return null;
        }
    } catch (error) {
        showAlert('Error de conexión', 'error');
        return null;
    }
}

// Eliminar rifa
async function eliminarRifa(rifaId) {
    try {
        const response = await fetch(`${API_URL}/rifas/${rifaId}`, {
            method: 'DELETE',
            headers: getHeaders()
        });

        const data = await response.json();
        return data.success;
    } catch (error) {
        return false;
    }
}

// ============================================
// FUNCIONES DE UI
// ============================================

// Actualizar navbar según estado de sesión
function updateNavbar() {
    const navLinks = document.querySelector('.nav-links');
    if (!navLinks) return;

    const user = getUser();
    
    if (user) {
        navLinks.innerHTML = `
            <a href="/pages/dashboard.html">Dashboard</a>
            <span class="user-name">Hola, ${user.nombre}</span>
            <a href="#" onclick="logout()" class="btn btn-outline">Cerrar Sesión</a>
        `;
    }
}

// Formatear fecha
function formatDate(date) {
    return new Date(date).toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

// Formatear precio
function formatPrice(price) {
    return new Intl.NumberFormat('es-CL', {
        style: 'currency',
        currency: 'CLP'
    }).format(price);
}

// ============================================
// INICIALIZACIÓN
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    updateNavbar();
});
=======
// ============================================
// CONFIGURACIÓN
// ============================================
const API_URL = 'https://mi-rifa-backend.onrender.com/api';

// ============================================
// UTILIDADES
// ============================================

// Obtener token del localStorage
function getToken() {
    return localStorage.getItem('token');
}

// Obtener usuario del localStorage
function getUser() {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
}

// Verificar si está logueado
function isLoggedIn() {
    return getToken() !== null;
}

// Cerrar sesión
function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/index.html';
}

// Mostrar alerta
function showAlert(message, type = 'success') {
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type}`;
    alertDiv.textContent = message;
    
    const container = document.querySelector('.container') || document.body;
    container.insertBefore(alertDiv, container.firstChild);
    
    setTimeout(() => alertDiv.remove(), 5000);
}

// Headers con autenticación
function getHeaders() {
    const headers = {
        'Content-Type': 'application/json'
    };
    
    const token = getToken();
    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }
    
    return headers;
}

// ============================================
// FUNCIONES DE AUTENTICACIÓN
// ============================================

// Registro
async function register(nombre, email, password, telefono) {
    try {
        const response = await fetch(`${API_URL}/auth/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nombre, email, password, telefono })
        });

        const data = await response.json();

        if (data.success) {
            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data.user));
            showAlert('¡Registro exitoso!');
            setTimeout(() => window.location.href = '/pages/dashboard.html', 1000);
            return data;
        } else {
            showAlert(data.message || 'Error en el registro', 'error');
            return null;
        }
    } catch (error) {
        showAlert('Error de conexión', 'error');
        return null;
    }
}

// Login
async function login(email, password) {
    try {
        const response = await fetch(`${API_URL}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();

        if (data.success) {
            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data.user));
            showAlert('¡Inicio de sesión exitoso!');
            setTimeout(() => window.location.href = '/pages/dashboard.html', 1000);
            return data;
        } else {
            showAlert(data.message || 'Credenciales inválidas', 'error');
            return null;
        }
    } catch (error) {
        showAlert('Error de conexión', 'error');
        return null;
    }
}

// ============================================
// FUNCIONES DE RIFAS
// ============================================

// Crear rifa
async function crearRifa(rifaData) {
    try {
        const response = await fetch(`${API_URL}/rifas`, {
            method: 'POST',
            headers: getHeaders(),
            body: JSON.stringify(rifaData)
        });

        const data = await response.json();

        if (data.success) {
            showAlert('¡Rifa creada exitosamente!');
            return data.rifa;
        } else {
            showAlert(data.message || 'Error al crear rifa', 'error');
            return null;
        }
    } catch (error) {
        showAlert('Error de conexión', 'error');
        return null;
    }
}

// Obtener mis rifas
async function getMisRifas() {
    try {
        const response = await fetch(`${API_URL}/rifas`, {
            headers: getHeaders()
        });

        const data = await response.json();

        if (data.success) {
            return data.rifas;
        } else {
            return [];
        }
    } catch (error) {
        return [];
    }
}

// Obtener rifa pública
async function getRifaPublica(slug) {
    try {
        const response = await fetch(`${API_URL}/rifas/public/${slug}`);
        const data = await response.json();

        if (data.success) {
            return data.rifa;
        } else {
            return null;
        }
    } catch (error) {
        return null;
    }
}

// Reservar número
async function reservarNumero(rifaId, numero, comprador) {
    try {
        const response = await fetch(`${API_URL}/rifas/${rifaId}/reservar`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ numero, comprador })
        });

        const data = await response.json();

        if (data.success) {
            showAlert('¡Número reservado exitosamente!');
            return data.numero;
        } else {
            showAlert(data.message || 'Error al reservar', 'error');
            return null;
        }
    } catch (error) {
        showAlert('Error de conexión', 'error');
        return null;
    }
}

// Eliminar rifa
async function eliminarRifa(rifaId) {
    try {
        const response = await fetch(`${API_URL}/rifas/${rifaId}`, {
            method: 'DELETE',
            headers: getHeaders()
        });

        const data = await response.json();
        return data.success;
    } catch (error) {
        return false;
    }
}

// ============================================
// FUNCIONES DE UI
// ============================================

// Actualizar navbar según estado de sesión
function updateNavbar() {
    const navLinks = document.querySelector('.nav-links');
    if (!navLinks) return;

    const user = getUser();
    
    if (user) {
        navLinks.innerHTML = `
            <a href="/pages/dashboard.html">Dashboard</a>
            <span class="user-name">Hola, ${user.nombre}</span>
            <a href="#" onclick="logout()" class="btn btn-outline">Cerrar Sesión</a>
        `;
    }
}

// Formatear fecha
function formatDate(date) {
    return new Date(date).toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

// Formatear precio
function formatPrice(price) {
    return new Intl.NumberFormat('es-CL', {
        style: 'currency',
        currency: 'CLP'
    }).format(price);
}

// ============================================
// INICIALIZACIÓN
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    updateNavbar();
});
>>>>>>> 18405d74bbb2c97b7a64ea6b3a0acaf5e1fcf97c
