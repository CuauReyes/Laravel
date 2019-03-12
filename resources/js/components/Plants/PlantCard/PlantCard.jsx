import React, { Component } from "react";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import mitsubishi from "../assets/mitsubishi.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./PlantCard.scss";

export default class PlantCard extends Component {
	constructor() {
		super();
	}

	render() {
		const { plant } = this.props;
		return (
			<Card className="plant-card">
				<Link to={"/plants/" + plant.id}>
					<Card.Header className="text-truncate">{plant.name}</Card.Header>
				</Link>
				<Card.Img variant="top" src={mitsubishi} />
				<Card.Body className="d-flex flex-column">
					<Card.Text className="flex-fill"> {plant.description} </Card.Text>
				</Card.Body>
				<Card.Footer>
					<div className="flex-row align-items-center">
						<FontAwesomeIcon icon="microchip" className="mr-2" />
						{plant.devices.length}
					</div>
				</Card.Footer>
			</Card>
		);
	}
}
