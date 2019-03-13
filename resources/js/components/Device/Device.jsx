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
		let lineChart;
		if (device) {
			let data = [[new Date(), 0]];
			device.values.forEach(val => {
				data.push([new Date(val.created_at), val.value]);
			});

			lineChart = (
				<div
					style={{
						width: "100%",
						height: "300px"
					}}
				>
					<Chart
						data={[
							{
								label: device.type,
								data: data
							}
						]}
						axes={[
							{ primary: true, type: "time", position: "bottom" },
							{ type: "linear", position: "left" }
						]}
					/>
				</div>
			);
		}
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
							<div className="col-12 col-sm-6 col-md-3 mb-3">
								<Card>
									<Card.Body className="d-flex align-items-center">
										<div className="col-3 col-sm-4 fa-3x align-items-center justify-content-center d-flex">
											<FontAwesomeIcon icon="power-off" />
										</div>
										<div className="col-sm-8">
											<Card.Title className="text-truncate">
												Último dato
											</Card.Title>
											<Card.Text className="text-truncate">
												{" "}
												{device.values ? device.values[0].value : null}
											</Card.Text>
										</div>
									</Card.Body>
								</Card>
							</div>
							<div className="col-12 col-sm-6 col-md-3 mb-3">
								<Card>
									<Card.Body className="d-flex align-items-center">
										<div className="col-3 col-sm-4 fa-3x align-items-center justify-content-center d-flex">
											<FontAwesomeIcon icon="wifi" />
										</div>
										<div className="col-sm-8">
											<Card.Title className="text-truncate">
												Último conexión
											</Card.Title>
											<Card.Text className="text-truncate">
												{device.values ? device.values[0].created_at : null}
											</Card.Text>
										</div>
									</Card.Body>
								</Card>
							</div>
							<div className="col-12 col-sm-6 col-md-3 mb-3">
								<Card>
									<Card.Body className="d-flex align-items-center">
										<div className="col-3 col-sm-4 fa-3x align-items-center justify-content-center d-flex">
											<FontAwesomeIcon icon="exclamation-triangle" />
										</div>
										<div className="col-sm-8">
											<Card.Title className="text-truncate">
												{" "}
												Estado{" "}
											</Card.Title>
											<Card.Text className="text-truncate">
												Advertencia
											</Card.Text>
										</div>
									</Card.Body>
								</Card>
							</div>
							<div className="col-12 col-sm-6 col-md-3 mb-3">
								<Card>
									<Card.Body className="d-flex align-items-center">
										<div className="col-3 col-sm-4 fa-3x align-items-center justify-content-center d-flex">
											<FontAwesomeIcon icon="bolt" />
										</div>
										<div className="col-sm-8">
											<Card.Title className="text-truncate">
												Consumo eléctrico
											</Card.Title>
											<Card.Text className="text-truncate"> 120kWh </Card.Text>
										</div>
									</Card.Body>
								</Card>
							</div>
						</div>

						<div className="col-sm-12 d-flex flex-wrap mb-5">
							<div className="col-sm-12">{lineChart}</div>
						</div>
						<div className="col-sm-12 d-flex flex-wrap">
							<div className="col-sm-12">
								<Card>
									<Card.Header>
										<Card.Title>Historial</Card.Title>
									</Card.Header>
									<Card.Body>
										<Table responsive>
											<thead>
												<tr>
													<th>ID</th>
													<th>Valor</th>
													<th>Fecha</th>
												</tr>
											</thead>
											<tbody>
												{device.values
													? device.values.map((val, index) => (
															<tr key={index}>
																<td> {val.count}</td>
																<td>{val.value}</td>
																<td>{val.created_at}</td>
															</tr>
													  ))
													: null}
											</tbody>
										</Table>
									</Card.Body>
								</Card>
							</div>
						</div>
					</div>
				) : null}
			</div>
		);
	}
}
