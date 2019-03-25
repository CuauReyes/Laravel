import React, { Component } from "react";
import "./Device.scss";
import axios from "axios";
import Header from "../Header/Header";
import { api } from "../../const/api";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import "react-table/react-table.css";
import HistoryDevice from "./History/History";
import ChartDevice from "./Chart/Chart";
import Button from "react-bootstrap/Button";
import ButtonToolbar from "react-bootstrap/ButtonToolbar";
import ReactExport from "react-data-export";

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;
const imagesHost = window.location.origin + "/images/devices/";

export default class Device extends Component {
	constructor() {
		super();
		this.state = {
			device: null,
			plant: {},
			data: [
				{
					created_at: new Date().toISOString(),
					value: 0
				}
			],
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
			this.changeRangeDate(this.state.range);
		});
	}

	changeRangeDate(range = "day") {
		let data = this.state.device.values;
		const today = new Date();
		let previousDate = today;

		switch (range) {
			case "day":
				previousDate = new Date(
					previousDate.setDate(previousDate.getDate() - 1)
				);
				break;
			case "week":
				previousDate = new Date(
					previousDate.setDate(previousDate.getDate() - 7)
				);
				break;
			case "month":
				previousDate = new Date(
					previousDate.setMonth(previousDate.getMonth() - 1)
				);
				break;
			case "year":
				previousDate = new Date(
					previousDate.setFullYear(previousDate.getFullYear() - 1)
				);
				break;
		}

		data = data.filter(val => previousDate < new Date(val.created_at));
		this.setState({
			data
		});
	}

	handleChangeRange(event) {
		this.setState({ range: event.target.value });
		this.changeRangeDate(event.target.value);
	}

	formatValue(type, value) {
		switch (type) {
			case "ON-OFF":
				return +value ? "ENCENDIDO" : "APAGADO";
			case "OPEN-CLOSED":
				return +value ? "ABIERTO" : "CERRADO";
			case "TEMPERATURE A":
				return +value + "º C";
			case "COUNTER":
				return +value + " activado";
		}
	}

	transformDigit(digit) {
		return digit < 10 ? "0" + digit : digit;
	}

	lastConnection(date) {
		let today = new Date();
		let last = new Date(date);

		let hour =
			this.transformDigit(last.getHours()) +
			":" +
			this.transformDigit(last.getMinutes()) +
			":" +
			this.transformDigit(last.getSeconds());

		if (today.getFullYear() === last.getFullYear()) {
			if (today.getMonth() === last.getMonth()) {
				if (today.getDate() === last.getDate()) {
					return hour;
				}
				return (
					this.transformDigit(last.getMonth() + 1) +
					"-" +
					this.transformDigit(last.getDate()) +
					" " +
					hour
				);
			}
			return (
				last.getFullYear() +
				"-" +
				this.transformDigit(last.getMonth() + 1) +
				"-" +
				this.transformDigit(last.getDate()) +
				" " +
				hour
			);
		}
	}

	render() {
		const { device, plant, data } = this.state;

		let deviceCards = device
			? [
					{
						title: "Último dato",
						value: device.values
							? this.formatValue(
									device.type,
									device.values[device.values.length - 1].value
							  )
							: null,
						classes: "bg-primary text-white",
						icon: "clock"
					},
					{
						title: "Última conexión",
						value: device.values
							? this.lastConnection(
									device.values[device.values.length - 1].created_at
							  )
							: null,
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

		if (device && device.type === "TEMPERATURE A") {
			deviceCards.splice(0, 1);
			deviceCards.unshift(
				{
					title: "Temperatura actual",
					value: device.values[device.values.length - 1].value + "º",
					classes: "bg-primary text-white",
					icon: "thermometer-half"
				},
				{
					title: "Temperatura máxima",
					value:
						Math.max.apply(Math, device.values.map(val => val.value)) + "º",
					classes: "bg-danger text-white",
					icon: "temperature-high"
				},
				{
					title: "Temperatura mínima",
					value:
						Math.min.apply(Math, device.values.map(val => val.value)) + "º",
					classes: "bg-info text-white",
					icon: "temperature-low"
				}
			);
		}

		if (device && device.type === "COUNTER") {
			deviceCards[0].title = "Activaciones";
			deviceCards[0].value = device.values.reduce(
				(prev, val) => (prev += val.value),
				0
			);
		}

		return (
			<div className="device">
				<Header />
				{device ? (
					<div className="container-fluid pt-3">
						<div className="d-flex flex-wrap col-sm-12 mb-3">
							<div className="col-sm-12">
								<Link to={`/plants/${plant._id}`}> Plantas </Link>
								<span>&nbsp; > &nbsp; </span>
								<Link to={`/plants/${plant._id}`}> {plant.name} </Link>
								<span>&nbsp; > &nbsp; </span>
								<Link to={`/device/${device._id}`}> {device.name} </Link>
							</div>
						</div>

						<div className="d-flex flex-wrap col-sm-12 mb-5">
							<div className="col-sm-2 col-lg-1">
								{device.img ? (
									<img className="device-img" src={imagesHost + device.img} />
								) : null}
							</div>
							<div className="col-sm-10">
								<h2> {device.name} </h2>
								<h4> {device.type} </h4>
							</div>
						</div>

						<div className="d-flex flex-wrap col-sm-12">
							{deviceCards.map((card, index) => (
								<div key={index} className="col-12 col-sm-3 mb-5">
									<Card className={card.classes}>
										<Card.Body className="d-flex align-items-center">
											<div className="col-sm-4 fa-3x align-items-center justify-content-center d-flex">
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
								<ExcelFile
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
								</ExcelFile>
							</div>
							<div id="chart" className="col-sm-12">
								<ChartDevice values={data} type={device.type} />
							</div>
						</div>

						<div className="col-sm-12 d-flex flex-wrap">
							<div className="col-sm-12">
								<HistoryDevice values={data} />
							</div>
						</div>
					</div>
				) : null}
			</div>
		);
	}
}
