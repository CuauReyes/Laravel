import React, { Component } from "react";
import "./Device.scss";
import axios from "axios";
import Header from "../Header/Header";
import { api } from "../../const/api";
import deviceImg from "./assets/device1.jpg";
import Card from "react-bootstrap/Card";
import Table from "react-bootstrap/Table";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { Chart } from "react-charts";
import ReactTable from "react-table";
import "react-table/react-table.css";
import HistoryDevice from "./History/History";
import ChartDevice from "./Chart/Chart";
import Button from "react-bootstrap/Button";

export default class Device extends Component {
	constructor() {
		super();
		this.state = {
			device: null,
			plant: {}
		};
	}

	componentDidMount() {
		const { deviceId } = this.props.match.params;
		axios.get(api.devices.get(deviceId)).then(response => {
			this.setState({
				device: response.data,
				plant: response.data.plant
			});
		});
	}

	render() {
		const { device, plant } = this.state;

		let deviceCards = device
			? [
					{
						title: "Último dato",
						value: device.values ? device.values[0].value : null,
						classes: "bg-primary text-white",
						icon: "clock"
					},
					{
						title: "Última conexión",
						value: device.values ? device.values[0].created_at : null,
						classes: "bg-dark text-white",
						icon: "wifi"
					},
					{
						title: "Estado",
						value: "OK",
						classes: "bg-success text-white",
						icon: "check"
					},
					{
						title: "Consumo eléctrico",
						value: "3kWh",
						classes: "bg-info text-white",
						icon: "bolt"
					}
			  ]
			: [];

		return (
			<div className="device">
				<Header />
				{device ? (
					<div className="container-fluid pt-3">
						<div className="d-flex flex-wrap col-sm-12 mb-3">
							<div className="col-sm-12">
								<Link to={`/plants/${plant.id}`}> Plantas </Link>
								<span>&nbsp; > &nbsp; </span>
								<Link to={`/plants/${plant.id}`}> {plant.name} </Link>
								<span>&nbsp; > &nbsp; </span>
								<Link to={`/device/${device.id}`}> {device.name} </Link>
							</div>
						</div>

						<div className="d-flex flex-wrap col-sm-12 mb-5">
							<div className="col-sm-2 col-lg-1">
								<img className="device-img" src={deviceImg} />
							</div>
							<div className="col-sm-10">
								<h2> {device.name} </h2>
								<h4> {device.type} </h4>
							</div>
						</div>

						<div className="d-flex flex-wrap col-sm-12">
							{deviceCards.map((card, index) => (
								<div key={index} className="col-12 col-sm-6 col-md-3 mb-5">
									<Card className={card.classes}>
										<Card.Body className="d-flex align-items-center">
											<div className="col-3 col-sm-4 fa-3x align-items-center justify-content-center d-flex">
												<FontAwesomeIcon icon={card.icon} />
											</div>
											<div className="col-sm-8">
												<Card.Title className="text-truncate">
													{card.title}
												</Card.Title>
												<Card.Text className="text-truncate">
													{card.value}
												</Card.Text>
											</div>
										</Card.Body>
									</Card>
								</div>
							))}
						</div>

						<div className="col-sm-12 d-flex flex-wrap mb-5">
							<div className="row col-sm-12 d-flex justify-content-end">
								<Button variant="primary">Exportar</Button>
							</div>
							<div className="col-sm-12">
								<ChartDevice values={device.values} />
							</div>
						</div>
						<div className="col-sm-12 d-flex flex-wrap">
							<div className="col-sm-12">
								<HistoryDevice values={device.values} />
							</div>
						</div>
					</div>
				) : null}
			</div>
		);
	}
}
