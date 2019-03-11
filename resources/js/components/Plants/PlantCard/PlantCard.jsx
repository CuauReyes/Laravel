import React, { Component } from "react";
import Card from "react-bootstrap/Card";
import "./PlantCard.scss";
import { Link } from "react-router-dom";
import mitsubishi from "../assets/mitsubishi.png";
const imgsPath = require.context("../assets", true);

export default class PlantCard extends Component {
	constructor() {
		super();
	}

	render() {
		const { plant } = this.props;
		return (
			<Link to={"/plants/" + plant.id}>
				<Card href="">
					<Card.Img variant="top" src={mitsubishi} />
					<Card.Body>
						<Card.Title> {plant.name} </Card.Title>
						<Card.Footer> {plant.description} </Card.Footer>
					</Card.Body>
				</Card>
			</Link>
		);
	}
}
