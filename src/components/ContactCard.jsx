import { Link } from "react-router-dom";

const ContactCard = ({ informacion, onDelete }) => {
    return (
        <div className="card mb-3 p-3">
            <div className="d-flex">

          
                <img
                    src={`https://i.pravatar.cc/150?u=${informacion.id}`}
                    className="rounded-circle me-4"
                    style={{ width: "90px", height: "90px", objectFit: "cover" }}
                />


                <div className="flex-grow-1">
                    <h5 className="fw-bold">{informacion.name}</h5>

                    <p className="mb-1 text-muted">
                        <i className="fa-solid fa-location-dot me-2"></i>
                        {informacion.address}
                    </p>

                    <p className="mb-1 text-muted">
                        <i className="fa-solid fa-phone me-2"></i>
                        {informacion.phone}
                    </p>

                    <p className="mb-1 text-muted">
                        <i className="fa-solid fa-envelope me-2"></i>
                        {informacion.email}
                    </p>
                </div>

             
                <div className="d-flex flex-column align-items-end">

                    <Link
                        to={"/edit-contact/" + informacion.id}
                        className="text-dark mb-3"
                        style={{ fontSize: "20px" }}
                    >
                        <i className="fa-solid fa-pen"></i>
                    </Link>

                    <span
                        className="text-danger"
                        style={{ fontSize: "20px", cursor: "pointer" }}
                        onClick={() => onDelete(informacion.id)}
                    >
                        <i className="fa-solid fa-trash"></i>
                    </span>

                </div>

            </div>
        </div>
    );
};

export default ContactCard;
