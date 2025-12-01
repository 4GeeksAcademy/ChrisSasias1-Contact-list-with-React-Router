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

    const AGENDA = "chris";
    const API = `https://playground.4geeks.com/contact/agendas/${AGENDA}/contacts`;


    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const saveContact = async (e) => {
        e.preventDefault();

        try {
            const resp = await fetch(API, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    ...form,
                    agenda_slug: "chris"
                })
            });


            if (!resp.ok) {
                alert("Error al guardar contacto");
                return;
            }

            navigate("/");
        } catch (e) {
            console.log("Error:", e);
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
                    onChange={handleChange}
                />

                <input
                    className="form-control mb-3"
                    placeholder="Enter email"
                    name="email"
                    onChange={handleChange}
                />

                <input
                    className="form-control mb-3"
                    placeholder="Enter phone"
                    name="phone"
                    onChange={handleChange}
                />

                <input
                    className="form-control mb-3"
                    placeholder="Enter address"
                    name="address"
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
