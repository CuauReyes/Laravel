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
				<Card.Header className="text-truncate">
					<Link to={"/device/" + device.id}>{device.name}</Link>
					<Card.Text className="flex-fill"> {device.type} </Card.Text>
				</Card.Header>
				<div className="d-flex flex-row justify-content-center align-items-center">
					<Card.Img variant="top" src={audi} />
				</div>
				<Card.Body className="d-flex flex-column">
					<Card className={classes}>
						<Card.Body className="d-flex flex-column align-items-center">
							<Card.Text className="text-truncate m-0">
								Último dato:{" "}
								{device.last_value ? device.last_value.value : null}
							</Card.Text>
							<Card.Text className="text-truncate m-0">
								Datos obtenidos:{" "}
								{device.last_value ? device.last_value.count : null}
							</Card.Text>
						</Card.Body>
					</Card>
				</Card.Body>
				<Card.Footer>
					<div className="flex-row align-items-center">
						<FontAwesomeIcon icon="battery-full" className="mr-2" />
						<FontAwesomeIcon icon="exclamation-triangle" className="mr-2" />
					</div>
				</Card.Footer>
			</Card>
		);
	}
}
