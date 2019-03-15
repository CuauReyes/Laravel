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
						<Link to={"/device/" + device.id}>{device.name}</Link>
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
				<Card.Body className="d-flex flex-column" />
				<Card.Footer className="d-flex flex-row">
					<Card className={classes}>
						Último dato: {device.last_value ? device.last_value.value : null}
					</Card>
					<Card className={classes}>
						Datos obtenidos:{" "}
						{device.last_value ? device.last_value.count : null}
					</Card>
					<Card className={classes}>
						Última conexión:{" "}
						{device.last_value ? device.last_value.created_at : null}
					</Card>
				</Card.Footer>
			</Card>
		);
	}
}
