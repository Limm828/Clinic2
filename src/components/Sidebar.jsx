import Image from "../assets/clinic.jpg"
function Sidebar({ activePage, setActivePage }) {
  const menus = [
    { id: "dashboard", icon: "📊", label: "Dashboard" },
    { id: "doctors", icon: "👨‍⚕️", label: "Doctors" },
    { id: "appointments", icon: "📅", label: "Appointments" },
    { id: "booking", icon: "➕", label: "Book Appointment" },
  ];

  return (
    <aside className="sidebar">
      <div className="logo">
        <img className="logo-icon" src={Image} alt="Placeholder Image"/>
        <div>
          <h2>Smart Clinic</h2>
          <span>Healthcare System</span>
        </div>
      </div>

      <nav>
        <p className="menu-title">MENU</p>

        {menus.map((menu) => (
          <button
            key={menu.id}
            className={`menu-item ${
              activePage === menu.id ? "active" : ""
            }`}
            onClick={() => setActivePage(menu.id)}
          >
            <span>{menu.icon}</span>
            {menu.label}
          </button>
        ))}
      </nav>

      <div className="sidebar-bottom">
        <div className="help-box">
          <div>💡</div>
          <strong>Need Help?</strong>
          <p>Contact clinic support</p>
          <button>Contact Support</button>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;