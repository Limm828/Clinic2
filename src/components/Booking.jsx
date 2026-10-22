import { useState } from "react";

function Booking({ doctors, addAppointment }) {
  const [form, setForm] = useState({
    patient: "",
    phone: "",
    doctor: "",
    date: "",
    time: "",
  });

  const [message, setMessage] = useState("");

  const selectedDoctor = doctors.find(
    (doctor) => doctor.name === form.doctor
  );

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !form.patient ||
      !form.phone ||
      !form.doctor ||
      !form.date ||
      !form.time
    ) {
      setMessage("Please fill in all fields.");
      return;
    }

    addAppointment({
      ...form,
      specialty: selectedDoctor?.specialty || "",
    });

    setForm({
      patient: "",
      phone: "",
      doctor: "",
      date: "",
      time: "",
    });

    setMessage("Appointment booked successfully!");
  };

  return (
    <section>
      <div className="page-title">
        <div>
          <h2>Book Appointment</h2>
          <p>Create a new patient appointment</p>
        </div>
      </div>

      <div className="booking-container">
        <div className="booking-info">
          <div className="booking-icon">📅</div>
          <h2>Schedule a Visit</h2>
          <p>
            Book an appointment with one of our professional
            doctors.
          </p>

          <div className="booking-feature">
            <span>✓</span>
            <div>
              <strong>Professional Doctors</strong>
              <p>Experienced medical specialists</p>
            </div>
          </div>

          <div className="booking-feature">
            <span>✓</span>
            <div>
              <strong>Easy Scheduling</strong>
              <p>Choose your preferred date and time</p>
            </div>
          </div>

          <div className="booking-feature">
            <span>✓</span>
            <div>
              <strong>Quick Confirmation</strong>
              <p>Get appointment confirmation instantly</p>
            </div>
          </div>
        </div>

        <form className="booking-form" onSubmit={handleSubmit}>
          <h3>Patient Information</h3>

          <div className="form-group">
            <label>Patient Name</label>
            <input
              type="text"
              name="patient"
              value={form.patient}
              onChange={handleChange}
              placeholder="Enter patient name"
            />
          </div>

          <div className="form-group">
            <label>Phone Number</label>
            <input
              type="tel"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder="Enter phone number"
            />
          </div>

          <div className="form-group">
            <label>Select Doctor</label>
            <select
              name="doctor"
              value={form.doctor}
              onChange={handleChange}
            >
              <option value="">Choose a doctor</option>

              {doctors
                .filter((doctor) => doctor.available)
                .map((doctor) => (
                  <option key={doctor.id} value={doctor.name}>
                    {doctor.name} - {doctor.specialty}
                  </option>
                ))}
            </select>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Date</label>
              <input
                type="date"
                name="date"
                value={form.date}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Time</label>
              <select
                name="time"
                value={form.time}
                onChange={handleChange}
              >
                <option value="">Choose time</option>
                <option value="08:00">08:00 AM</option>
                <option value="09:00">09:00 AM</option>
                <option value="10:00">10:00 AM</option>
                <option value="11:00">11:00 AM</option>
                <option value="13:00">01:00 PM</option>
                <option value="14:00">02:00 PM</option>
                <option value="15:00">03:00 PM</option>
                <option value="16:00">04:00 PM</option>
              </select>
            </div>
          </div>

          {message && (
            <div
              className={
                message.includes("successfully")
                  ? "success-message"
                  : "error-message"
              }
            >
              {message}
            </div>
          )}

          <button className="submit-btn" type="submit">
            📅 Book Appointment
          </button>
        </form>
      </div>
    </section>
  );
}

export default Booking;