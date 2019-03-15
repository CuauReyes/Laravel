import React, { Component } from "react";
import "./Device.scss";
import axios from "axios";
import Header from "../Header/Header";
import { api } from "../../const/api";
import deviceImg from "./assets/device1.jpg";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import "react-table/react-table.css";
import HistoryDevice from "./History/History";
import ChartDevice from "./Chart/Chart";
import Button from "react-bootstrap/Button";
import ButtonToolbar from "react-bootstrap/ButtonToolbar";
// import ReactExport from "react-data-export";

// const ExcelFile = ReactExport.ExcelFile;
// const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
// const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

export default class Device extends Component {
	constructor() {
		super();
		this.state = {
			device: null,
			plant: {},
			data: [],
			range: "week"
		};

		this.changeRangeDate = this.changeRangeDate.bind(this);
		this.handleChangeRange = this.handleChangeRange.bind(this);
	}

	componentDidMount() {
		const { deviceId } = this.props.match.params;
		axios.get(api.devices.get(deviceId)).then(response => {
			this.setState({
				device: response.data,
				plant: response.data.plant
			});
			this.changeRangeDate();
		});
	}

	changeRangeDate(range = "day") {
		let data = this.state.device.values;
		const today = new Date();
		switch (range) {
			case "day":
				let previousDate = today;
				previousDate = new Date(
					previousDate.setDate(previousDate.getDate() - 1)
				);
				console.log(previousDate);
				data = data.filter(val => previousDate > new Date(val.created_at));
				this.setState({
					data
				});
				break;
			case "week":
				let previousWeek = today;
				previousWeek = new Date(
					previousWeek.setDate(previousWeek.getDate() - 7)
				);
				console.log(previousWeek);
				data = data.filter(val => previousWeek < new Date(val.created_at));
				this.setState({
					data
				});
				break;
			case "month":
				break;
			case "year":
				break;
		}
		console.log(data);
	}

	handleChangeRange(event) {
		this.setState({ range: event.target.value });
		this.changeRangeDate(event.target.value);
	}

	render() {
		const { device, plant, data } = this.state;

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
								<div key={index} className="col-12 col-sm col-md mb-5">
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
							<div className="row col-sm-12 d-flex justify-content-end align-items-center">
								<Form.Group
									className="m-0 mr-3"
									controlId="exampleForm.ControlSelect1"
								>
									<Form.Control
										as="select"
										value={this.state.range}
										onChange={this.handleChangeRange}
									>
										<option value="day"> Día</option>
										<option value="week" defaultValue>
											Semana
										</option>
										<option value="month">Mes</option>
										<option value="year">Año</option>
									</Form.Control>
								</Form.Group>
								{/* <ExcelFile
									element={
										<ButtonToolbar>
											<Button variant="success">Exportar</Button>
										</ButtonToolbar>
									}
								>
									<ExcelSheet data={data} name="Employees">
										<ExcelColumn label="Fecha" value="created_at" />
										<ExcelColumn label="Count" value="count" />
										<ExcelColumn label="Value" value="value" />
									</ExcelSheet>
								</ExcelFile> */}
							</div>
							<div id="chart" className="col-sm-12">
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
