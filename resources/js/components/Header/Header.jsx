import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import { LinkContainer } from "react-router-bootstrap";
// import { Link } from "react-router-dom";
import NavLink from "react-bootstrap/NavLink";
import "./Header.scss";
import { withRouter } from "react-router-dom";

class Header extends React.Component {
	constructor(props) {
		super(props);
		this.logout = this.logout.bind(this);
	}

	logout() {
		window.localStorage.clear("token");
		this.props.history.push("/login");
	}

	render() {
		const user = JSON.parse(window.localStorage.getItem("user"));
		console.log(user);
		return (
			<header>
				<Navbar bg="dark" variant="dark" expand="md">
					<LinkContainer to="/">
						<Navbar.Brand> NoTe </Navbar.Brand>
					</LinkContainer>
					<Navbar.Toggle aria-controls="basic-navbar-nav" />
					<Navbar.Collapse id="basic-navbar-nav">
						<LinkContainer to="/">
							<NavLink>Plantas</NavLink>
						</LinkContainer>
						<Nav className="mr-auto" />
						<NavDropdown
							title={user ? user.name : "Usuario"}
							id="basic-nav-dropdown"
						>
							<NavDropdown.Item> Perfil </NavDropdown.Item>
							<NavDropdown.Divider />
							<NavDropdown.Item onClick={this.logout}>Salir</NavDropdown.Item>
						</NavDropdown>
					</Navbar.Collapse>
				</Navbar>
			</header>
		);
	}
}

export default withRouter(Header);
