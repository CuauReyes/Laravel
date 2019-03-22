import React, { Component } from "react";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./PlantCard.scss";
const imagesHost = window.location.origin + "/images/plants/";

export default class PlantCard extends Component {
	static propTypes = {
		plant: PropTypes.object
	};

	render() {
		const { plant } = this.props;
		return (
			<Card className="plant-card">
				<Link to={"/plants/" + plant._id}>
					<Card.Header className="text-truncate">{plant.name}</Card.Header>
				</Link>
				<div className="d-flex flex-row justify-content-center align-items-center">
					<Link to={"/plants/" + plant._id}>
						<Card.Img variant="top" src={imagesHost + plant.img} />
					</Link>
				</div>
				{/* <Card.Body className="d-flex flex-column" /> */}
				<Card.Footer className="flex-fill">
					<Card.Text> {plant.description} </Card.Text>
					<div className="flex-row align-items-center">
						<FontAwesomeIcon icon="microchip" className="mr-2" />
						{plant.devices.length}
					</div>
				</Card.Footer>
			</Card>
		);
	}
}
