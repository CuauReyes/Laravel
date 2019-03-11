import React, { Component } from "react";
import Card from "react-bootstrap/Card";
import "./DeviceCard.scss";

export default class DeviceCard extends Component {
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
		const { device } = this.props;
		return (
			<Card>
				<Card.Title> {device.title} </Card.Title>
				<Card.Footer> {device.description} </Card.Footer>
			</Card>
		);
	}
}
