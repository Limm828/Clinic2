import { useState } from "react";

function Appointments({
  appointments,
  cancelAppointment,
  confirmAppointment,
}) {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  const filteredAppointments = appointments.filter((appointment) => {
    const matchesSearch =
      appointment.patient
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      appointment.doctor
        .toLowerCase()
        .includes(search.toLowerCase());

    const matchesFilter =
      filter === "All" || appointment.status === filter;

    return matchesSearch && matchesFilter;
  });

  return (
    <section>
      <div className="page-title">
        <div>
          <h2>Appointments</h2>
          <p>Manage all patient appointments</p>
        </div>
      </div>

      <div className="appointment-panel">
        <div className="filters">
          <div className="search-box">
            🔎
            <input
              type="text"
              placeholder="Search patient or doctor..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="All">All Status</option>
            <option value="Confirmed">Confirmed</option>
            <option value="Pending">Pending</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>

        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Patient</th>
                <th>Doctor</th>
                <th>Date</th>
                <th>Time</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {filteredAppointments.map((appointment) => (
                <tr key={appointment.id}>
                  <td>
                    <div className="table-patient">
                      <div className="small-avatar">
                        {appointment.patient.charAt(0)}
                      </div>

                      <div>
                        <strong>{appointment.patient}</strong>
                        <span>{appointment.phone}</span>
                      </div>
                    </div>
                  </td>

                  <td>
                    <strong>{appointment.doctor}</strong>
                    <span className="table-sub">
                      {appointment.specialty}
                    </span>
                  </td>

                  <td>{appointment.date}</td>

                  <td>{appointment.time}</td>

                  <td>
                    <span
                      className={`status ${appointment.status.toLowerCase()}`}
                    >
                      {appointment.status}
                    </span>
                  </td>

                  <td>
                    {appointment.status === "Pending" && (
                      <button
                        className="action-confirm"
                        onClick={() =>
                          confirmAppointment(appointment.id)
                        }
                      >
                        Confirm
                      </button>
                    )}

                    {appointment.status !== "Cancelled" && (
                      <button
                        className="action-cancel"
                        onClick={() =>
                          cancelAppointment(appointment.id)
                        }
                      >
                        Cancel
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredAppointments.length === 0 && (
            <div className="empty">No appointments found.</div>
          )}
        </div>
      </div>
    </section>
  );
}

export default Appointments;