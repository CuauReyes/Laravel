import React, { Component } from "react";
import "./Plants.scss";
import axios from "axios";
import Card from "react-bootstrap/Card";
import PlantCard from "./PlantCard/PlantCard";
import Header from "../Header/Header";
import { api } from "../../const/api";

export default class Plants extends Component {
	constructor() {
		super();
		this.state = {
			plants: []
		};
	}

	componentDidMount() {
		axios.get(api.plants.all).then(response => {
			this.setState({
				plants: response.data
			});
		});
	}

	render() {
		const { plants } = this.state;

		return (
			<div>
				<Header />
				<div className="container-fluid mt-5">
					<div className="col-sm-12">
						<h2>Plantas</h2>
					</div>

					<div className="col-sm-12 d-flex flex-wrap">
						{plants.map((plant, key) => (
							<div key={key} className="col-xs-12 col-sm-6 col-md-4 col-lg-3 p-2">
								<PlantCard plant={plant} />
							</div>
						))}
					</div>
				</div>
			</div>
		);
	}
}
