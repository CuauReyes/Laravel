import React, { Component } from "react";
import "./Plants.scss";
import axios from "axios";
import Card from "react-bootstrap/Card";
import PlantCard from "./PlantCard/PlantCard";
import PlantsJson from "./Plants.json";

const plants = PlantsJson.plants;

export default class Plants extends Component {
	constructor() {
		super();
		this.state = {
			projects: []
		};
	}

	componentDidMount() {
		// axios.get("/api/projects").then(response => {
		// 	this.setState({
		// 		projects: response.data
		// 	});
		// });
	}
	render() {
		return (
			<div className="container mt-5">
				<h2>Plantas</h2>
				<div className="row justify-content-center">
					{plants.map((plant, key) => (
						<div key={key} className="col-xs-12 col-sm-6 col-md-4 p-2">
							<PlantCard plant={plant} />
						</div>
					))}
				</div>
			</div>
		);
	}
}
