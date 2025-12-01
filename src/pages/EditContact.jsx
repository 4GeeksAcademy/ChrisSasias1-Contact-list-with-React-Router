import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useGlobalReducer from '../hooks/useGlobalReducer.jsx';

export const EditContact = () => {

    const { store, dispatch } = useGlobalReducer();
    const navigate = useNavigate();
    const { contact_id } = useParams();

    const [data, setData] = useState({
        name: "",
        email: "",
        phone: "",
        address: ""
    });

    useEffect(() => {
        const contactEdit = store.contacts.find(c => c.id === parseInt(contact_id));

        if (!contactEdit) {
            alert("Contacto no encontrado");
            navigate("/");
            return;
        }

        setData({
            name: contactEdit.name,
            email: contactEdit.email,
            phone: contactEdit.phone,
            address: contactEdit.address
        });

    }, [contact_id]);

    const formChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    const formSubmit = (e) => {
        e.preventDefault();

        fetch(`https://playground.4geeks.com/contact/agendas/chris/contacts/${contact_id}`, {

            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ ...data, agenda_slug: "chris" })
        })
            .then(resp => resp.json())
            .then(updated => {
                dispatch({
                    type: "update_contact",
                    payload: updated
                });

                navigate("/");
            })
            .catch(err => console.log(err));
    };

    return (
        <div className="container">

            <h1>Edit contact</h1>

            <form className="row g-3" onSubmit={formSubmit}>
                <div className="col-md-12">
                    <label className="form-label">Full Name</label>
                    <input type="text" className="form-control"
                        value={data.name} name="name" onChange={formChange} />
                </div>

                <div className="col-md-12">
                    <label className="form-label">Email</label>
                    <input type="email" className="form-control"
                        value={data.email} name="email" onChange={formChange} />
                </div>

                <div className="col-12">
                    <label className="form-label">Phone</label>
                    <input type="text" className="form-control"
                        value={data.phone} name="phone" onChange={formChange} />
                </div>

                <div className="col-12">
                    <label className="form-label">Address</label>
                    <input type="text" className="form-control"
                        value={data.address} name="address" onChange={formChange} />
                </div>

                <div className="col-12">
                    <button type="submit" className="btn btn-primary">Save</button>
                </div>
            </form>
        </div>
    );
};
