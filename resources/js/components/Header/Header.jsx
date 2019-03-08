import React, { Component } from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";

import "./Header.scss";

export default class Header extends Component {
	render() {
		return (
			<header>
				<Navbar bg="dark" variant="dark" expand="lg">
					<Nav className="mr-auto" />
					<Navbar.Collapse id="basic-navbar-nav">
						<Navbar.Brand href="#home"> NoTe </Navbar.Brand>
						<Navbar.Toggle aria-controls="basic-navbar-nav" />
						<Nav.Link href="#home"> Plantas </Nav.Link>
						<Nav.Link href="#link">Link</Nav.Link>
						<NavDropdown title="Dropdown" id="basic-nav-dropdown">
							<NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
							<NavDropdown.Item href="#action/3.2">
								Another action
							</NavDropdown.Item>
							<NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
							<NavDropdown.Divider />
							<NavDropdown.Item href="#action/3.4">
								Separated link
							</NavDropdown.Item>
						</NavDropdown>
					</Navbar.Collapse>
				</Navbar>
			</header>
		);
	}
}
