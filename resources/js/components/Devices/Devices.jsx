import React, { Component } from "react";
import "./Devices.scss";
import axios from "axios";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";

export default class Devices extends Component {
	constructor() {
		super();
		this.state = {
			devices: []
		};
	}

	componentDidMount() {
		axios.get("api/v1/devices").then(response => {
			this.setState({
				devices: response.data
			});
		});
	}

	render() {
		const { devices } = this.state;
		console.log(devices);
		return (

			<div className="container">
				<div className="row justify-content-center">
					<div className="col-md-8">
					{devices.map((device, key) => (
						<p>Localización: {devices}</p>
						
					)
					)}
					</div>
				</div>
			</div>
		);
	}
}
