import React, { Component } from "react";
import { api } from "../../const/api";
import axios from "axios";
import "./User.scss";
import PlantsAdd from "../Admin/Plants/Add";
import DevicesTable from "../Admin/Devices/Table";
import DevicesAdd from "../Admin/Devices/Add";
import matchSorter from "match-sorter";
import Button from "react-bootstrap/Button";
import ReactTable from "react-table";
import PlantsTable from "../Admin/Plants/Table";

export default class User extends Component {
	constructor(props) {
		super(props);
		this.state = {
			user: {},
			plants: []
		};

		this.loadData = this.loadData.bind(this);
	}

	componentDidMount() {
		this.loadData();
	}

	async loadData() {
		const { userId } = this.props.match.params;
		axios.get(api.users.get(userId)).then(response => {
			this.setState({
				user: response.data,
				plants: response.data.plants
			});
		});
	}

	render() {
		const { plants, user } = this.state;

		return (
			<div>
				<div className="container-fluid p-5">
					<div className="row">
						<div className="col">
							<h1>Usuario: {user.name}</h1>
						</div>
					</div>
					<div className="row">
						<div className="col-md-12">
							<PlantsTable plants={plants} loadData={this.loadData} />
						</div>
						<div className="col-md-4">
							<PlantsAdd user_id={user._id} loadData={this.loadData} />
						</div>

						<div className="col-md-12">
							<DevicesTable plants={plants} />
						</div>
						<div className="col-md-4">
							<DevicesAdd plants={plants} loadData={this.loadData} />
						</div>
					</div>
				</div>
			</div>
		);
	}
}
