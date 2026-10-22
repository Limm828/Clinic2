import Image from "../assets/Doctor.avif";

function Dashboard({ appointments, doctors, setActivePage }) {
  const totalAppointments = appointments.length;

  const confirmed = appointments.filter(
    (a) => a.status === "Confirmed"
  ).length;

  const pending = appointments.filter(
    (a) => a.status === "Pending"
  ).length;

  const availableDoctors = doctors.filter((d) => d.available).length;

  return (
    <section>
      <div className="welcome">
        <div>
          <h2>Welcome back, Admin 👋</h2>
          <p>Here's what's happening at your clinic today.</p>
        </div>

        <button
          className="primary-btn"
          onClick={() => setActivePage("booking")}
        >
          + New Appointment
        </button>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon blue">📅</div>
          <div>
            <span>Total Appointments</span>
            <strong>{totalAppointments}</strong>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon green">✓</div>
          <div>
            <span>Confirmed</span>
            <strong>{confirmed}</strong>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon orange">⏳</div>
          <div>
            <span>Pending</span>
            <strong>{pending}</strong>
          </div>
        </div>

        <div className="stat-card">
          <img className="stat-icon purple" src={Image} alt="Placeholder Image"/>
          <div>
            <span>Available Doctors</span>
            <strong>{availableDoctors}</strong>
          </div>
        </div>
      </div>

      <div className="dashboard-grid">
        <div className="panel">
          <div className="panel-header">
            <div>
              <h3>Recent Appointments</h3>
              <p>Latest patient appointments</p>
            </div>

            <button
              className="view-btn"
              onClick={() => setActivePage("appointments")}
            >
              View All
            </button>
          </div>

          <div className="appointment-list">
            {appointments.slice(-5).reverse().map((appointment) => (
              <div className="appointment-row" key={appointment.id}>
                <div className="patient-avatar">
                  {appointment.patient.charAt(0)}
                </div>

                <div className="appointment-info">
                  <strong>{appointment.patient}</strong>
                  <span>{appointment.doctor}</span>
                </div>

                <div className="appointment-date">
                  <strong>{appointment.date}</strong>
                  <span>{appointment.time}</span>
                </div>

                <span
                  className={`status ${appointment.status.toLowerCase()}`}
                >
                  {appointment.status}
                </span>
              </div>
            ))}

            {appointments.length === 0 && (
              <div className="empty">No appointments found.</div>
            )}
          </div>
        </div>

        <div className="panel">
          <div className="panel-header">
            <div>
              <h3>Our Doctors</h3>
              <p>Clinic medical staff</p>
            </div>

            <button
              className="view-btn"
              onClick={() => setActivePage("doctors")}
            >
              View All
            </button>
          </div>

          <div className="doctor-mini-list">
            {doctors.slice(0, 4).map((doctor) => (
              <div className="doctor-mini" key={doctor.id}>
                <img className="doctor-avatar" src={Image} alt="Placeholder Image"/>

                <div>
                  <strong>{doctor.name}</strong>
                  <span>{doctor.specialty}</span>
                </div>

                <span
                  className={`availability ${
                    doctor.available ? "online" : "offline"
                  }`}
                >
                  {doctor.available ? "Available" : "Busy"}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Dashboard;