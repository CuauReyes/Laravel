import React, { Component } from "react";
import Breadcrumb from "react-bootstrap/Breadcrumb";
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
			console.log(response.data);
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
				<div className="container-fluid mt-5">
					{/* <Breadcrumb>
					<Link to="/">Plants</Link>>
					<Breadcrumb.Item active>{plant.name}</Breadcrumb.Item>
				</Breadcrumb> */}
					<div className="col-sm-12">
						<h2>Planta: {plant.name}</h2>
					</div>
					<div className="col-sm-12 d-flex flex-wrap">
						{devices.map((device, key) => (
							<div key={key} className="col-xs-12 col-sm-6 col-md-4 p-2">
								<DeviceCard device={device} />
							</div>
						))}
					</div>
				</div>
			</div>
		);
	}
}
