import React, { Component } from "react";
import "./SignUp.scss";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

export default class SignUp extends Component {
	render() {
		return (
			<div
				id="SignUp"
				className="row justify-content-center align-items-center"
			>
				<div className="col-md-8 text-white">
					<Card>
						<div className="row">
							<div className="col-sm-12 col-md-6 bg-primary p-5">
								Some quick example text to build on the card title and make up
								the bulk of the card's content.
							</div>
							<div className="col-sm-12 col-md-6 bg-dark p-5">
								Regístrate
								<Form>
									<Form.Group controlId="formBasicEmail">
										<Form.Label>Email address</Form.Label>
										<Form.Control type="email" placeholder="Enter email" />
										<Form.Text className="text-muted">
											We'll never share your email with anyone else.
										</Form.Text>
									</Form.Group>

									<Form.Group controlId="formBasicPassword">
										<Form.Label>Password</Form.Label>
										<Form.Control type="password" placeholder="Password" />
									</Form.Group>
									<Form.Group controlId="formBasicChecbox">
										<Form.Check type="checkbox" label="Check me out" />
									</Form.Group>
									<Button variant="primary" type="submit">
										Submit
									</Button>
								</Form>
							</div>
						</div>
					</Card>
				</div>
			</div>
		);
	}
}
