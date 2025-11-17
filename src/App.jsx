import { useState, useEffect } from 'react';
import MenuBar from './components/MenuBar';
import Login from './components/Login';
import { authService } from './services/authService';
import './App.css';

function App() {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Verificar si hay un usuario en localStorage
    const currentUser = authService.getCurrentUser();
    if (currentUser) {
      setUser(currentUser);
      setIsAuthenticated(true);
    }
  }, []);

  const handleLoginSuccess = (userData) => {
    setUser(userData);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    authService.logout();
    setUser(null);
    setIsAuthenticated(false);
  };

  if (!isAuthenticated) {
    return <Login onLoginSuccess={handleLoginSuccess} />;
  }

  return (
    <div className="App">
      <MenuBar user={user} onLogout={handleLogout} />
      
      <main className="content">
        <section id="inicio">
          <h1>🐾 Bienvenido a Veterinaria PetCare</h1>
          <p>Hola, <strong>{user?.username}</strong> ({user?.rol})</p>
          <p>Sistema de gestión veterinaria</p>
        </section>

        <section id="contenido">
          <h2>Panel de Control</h2>
          <p>Aquí podrás gestionar todas las operaciones de la veterinaria</p>
        </section>

        <section id="servicios">
          <h2>Nuestros Servicios</h2>
          <ul>
            <li>Consultas veterinarias</li>
            <li>Vacunación</li>
            <li>Cirugías</li>
            <li>Emergencias 24/7</li>
          </ul>
        </section>

        <section id="contactos">
          <h2>Contactos</h2>
          <p>📞 Teléfono: 555-VETE</p>
          <p>📧 Email: info@petcare.com</p>
        </section>

        <section id="acerca">
          <h2>Acerca de Nosotros</h2>
          <p>Veterinaria con más de 10 años de experiencia cuidando a tus mascotas</p>
        </section>
      </main>
    </div>
  );
}

export default App;