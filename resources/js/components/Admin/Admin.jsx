import React, { Component } from "react";
import "./Admin.scss";
import Sidebar from "./Assets/Sidebar";
import ClientsTable from "./Clients/Table";
import DevicesTable from "./Devices/Table";
import PlantsTable from "./Plants/Table";
import DevicesAdd from "./Devices/Add";
import ClientsAdd from "./Clients/Add";
import PlantsAdd from "./Plants/Add";
import { api } from "../../const/api";
import axios from "axios";

export default class Admin extends Component {
	constructor(props) {
		super(props);
		this.state = {
			name: "",
			email: "",
			password: "",
			users: [],
			plants: [],
			devices: [],
			status: 0
		};

		this.handleChange = this.handleChange.bind(this);
		this.loadData = this.loadData.bind(this);
	}

	handleChange(event) {
		const target = event.target;
		const value = target.type === "checkbox" ? target.checked : target.value;
		const name = target.name;

		this.setState({
			[name]: value
		});
	}

	componentDidMount() {
		this.loadData();
	}

	async loadData() {
		let users = axios.get(api.users.all);
		let plants = axios.get(api.plants.all);
		let devices = axios.get(api.devices.all);
		Promise.all([users, plants, devices]).then(response => {
			this.setState({
				users: response[0].data,
				plants: response[1].data,
				devices: response[2].data
			});
		});
	}

	render() {
		const { users, plants, devices } = this.state;

		return (
			<div className="container-fluid p-5">
				<div className="row">
					<div className="col-sm-12">
						<h1>Admin</h1>
					</div>
				</div>
				<div className="row">
					<div className="col-md-4">
						<ClientsAdd
							users={users}
							plants={plants}
							loadData={this.loadData}
						/>
					</div>
					<div className="col-md-4">
						<PlantsAdd users={users} loadData={this.loadData} />
					</div>
					<div className="col-md-4">
						<DevicesAdd
							plants={plants}
							devices={devices}
							loadData={this.loadData}
						/>
					</div>
				</div>
				<div className="row">
					<ClientsTable users={users} loadData={this.loadData} />
				</div>
				<PlantsTable plants={plants} loadData={this.loadData} />
				<DevicesTable devices={devices} />
			</div>
		);
	}
}
