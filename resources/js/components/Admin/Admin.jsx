import React, { Component } from "react";
import "./Admin.scss";
import Sidebar from './Assets/Sidebar';
import { api } from "../../const/api";
import axios from "axios";

export default class Admin extends Component {
    constructor(props) {
		super(props);
		this.state = { name: "", email: "", password: "" };

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
    
    render() {
        return (
        <div>
            <div className="container">
            <div className="row">
                 <div className="col-md-12">
                    <h1>Admin</h1>
                    <div className="col-md-4">
                        <div className="card ">
                            <div className="card-header">Agregar nuevo cliente:</div>
                            <form onSubmit={this.handleSubmit}>
                            <div className="card-body">
                                <div className="form-group">
                                <label htmlFor="name">Nombre:</label>
                                <input type="text" className="form-control" id="name" name="name" value={this.state.name}
						        onChange={this.handleChange}/>
                                </div>
                                <div className="form-group">
                                <label htmlFor="email">Correo:</label>
                                <input type="email" className="form-control" id="email" name="email" value={this.state.email}
						        onChange={this.handleChange}/>
                                </div>
                                <div className="form-group">
                                <label htmlFor="password">Contraseña:</label>
                                <input type="text" className="form-control" id="password" name="password" value={this.state.password}
						        onChange={this.handleChange}/>
                                </div>
                                <button type="submit" className="btn btn-primary">Aceptar</button>
                            </div>
                            </form>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <h3>Agregar Planta</h3>
                            <div className="card-body">
                               <form onSubmit={this.handleSubmitPlant}>
                                    <div className="form-group">
                                        <label htmlFor="name">Nombre:</label>
                                        <input type="text" className="form-control" id="name" name="name" value={this.state.name}
						                    onChange={this.handleChange} />
                                        </div>
                                        <div className="form-group">
                                        <label htmlFor="description">Descripción:</label>
                                        <input type="text" className="form-control" id="description" name="description" value={this.state.description}
						                    onChange={this.handleChange} />
                                        </div>
                                        <div className="form-group">
                                        <label htmlFor="location">Localización:</label>
                                        <input type="text" className="form-control" id="location" name="location" value={this.state.location}
						                    onChange={this.handleChange} />
                                        </div>
                                        <div className="form-group">
                                        <label htmlFor="url">Url:</label>
                                        <input type="text" className="form-control" id="url" name="url" value={this.state.url}
						                     onChange={this.handleChange} />
                                        </div>
                                        <div className="form-group">
                                        <label htmlFor="key">Key:</label>
                                        <input type="text" className="form-control" id="key" name="key" value={this.state.key}
						                    onChange={this.handleChange} />
                                        </div>
                                        <div className="form-group">
                                        <label htmlFor="img">Imagen:</label>
                                        <input type="text" className="form-control" id="img" name="img" value={this.state.img}
						                    onChange={this.handleChange} />
                                        </div>
                                        <div className="form-group">
                                        <label htmlFor="status">Status:</label>
                                        <input type="text" className="form-control" id="status" name="status" value={this.state.status}
						                    onChange={this.handleChange} />
                                        </div>
                                        <div className="form-group">
                                        <label htmlFor="user_id">user_id:</label>
                                        <input type="text" className="form-control" id="user_id" name="user_id" value={this.state.user_id}
						                    onChange={this.handleChange} />
                                        </div>
                                        <button type="submit" className="btn btn-primary">Aceptar</button>
                               </form>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <h3>Agregar Device</h3>
                            <div className="card-body">
                            <form onSubmit={this.handleSubmitDevice}>
                                <div className="form-group">
                                <label htmlFor="nameplant">Nombre:</label>
                                <input type="text" className="form-control" id="nameplant" name="name" value={this.state.name}
						        onChange={this.handleChange} />
                                </div>
                                <div className="form-group">
                                <label htmlFor="type">Tipo:</label>
                                <select class="form-control" id="sel1" id="type" name="type" value={this.state.type} onChange={this.handleChange}>
                                    <option value="ON-OFF">ON-OFF</option>
                                    <option value="TEMP">TEMP</option>
                                    <option value="COUNTER">COUNTER</option>
                                    <option value="LIGHT">LIGHT</option>
                                </select>
                                </div> 
                                <div className="form-group">
                                <label htmlFor="type">Planta:</label>
                                <input type="text" className="form-control" id="plant_id" name="plant_id" value={this.state.plant_id}
						        onChange={this.handleChange} />
                                </div> 
                                <button type="submit" className="btn btn-primary">Aceptar</button>
                            </form>
                            
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
                                    <p>The .table-striped class adds zebra-stripes to a table:</p>            
                                    <table className="table table-striped">
                                        <thead>
                                        <tr>
                                            <th>Firstname</th>
                                            <th>Lastname</th>
                                            <th>Email</th>
                                            <th>Acciones</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        <tr>
                                            <td>John</td>
                                            <td>Doe</td>
                                            <td>john@example.com</td>
                                            <button type="button" className="btn btn-primary">Ver info</button>
                                            <button type="button" className="btn btn-danger">Eliminar</button>
                                            <button type="button" className="btn btn-warning">Deshabilitar</button>
                                            <button type="button" className="btn btn-success">Habilitar</button>
                                        </tr>
                                        <tr>
                                            <td>Mary</td>
                                            <td>Moe</td>
                                            <td>mary@example.com</td>
                                            <button type="button" className="btn btn-primary">Ver info</button>
                                            <button type="button" className="btn btn-danger">Eliminar</button>
                                            <button type="button" className="btn btn-warning">Deshabilitar</button>
                                            <button type="button" className="btn btn-success">Habilitar</button>

                                        </tr>
                                        <tr>
                                            <td>July</td>
                                            <td>Dooley</td>
                                            <td>july@example.com</td>
                                            <button type="button" className="btn btn-primary">Ver info</button>
                                            <button type="button" className="btn btn-danger">Eliminar</button>
                                            <button type="button" className="btn btn-warning">Deshabilitar</button>
                                            <button type="button" className="btn btn-success">Habilitar</button>
                                        </tr>
                                        
                                        </tbody>
                                    </table>    
                            </div>
                        </div>
                 </div>
                    
                              
        );
    }
}
