import React, { Component } from "react";
import "./Sensor.scss";
import axios from "axios";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";

export default class Sensor extends Component {
	constructor() {
		super();
		this.state = {
			sensor: []
		};
	}

	componentDidMount() {
		axios.get("api/v1/sensor").then(response => {
			this.setState({
				sensor: response.data
			});
		});
	}

	render() {
		const { sensor } = this.state;
		console.log(sensor);
		return (

			<div className="container">
				<div className="row justify-content-center">
					<div className="col-md-8">
					{sensor.map((sensor, key) => (
						<p>Localización: {sensor}</p>
						
					)
					)}
					</div>
				</div>
			</div>
		);
	}
}
