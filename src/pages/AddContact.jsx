import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export const AddContact = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  const BASE = "https://playground.4geeks.com/contact";
  const AGENDA = "chris";

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const ensureAgendaExists = async () => {
    // 1) Intento: ver si existe
    let resp = await fetch(`${BASE}/agendas/${AGENDA}`);
    if (resp.ok) return true;

    // 2) No existe (o falló): intento crearla
    resp = await fetch(`${BASE}/agendas/${AGENDA}`, { method: "POST" });
    if (resp.ok) return true;

    // 3) Por las dudas: si el POST no devolvió ok, vuelvo a chequear con GET
    // (a veces el POST puede fallar por edge-cases, pero la agenda ya quedó creada)
    const resp2 = await fetch(`${BASE}/agendas/${AGENDA}`);
    return resp2.ok;
  };

  const saveContact = async (e) => {
    e.preventDefault();

    try {
      const agendaOk = await ensureAgendaExists();
      if (!agendaOk) {
        alert("No se pudo crear/verificar la agenda");
        return;
      }

      const resp = await fetch(`${BASE}/agendas/${AGENDA}/contacts`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,      // requerido
          email: form.email,
          phone: form.phone,
          address: form.address,
        }),
      });

      if (!resp.ok) {
        const err = await resp.json().catch(() => ({}));
        console.log("POST contacto falló:", resp.status, err);
        alert("Error al guardar contacto");
        return;
      }

      navigate("/");
    } catch (err) {
      console.log("Error:", err);
      alert("Error de red");
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "600px" }}>
      <h2 className="text-center mb-4">Add a new contact</h2>

      <form onSubmit={saveContact}>
        <input
          className="form-control mb-3"
          placeholder="Full Name"
          name="name"
          value={form.name}
          onChange={handleChange}
          required
        />

        <input
          className="form-control mb-3"
          placeholder="Enter email"
          name="email"
          value={form.email}
          onChange={handleChange}
        />

        <input
          className="form-control mb-3"
          placeholder="Enter phone"
          name="phone"
          value={form.phone}
          onChange={handleChange}
        />

        <input
          className="form-control mb-3"
          placeholder="Enter address"
          name="address"
          value={form.address}
          onChange={handleChange}
        />

        <button className="btn btn-primary w-100">save</button>

        <div className="mt-3 text-center">
          <Link to="/" className="text-secondary d-flex">
            or get back to contacts
          </Link>
        </div>
      </form>
    </div>
  );
};
