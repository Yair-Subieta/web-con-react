import './MenuBar.css';

function MenuBar() {
  return (
    <nav className="menubar">
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
      </ul>
    </nav>
  );
}

export default MenuBar;