import React, { Component } from "react";
import "./Plants.scss";
import axios from "axios";
import Card from "react-bootstrap/Card";
import PlantCard from "./PlantCard/PlantCard";

export default class Plants extends Component {
	constructor() {
		super();
		this.state = {
			plants: []
		};
	}

	componentDidMount() {
		axios.get("http://localhost:8000/api/v1/plants").then(response => {
			this.setState({
				plants: response.data
			});
		});
	}

	render() {
		const { plants } = this.state;
		return (
			<div className="container mt-5">
				<div className="row col-sm-12">
					<h2>Plantas</h2>
				</div>

				<div className="row col-sm-12">
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
