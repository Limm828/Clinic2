import { useEffect, useState } from "react";
import Sidebar from "./components/Sidebar";
import Dashboard from "./components/Dashboard";
import Doctors from "./components/Doctors";
import Appointments from "./components/Appointments";
import Booking from "./components/Booking";

const initialDoctors = [
  {
    id: 1,
    name: "Dr. Sokha Chan",
    specialty: "Cardiologist",
    experience: "10 years",
    available: true,
  },
  {
    id: 2,
    name: "Dr. Dara Kim",
    specialty: "Dermatologist",
    experience: "8 years",
    available: true,
  },
  {
    id: 3,
    name: "Dr. Lina Heng",
    specialty: "Pediatrician",
    experience: "7 years",
    available: true,
  },
  {
    id: 4,
    name: "Dr. Vuthy Lim",
    specialty: "General Doctor",
    experience: "12 years",
    available: false,
  },
];

const initialAppointments = [
  {
    id: 1,
    patient: "Chantha Lim",
    phone: "012 345 678",
    doctor: "Dr. Sokha Chan",
    specialty: "Cardiologist",
    date: "2026-10-05",
    time: "09:00",
    status: "Confirmed",
  },
  {
    id: 2,
    patient: "Srey Mom",
    phone: "097 222 333",
    doctor: "Dr. Dara Kim",
    specialty: "Dermatologist",
    date: "2026-10-05",
    time: "10:30",
    status: "Pending",
  },
];

function App() {
  const [activePage, setActivePage] = useState("dashboard");

  const [doctors] = useState(() => {
    const saved = localStorage.getItem("clinicDoctors");
    return saved ? JSON.parse(saved) : initialDoctors;
  });

  const [appointments, setAppointments] = useState(() => {
    const saved = localStorage.getItem("clinicAppointments");
    return saved ? JSON.parse(saved) : initialAppointments;
  });

  useEffect(() => {
    localStorage.setItem("clinicAppointments", JSON.stringify(appointments));
  }, [appointments]);

  useEffect(() => {
    localStorage.setItem("clinicDoctors", JSON.stringify(doctors));
  }, [doctors]);

  const addAppointment = (appointment) => {
    const newAppointment = {
      ...appointment,
      id: Date.now(),
      status: "Pending",
    };

    setAppointments((current) => [...current, newAppointment]);
    setActivePage("appointments");
  };

  const cancelAppointment = (id) => {
    setAppointments((current) =>
      current.map((appointment) =>
        appointment.id === id
          ? { ...appointment, status: "Cancelled" }
          : appointment
      )
    );
  };

  const confirmAppointment = (id) => {
    setAppointments((current) =>
      current.map((appointment) =>
        appointment.id === id
          ? { ...appointment, status: "Confirmed" }
          : appointment
      )
    );
  };

  return (
    <div className="app">
      <Sidebar activePage={activePage} setActivePage={setActivePage} />

      <main className="main-content">
        <header className="topbar">
          <div>
            <h1>ប្រព័ន្ធគ្លីនិកឆ្លាតវៃ</h1> 
            <p>Doctor Appointment Management System</p>
          </div>

          <div className="admin">
            <div className="admin-avatar">A</div>
            <div>
              <strong>Admin</strong>
              <small>Clinic Manager</small>
            </div>
          </div>
        </header>

        {activePage === "dashboard" && (
          <Dashboard
            appointments={appointments}
            doctors={doctors}
            setActivePage={setActivePage}
          />
        )}

        {activePage === "doctors" && <Doctors doctors={doctors} />}

        {activePage === "appointments" && (
          <Appointments
            appointments={appointments}
            cancelAppointment={cancelAppointment}
            confirmAppointment={confirmAppointment}
          />
        )}

        {activePage === "booking" && (
          <Booking doctors={doctors} addAppointment={addAppointment} />
        )}
      </main>
    </div>
  );
}

export default App;