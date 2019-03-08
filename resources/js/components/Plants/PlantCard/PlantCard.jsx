import React, { Component } from "react";
import Card from "react-bootstrap/Card";
import "./PlantCard.scss";

export default class PlantCard extends Component {
	constructor() {
		super();
	}

	componentDidMount() {
		// axios.get("/api/v1/plant?id=1").then(response => {
		// 	this.setState({
		// 		projects: response.data
		// 	});
		// });
	}

	render() {
		const { plant } = this.props;
		return (
			<Card>
				<Card.Title> {plant.title} </Card.Title>
				<Card.Footer> {plant.description} </Card.Footer>
			</Card>
		);
	}
}
