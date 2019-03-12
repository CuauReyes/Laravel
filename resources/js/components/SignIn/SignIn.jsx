import React, { Component } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Carousel from "react-bootstrap/Carousel";
import Form from "react-bootstrap/Form";
import "./SignIn.scss";
import { withRouter } from "react-router-dom";
import microchip from "./assets/microchip.svg";
import axios from "axios";
import { api } from "../../const/api";

class SignIn extends Component {
	constructor(props) {
		super(props);
		this.state = { email: "", password: "" };

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleChange(event) {
		const target = event.target;
		const value = target.type === "checkbox" ? target.checked : target.value;
		const name = target.name;

		this.setState({
			[name]: value
		});
	}

	handleSubmit(event) {
		axios
			.post(
				api.auth.login,
				{
					email: this.state.email,
					password: this.state.password
				},
				{
					headers: {
						"Content-Type": "application/json",
						"X-Requested-With": "XMLHttpRequest"
					}
				}
			)
			.then(response => {
				if (response.data) {
					window.localStorage.setItem("token", response.data.access_token);
					this.props.history.push("/plants");
				}
			})
			.catch(err => {
				console.error(err);
			});
		event.preventDefault();
	}

	render() {
		const carousel = (
			<Carousel interval={10000}>
				<Carousel.Item>
					<img className="d-block w-100" src={microchip} alt="First slide" />
					<Carousel.Caption>
						<h3>First slide label</h3>
						<p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
					</Carousel.Caption>
				</Carousel.Item>
				<Carousel.Item>
					<img className="d-block w-100" src={microchip} alt="Third slide" />

					<Carousel.Caption>
						<h3>Second slide label</h3>
						<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
					</Carousel.Caption>
				</Carousel.Item>
				<Carousel.Item>
					<img className="d-block w-100" src={microchip} alt="Third slide" />

					<Carousel.Caption>
						<h3>Third slide label</h3>
						<p>
							Praesent commodo cursus magna, vel scelerisque nisl consectetur.
						</p>
					</Carousel.Caption>
				</Carousel.Item>
			</Carousel>
		);

		const form = (
			<Form onSubmit={this.handleSubmit}>
				<Form.Group controlId="formBasicEmail">
					<Form.Label> Correo electrónico </Form.Label>
					<Form.Control
						type="email"
						placeholder="introduce tu correo"
						name="email"
						value={this.state.email}
						onChange={this.handleChange}
					/>
				</Form.Group>

				<Form.Group controlId="formBasicPassword">
					<Form.Label> Contraseña </Form.Label>
					<Form.Control
						type="password"
						placeholder="Contraseña"
						name="password"
						value={this.state.password}
						onChange={this.handleChange}
					/>
				</Form.Group>

				<Form.Group controlId="formBasicCheckbox">
					<Form.Check type="checkbox" label="Recordarme" />
				</Form.Group>

				<Button variant="primary" type="submit">
					Entrar
				</Button>
			</Form>
		);

		return (
			<div
				id="SignIn"
				className="row justify-content-center align-items-center"
			>
				<div className="col-sm-12 text-center">
					<h1>NoTE</h1>
				</div>
				<div className="col-md-8 text-white">
					<div className="row">
						<Card className="col-sm-12">
							<div className="row">
								<div className="col-sm-6 bg-primary p-5">{carousel}</div>

								<div className="col-sm-6 bg-dark p-5">
									<h2 className="row">Iniciar sesión</h2>
									{form}
								</div>
							</div>
						</Card>
					</div>
				</div>
			</div>
		);
	}
}

export default withRouter(SignIn);
