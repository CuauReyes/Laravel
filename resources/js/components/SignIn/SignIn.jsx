import React, { Component } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Carousel from "react-bootstrap/Carousel";
import Form from "react-bootstrap/Form";
import { withRouter } from "react-router-dom";
import image1 from "./assets/NoTe-iiot.jpg";
import image2 from "./assets/NoTe-iiot2.jpg";
import image3 from "./assets/NoTe-iiot3.jpg";
import logo from "./assets/logo.png";
import AuthService from "../../services/auth";
import "./SignIn.scss";

class SignIn extends Component {
	constructor(props) {
		super(props);
		this.state = { email: "", password: "", rememberMe: false, error: null };

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
		this.setState({ error: null });
		let auth = new AuthService();
		auth
			.login(this.state.email, this.state.password, this.state.rememberMe)
			.then(response => {
				this.props.history.push("/plants");
			})
			.catch(err => {
				this.setState({ error: "Usuario o contraseña incorrecta" });
			});
		event.preventDefault();
	}

	render() {
		const { error } = this.state;
		const carousel = (
			<Carousel interval={10000}>
				<Carousel.Item>
					<img className="d-block w-100" src={image1} alt="First slide" />
				</Carousel.Item>
				<Carousel.Item>
					<img className="d-block w-100" src={image2} alt="Third slide" />
				</Carousel.Item>
				<Carousel.Item>
					<img className="d-block w-100" src={image3} alt="Third slide" />
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

				{error ? <div>{error}</div> : null}

				<Form.Group controlId="formBasicCheckbox">
					<Form.Check
						type="checkbox"
						label="Recordarme"
						name="rememberMe"
						value={this.state.rememberMe}
						onChange={this.handleChange}
					/>
				</Form.Group>

				<Button variant="primary" type="submit">
					Entrar
				</Button>
			</Form>
		);

		return (
			<div
				id="SignIn"
				className="row d-flex flex-column justify-content-center align-items-center"
			>
				<div className="col-sm-12 text-center mb-5">
					<img src={logo} alt="NoTE" className="logo" />
				</div>
				<div className="col-md-8 col-10 text-white">
					<div className="row">
						<Card className="col-sm-12">
							<div className="row">
								<div className="col-sm-6 bg-primary order-2 order-sm-1 p-0">
									{carousel}
								</div>

								<div className="col-sm-6 bg-dark p-5 order-1 order-sm-2">
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
