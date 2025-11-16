import { useState } from 'react';
import MenuBar from './components/MenuBar';
import './App.css';

function App() {
  return (
    <div className="App">
      <MenuBar />
      
      <main className="content">
        <section id="inicio">
          <h1>Bienvenido a Nuestra Página</h1>
          <p>Esta es la sección de inicio</p>
        </section>

        <section id="contenido">
          <h2>Contenido</h2>
          <p>Aquí va el contenido principal</p>
        </section>

        <section id="servicios">
          <h2>Servicios</h2>
          <p>Nuestros servicios incluyen...</p>
        </section>

        <section id="contactos">
          <h2>Contactos</h2>
          <p>Contáctanos en: info@ejemplo.com</p>
        </section>

        <section id="acerca">
          <h2>Acerca de</h2>
          <p>Información sobre nosotros</p>
        </section>
      </main>
    </div>
  );
}

export default App;