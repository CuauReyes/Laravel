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
				<Link to={"/device/" + device.id}>
					<Card.Header className="text-truncate">{device.name}</Card.Header>
				</Link>
				<Card.Img variant="top" src={audi} />
				<Card.Body className="d-flex flex-column">
					<Card.Text className="flex-fill"> {device.type} </Card.Text>
				</Card.Body>
				<Card.Footer>
					<div className="flex-row align-items-center">
						<FontAwesomeIcon icon="battery-full" className="mr-2" />
						<FontAwesomeIcon icon="exclamation-triangle" className="mr-2" />
						<div className="row">
							<div className="col-sm-12">
								Último valor: {device.values[0].value}
							</div>
						</div>
					</div>
				</Card.Footer>
			</Card>
		);
	}
}
