import React, { Component } from "react";
import "./Home.scss";
import Header from "../Header/Header";
import Plants from "../Plants/Plants";
import { Route } from "react-router";
import Plant from "../Plant/Plant";

export default class Home extends Component {
	render() {
		return (
			<div>
				{/* <Header /> */}
				<Route path="/" component={Plants} />
				{/* <Route path="/plants" component={Plants} />
				<Route path="/plants/:id" component={Plant} /> */}
				{/* <div className="row justify-content-center">
					<div className="col-md-8">
						<div className="card">
							<div className="card-header">Example Component</div>

							<div className="card-body">I'm an example component!</div>
						</div>
					</div>
				</div> */}
			</div>
		);
	}
}
