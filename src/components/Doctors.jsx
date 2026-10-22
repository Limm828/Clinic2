import Image from "../assets/Doctor.avif";
function Doctors({ doctors }) {
  return (
    <section>
      <div className="page-title">
        <div>
          <h2>Our Doctors</h2>
          <p>Manage clinic doctors and specialists</p>
        </div>
      </div>

      <div className="doctor-grid">
        {doctors.map((doctor) => (
          <div className="doctor-card" key={doctor.id}>
            <div className="doctor-cover">
              <img className="large-doctor-avatar" src={Image} alt="Placeholder Image"/>
            </div>

            <div className="doctor-card-body">
              <h3>{doctor.name}</h3>

              <p className="specialty">{doctor.specialty}</p>

              <div className="doctor-detail">
                <span>🎓 Experience</span>
                <strong>{doctor.experience}</strong>
              </div>

              <div className="doctor-detail">
                <span>🕐 Schedule</span>
                <strong>Mon - Fri</strong>
              </div>

              <div className="doctor-status">
                <span
                  className={
                    doctor.available
                      ? "available-dot"
                      : "busy-dot"
                  }
                ></span>

                {doctor.available ? "Available Today" : "Currently Busy"}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Doctors;