import './MenuBar.css';

function MenuBar({ user, onLogout }) {
  return (
    <nav className="menubar">
      <div className="menu-brand">🐾 Veterinaria</div>
      <ul className="menu-list">
        <li className="menu-item">
          <a href="#inicio">Inicio</a>
        </li>
        <li className="menu-item">
          <a href="#contenido">Contenido</a>
        </li>
        <li className="menu-item">
          <a href="#servicios">Servicios</a>
        </li>
        <li className="menu-item">
          <a href="#contactos">Contactos</a>
        </li>
        <li className="menu-item">
          <a href="#acerca">Acerca de</a>
        </li>
        {user && (
          <li className="menu-item menu-user">
            <span>{user.username}</span>
            <button onClick={onLogout} className="logout-btn">Cerrar Sesión</button>
          </li>
        )}
      </ul>
    </nav>
  );
}

export default MenuBar;