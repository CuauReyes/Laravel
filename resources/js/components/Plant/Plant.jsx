import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./Plant.scss";
import DeviceCard from "./DeviceCard/DeviceCard";
import Header from "../Header/Header";
import Axios from "axios";
import { api } from "../../const/api";

export default class Plant extends Component {
	constructor() {
		super();
		this.state = {
			plant: [],
			devices: []
		};
	}

	componentDidMount() {
		const { plantId } = this.props.match.params;
		Axios.get(api.plants.get(plantId)).then(response => {
			this.setState({
				plant: response.data,
				devices: response.data.devices
			});
		});
	}

	render() {
		const { plant, devices } = this.state;
		return (
			<div>
				<Header />
				<div className="container-fluid pt-3">
					<div className="d-flex flex-wrap col-sm-12 mb-3">
						<div className="col-sm-12">
							<Link to={`/plants`}> Plantas </Link>
							<span>&nbsp; > &nbsp; </span>
							<Link to={`/plants/${plant._id}`}> {plant.name} </Link>
						</div>
					</div>
					<div className="col-sm-12">
						<div className="col-sm-12">
							<h2> {plant.name}</h2>
						</div>
					</div>
					<div className="col-sm-12 d-flex flex-wrap">
						{devices.map((device, key) => (
							<div
								key={key}
								className="col-xs-12 col-sm-6 col-md-4 col-lg-3 p-2"
							>
								<DeviceCard device={device} />
							</div>
						))}
					</div>
				</div>
			</div>
		);
	}
}
