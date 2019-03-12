import React, { Component } from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import { LinkContainer } from "react-router-bootstrap";
// import { Link } from "react-router-dom";
import NavLink from "react-bootstrap/NavLink";
import "./Header.scss";

export default class Header extends Component {
	logout() {
		console.log("log");
	}
	render() {
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
						<NavDropdown title="Dropdown" id="basic-nav-dropdown">
							<NavDropdown.Item href="#action/3.1"> Perfil </NavDropdown.Item>
							<NavDropdown.Item href="#action/3.2">
								Another action
							</NavDropdown.Item>
							<NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
							<NavDropdown.Divider />
							<NavDropdown.Item onClick={this.logout}>Salir</NavDropdown.Item>
						</NavDropdown>
					</Navbar.Collapse>
				</Navbar>
			</header>
		);
	}
}
