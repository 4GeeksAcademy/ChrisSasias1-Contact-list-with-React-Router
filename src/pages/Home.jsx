import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ContactCard from "../components/ContactCard.jsx";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";

export const Home = () => {

    const { store, dispatch } = useGlobalReducer();
    const [contacts, setContacts] = useState([]);

const AGENDA = "chris";
const API = `https://playground.4geeks.com/contact/agendas/${AGENDA}/contacts`;

    const getContacts = async () => {
        try {
            const resp = await fetch(API);
            if (!resp.ok) return;

            const data = await resp.json();

            setContacts(data.contacts);

        
            dispatch({
                type: "set_contacts",
                payload: data.contacts
            });

        } catch (e) {
            console.log("Error obteniendo contactos:", e);
        }
    };


const deleteContact = async (id) => {
    try {
        const resp = await fetch(`https://playground.4geeks.com/contact/agendas/chris/contacts/${id}`, {
            method: "DELETE"
        });

        if (!resp.ok) {
            console.log("ERROR AL BORRAR", resp.status);
            return;
        }

        setContacts(prev => prev.filter(c => c.id !== id));

        dispatch({
            type: "set_contacts",
            payload: contacts.filter(c => c.id !== id)
        });

    } catch (e) {
        console.log("Error al borrar:", e);
    }
};


    useEffect(() => {
        getContacts();
    }, []);

    return (
        <div className="container mt-5">

            {contacts.map(contact => (
                <ContactCard
                    key={contact.id}
                    informacion={contact}
                    onDelete={deleteContact}
                />
            ))}
        </div>
    );
};
