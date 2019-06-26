import React, { Component } from 'react';
import './Admin.scss';
import ClientsTable from './Clients/Table';
import DevicesTable from './Devices/Table';
import PlantsTable from './Plants/Table';
import DevicesAdd from './Devices/Add';
import ClientsAdd from './Clients/Add';
import PlantsAdd from './Plants/Add';
import { api } from '../../const/api';
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Axios from 'axios';

export default class Admin extends Component {
	constructor(props) {
		super(props);
		this.state = {
			name: '',
			email: '',
			password: '',
			users: [],
			plants: [],
			devices: [],
			status: 0,

			url: '',
			value: 0,
			token: ''
		};

		this.onChangeInput = this.onChangeInput.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.loadData = this.loadData.bind(this);
	}

	onChangeInput(event) {
		const target = event.target;
		const value = target.type === 'checkbox' ? target.checked : target.value;
		const name = target.name;

		this.setState({
			[name]: value
		});
	}

	handleSubmit(event) {
		event.preventDefault();

		let bodyFormData = new FormData();
		bodyFormData.set('url', this.state.url);
		bodyFormData.set('token', this.state.token);
		bodyFormData.set('value', this.state.value);

		Axios.post(api.root + '/resend', bodyFormData, {
			headers: { 'Content-Type': 'multipart/form-data' }
		})
			.then(response => {
				console.log(response);
			})
			.catch(err => {
				console.log(err);
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
			<div className='container-fluid p-5'>
				<div className='row'>
					<div className='col-sm-12'>
						<h1>Admin</h1>
					</div>
				</div>
				<div className='row'>
					<div className='col-md-4'>
						<ClientsAdd users={users} plants={plants} loadData={this.loadData} />
					</div>
					<div className='col-md-4'>
						<PlantsAdd plants={plants} users={users} loadData={this.loadData} />
					</div>
					<div className='col-md-4'>
						<DevicesAdd plants={plants} devices={devices} loadData={this.loadData} />
					</div>
				</div>
				<div className='row'>
					<div className='col-12'>
						<Card className=''>
							<Card.Header>
								<Card.Title> Envíar datos</Card.Title>
							</Card.Header>
							<Card.Body>
								<Form onSubmit={this.handleSubmit}>
									<Form.Group>
										<Form.Label> URL </Form.Label>
										<Form.Control type='text' name='url' value={this.state.url} onChange={this.onChangeInput} />
									</Form.Group>

									<Form.Group>
										<Form.Label> Token </Form.Label>
										<Form.Control type='text' name='token' value={this.state.token} onChange={this.onChangeInput} />
									</Form.Group>

									<Form.Group>
										<Form.Label> Valor </Form.Label>
										<Form.Control type='text' name='value' value={this.state.value} onChange={this.onChangeInput} />
									</Form.Group>

									<Button type='submit' variant='primary'>
										Aceptar
									</Button>
								</Form>
							</Card.Body>
						</Card>
					</div>
				</div>
				<div className='row'>
					<div className='col'>
						<ClientsTable users={users} loadData={this.loadData} />
					</div>
				</div>
				{plants ? <PlantsTable plants={plants} loadData={this.loadData} /> : null}
				{devices ? <DevicesTable devices={devices} loadData={this.loadData} /> : null}
			</div>
		);
	}
}
