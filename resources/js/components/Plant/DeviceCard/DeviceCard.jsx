import React, { Component } from "react";
import Card from "react-bootstrap/Card";
import audi from "../assets/audi.png";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./DeviceCard.scss";

export default class DeviceCard extends Component {
	constructor() {
		super();
	}

	formatValue(type, value) {
		switch (type) {
			case "ON-OFF":
				return +value ? "ENCENDIDO" : "APAGADO";
			case "OPEN-CLOSED":
				return +value ? "ABIERTO" : "CERRADO";
			case "TEMPERATURE A":
				return +value + "º";
			case "COUNTER":
				return +value + " activado";
		}
	}

	render() {
		const { device } = this.props;
		let classes;
		switch (device.type) {
			case "ON-OFF":
				classes = "bg-success text-white";
				break;
			case "COUNTER":
				classes = "bg-info text-white";
				break;
			case "TEMPERATURE A":
				classes = "bg-primary text-white";
				break;
			default:
				classes = "bg-success text-white";
		}
		return (
			<Card className="plant-card">
				<Card.Header className="text-truncate d-flex flex-row">
					<div className="col-sm">
						<Link to={"/device/" + device._id}>{device.name}</Link>
						<Card.Text className="flex-fill"> {device.type} </Card.Text>
					</div>
					<div className="col-sm d-flex justify-content-end p-0">
						<FontAwesomeIcon icon="exclamation-triangle" className="mr-2" />
						<FontAwesomeIcon icon="battery-full" className="mr-2" />
					</div>
				</Card.Header>
				<div className="d-flex flex-row justify-content-center align-items-center">
					<Card.Img variant="top" src={audi} />
				</div>
				<Card.Body className="d-flex flex-column">
					<Card
						className={
							classes +
							"col-sm-4 d-flex flex-column align-items-center text-white p-2 m-2"
						}
					>
						{/* <span>Último dato:</span> */}
						<span>
							{device.last_value
								? this.formatValue(device.type, device.last_value.value)
								: null}
						</span>
					</Card>
					<Card
						className={
							classes +
							"col-sm-4 d-flex flex-column align-items-center text-white p-2 m-2"
						}
					>
						{/* <span>Datos obtenidos:</span> */}
						<span>{device.last_value ? device.last_value.count : null}</span>
					</Card>
					<Card
						className={
							classes +
							"col-sm-4 d-flex flex-column align-items-center text-white p-2 m-2"
						}
					>
						{/* <span>Última conexión:</span> */}
						<span>
							{device.last_value ? device.last_value.created_at : null}
						</span>
					</Card>
				</Card.Body>
				<Card.Footer className="d-flex flex-row" />
			</Card>
		);
	}
}
