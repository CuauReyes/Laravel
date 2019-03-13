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
					<Card className="bg-primary text-white">
						<Card.Body className="d-flex align-items-center">
							<div className="col-sm-12 p-0 text-center">
								<Card.Title className="text-truncate">Último dato</Card.Title>
								<Card.Text className="text-truncate fa-2x">
									{" "}
									{device.last_value ? device.last_value.value : null}
								</Card.Text>
							</div>
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
