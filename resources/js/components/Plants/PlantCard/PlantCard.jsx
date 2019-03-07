import React, { Component } from "react";
import "./PlantCard.scss";

export default class PlantCard extends Component {
	constructor() {
		super();
	}

	componentDidMount() {
		axios.get("/api/projects").then(response => {
			this.setState({
				projects: response.data
			});
		});
	}
	render() {
		return (
			<div className="container">
				<div className="row justify-content-center">
					<div className="col-md-8">
						<div className="card">
							<div className="card-header">Example Component</div>

							<div className="card-body">I'm an example component!</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
