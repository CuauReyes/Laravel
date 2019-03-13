import React, { Component } from "react";
import "./User.scss";
import { api } from "../../const/api";
import axios from "axios";

export default class User extends Component {
    constructor(props) {
		super(props);
        this.state = { name: "", email: "", password: "", users:[], plants:[], devices:[]};

		this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleSubmitDevice = this.handleSubmitDevice.bind(this);
        this.handleSubmitPlant = this.handleSubmitPlant.bind(this);
	}

	handleChange(event) {
		const target = event.target;
		const value = target.type === "checkbox" ? target.checked : target.value;
		const name = target.name;

		this.setState({
			[name]: value
		});
	}

	handleSubmit(event) {
        console.log(this.state.name)
		axios
			.post(
				api.auth.register,
				{
                    name: this.state.name,
					email: this.state.email,
                    password: this.state.password,
                    password_confirmation: this.state.password,
				},
				{
					headers: {
						"Content-Type": "application/json",
						"X-Requested-With": "XMLHttpRequest"
					}
				}
            )
            
			.then(response => {
				if (response.data) {
					window.localStorage.setItem("token", response.data.access_token);
					this.props.history.push("/plants");
				}
			})
			.catch(err => {
				console.log(err);
			});
		event.preventDefault();
    }

    handleSubmitDevice(event) {
        //console.log(this.state.name)
		axios
			.post(
				api.devices.all,
				{
                    name: this.state.name,
                    type: this.state.type,
                    plant_id: this.state.plant_id
				},
				{
					headers: {
						"Content-Type": "application/json",
						"X-Requested-With": "XMLHttpRequest"
					}
				}
            )
            
			.then(response => {
				if (response.data) {
					window.localStorage.setItem("token", response.data.access_token);
					this.props.history.push("/plants");
				}
			})
			.catch(err => {
				console.log(err);
			});
		event.preventDefault();
    }
    handleSubmitPlant(event) {
        //console.log(this.state.name)
		axios
			.post(
				api.plants.all,
				{
                    name: this.state.name,
                    description: this.state.description,
                    location: this.state.location,
                    url: this.state.url,
                    key: this.state.key,
                    img: this.state.img,
                    status: this.state.status,
                    user_id: this.state.user_id
				},
				{
					headers: {
						"Content-Type": "application/json",
						"X-Requested-With": "XMLHttpRequest"
					}
				}
            )
            
			.then(response => {
				if (response.data) {
					window.localStorage.setItem("token", response.data.access_token);
					this.props.history.push("/plants");
				}
			})
			.catch(err => {
				console.log(err);
			});
		event.preventDefault();
    }
    
    componentDidMount() {
		axios.get(api.users.all).then(response => {
			this.setState({
				users: response.data
			});
        });
        axios.get(api.plants.all).then(response => {
			this.setState({
				plants: response.data
			});
        });
        axios.get(api.devices.all).then(response => {
			this.setState({
				devices: response.data
			});
		});
    }
    

    render() {

        const {users} = this.state;
        const {plants} = this.state;
        const {devices} = this.state;

        return (
        <div>
           <div className="container">
           <h1>Usuario: </h1>
                <div className="row">
                    <div className="col-md-12" >
                           <div className="card">
                           <div className="card-header">Plantas</div>
                           <table className="table table-striped">
                                        <thead>
                                        <tr>
                                            <th>Nombre</th>
                                            <th>Localización</th>
                                            <th>Descripción</th>
                                            <th>Url</th>
                                            <th>Key</th>
                                            <th>Imágen</th>
                                            <th>Status</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {plants.map((plant, key) => (
							                <tr key={key}>
												<td> {plant.name}</td>
                                                <td> {plant.location}</td>
                                                <td> {plant.description}</td>
                                                <td> {plant.url}</td>
                                                <td> {plant.key}</td>
                                                <td> {plant.img}</td>
                                                <td> {plant.status}</td>

											</tr>
						                ))}
                                        
                                        </tbody>
                                    </table>  
                       </div></div>
                    <div className="col-md-12">
                           <div className="card mt-5">
                           <div className="card-header">Devices:</div>
                           <div className="card-body">
                           <table className="table table-striped">
                                        <thead>
                                        <tr>
                                            <th>Nombre</th>
                                            <th>Tipo</th>
                                            <th>Status</th>
                                            <th>Creado</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {devices.map((device, key) => (
							                <tr key={key}>
												<td> {device.name}</td>
                                                <td> {device.type}</td>
                                                <td> {device.status}</td> 
                                                <td> {device.created_at}</td> 
											</tr>
						                ))}
                                        
                                        </tbody>
                                    </table> 
                           </div>
                        </div>   
                     </div>
                    </div>
                </div> 
                        <div className="card">
                            <div className="card-header">Buscar Cliente:</div>
                            <div className="col-md-12">
                            <div className="input-group mb-3">
                                <input type="text" className="form-control" placeholder="Buscar"/>
                                <div className="input-group-append">
                                    <button className="btn btn-success" type="submit">Go</button>
                                </div>
                                </div>
                                <h2>Clientes</h2>
                                    <p>La siguiente tabla muestra todos los clientes registrados hasta el momento</p>            
                                    <table className="table table-striped">
                                        <thead>
                                        <tr>
                                            <th>Nombre</th>
                                            <th>Email</th>
                                            <th>Creado</th>
                                            <th>Acciones</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {users.map((user, key) => (
							                <tr key={key}>
												<td> {user.name}</td>
                                                <td> {user.email}</td>
                                                <td> {user.created_at}</td>
                                                <button type="button" className="btn btn-primary">Ver info</button>
                                                <button type="button" className="btn btn-danger">Eliminar</button>
                                                <button type="button" className="btn btn-warning">Deshabilitar</button>
                                                <button type="button" className="btn btn-success">Habilitar</button>
											</tr>
						                ))}
                                        
                                        </tbody>
                                    </table>    
                            </div>
                        </div>
                 </div>
                    
                              
        );
    }
}
