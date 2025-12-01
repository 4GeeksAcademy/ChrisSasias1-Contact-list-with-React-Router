import { Link } from "react-router-dom";

export const Navbar = () => {

	return (
		<nav className="navbar navbar-dark bg-dark">
			<div className="container">
				<div className="ms-auto ">
					<Link to="/add-contact">
						<button className="btn btn-success">Add new contact</button>
					</Link>
				</div>
			</div>
		</nav>
	);
};