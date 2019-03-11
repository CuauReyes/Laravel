import React, { Component } from "react";
import "./Plant.scss";

export default class Plant extends Component {
	constructor() {
		super();
		this.state = {
			plant: []
		};
	}

	componentDidMount() {
		const { id } = this.props.match.params;
		axios.get(`http://localhost:8000/api/v1/plants/${id}`).then(response => {
			console.log(response.data);
			this.setState({
				plant: response.data
			});
		});
	}

	render() {
		const { plant } = this.state;
		return <div className="container">{plant.name}</div>;
	}
}
