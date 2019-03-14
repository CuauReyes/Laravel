import React, { Component } from "react";
import "./User.scss";
import { api } from "../../const/api";
import axios from "axios";

export default class User extends Component {
    constructor(props) {
		super(props);
        this.state = {name: "", email: "", password: "", users:[], plants:[], devices:[]};

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
        const {userId} = this.props.match.params;
		axios.get(api.users.get(userId)).then(response => {
			this.setState({
                users: response.data,
                plants: response.data.plants,
                
			});
        });
    }
    deleteDevice(id) {
        console.log(id);
        axios.delete(api.devices.all+'/'+id).then(response => {
        });
      }
    deletePlant(id) {
        console.log(id);
        axios.delete(api.plants.all+'/'+id).then(response => {
        });
      }
    setOnPlant(id) {
        console.log(id);
        axios.put(api.plants.all+'/'+id+'/ON').then(response => {
        });
      }
    setOffPlant(id) {
        console.log(id);
        axios.put(api.plants.all+'/'+id+'/OFF').then(response => {
        });
      }
    setOnDevice(id) {
        console.log(id);
        axios.put(api.devices.all+'/'+id+'/ON').then(response => {
        });
      }
    setOffDevice(id) {
        console.log(id);
        axios.put(api.devices.all+'/'+id+'/OFF').then(response => {
        });
      }    
    render() {
        const {plants} = this.state;
        const {users} = this.state;

        return (
        <div>
           <div className="container">
           <h1>Usuario: {users.name}</h1>
                <div className="row">
                    <div className="col-md-12" >
                           <div className="card">
                           <div className="card-header">Plantas</div>
                           <div className="card-body">
                           <table className="table table-striped">
                                        <thead>
                                        <tr>
                                            <th>Nombre</th>
                                            <th>Descripción</th>
                                            <th>Url</th>
                                            <th>Key</th>
                                            <th>Status</th>
                                            <th>Acciones</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {plants.map((plant, key) => (
							                <tr key={key}>
												<td> {plant.name}</td>
                                                <td> {plant.description}</td>
                                                <td> {plant.url}</td>
                                                <td> {plant.key}</td>
                                                <td> {plant.status}</td>
                                                <button type="button" className="btn btn-success" onClick={() => this.setOnPlant(plant.id)}>Habilitar</button>
                                                <button type="button" className="btn btn-warning" onClick={() => this.setOffPlant(plant.id)}>Deshabilitar</button>
                                                <button type="button" className="btn btn-danger" onClick={() => this.deletePlant(plant.id)}>Eliminar</button>
											</tr>
						                ))}
                                        
                                        </tbody>
                                    </table>  
                                    
                       </div>
                           
                           </div>
                          </div>
                          <div className="col-md-4">
                           <div className="card">
                           <div className="card-header">Agregar planta:</div>
                           <div className="card-body">
                              <form onSubmit={this.handleSubmitPlant}>
                                    <div className="form-group">
                                       <label htmlFor="user_id">Usuario:</label>
                                       <select className="form-control" id="user_id" name="user_id" value={this.state.user_id} onChange={this.handleChange}>
							                <option value={users.id}>{users.name}</option>
                                        </select>
                                       </div>
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
                                       <button type="submit" className="btn btn-primary" data-toggle="modal" data-target="#myModal2">Aceptar</button>
                                       <div className="modal fade" id="myModal2">
                                        <div className="modal-dialog">
                                        <div className="modal-content">
                                    <div className="modal-header">
                                    <h4 className="modal-title">NoTE Admin</h4>
                                    <button type="button" className="close" data-dismiss="modal">&times;</button>
                                    </div>
                                    
                                    <div className="modal-body">
                                    Planta registrada correctamente...
                                    </div>
                                    
                                    <div className="modal-footer">
                                    <button type="button" className="btn btn-danger" data-dismiss="modal">Close</button>
                                    </div>
                                    
                                    </div>
                                    </div>
                            </div>
                                       
                              </form>
                           </div>
                        </div>   
                     </div>      
                        
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
                                            <th>Acciones</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {plants.map((plant, index) => (
                                            plant.devices.map((device, index) => (
                                                <tr key={index}>
                                                    <td> {device.name}</td>
                                                    <td> {device.type}</td>
                                                    <td> {device.status}</td>
                                                    <td> {device.created_at}</td>
                                                    <button type="button" className="btn btn-success" onClick={() => this.setOnDevice(device.id)}>Habilitar</button>
                                                    <button type="button" className="btn btn-warning" onClick={() => this.setOffDevice(device.id)}>Deshabilitar</button> 
                                                    <button type="button" className="btn btn-danger" onClick={() => this.deleteDevice(device.id)}>Eliminar</button>
                                                    </tr>

                                                )
                                            )
                                        ))}
                                    
                                        
                                        </tbody>
                                    </table>
                           </div>
                        </div>   
                     </div>
                     <div className="col-md-4">
                        <div className="card-header">Agregar Device:</div>
                           <div className="card-body">
                           <form onSubmit={this.handleSubmitDevice}>
                               <div className="form-group">
                               <label htmlFor="nameplant">Nombre:</label>
                               <input type="text" className="form-control" id="nameplant" name="name" value={this.state.name}
                               onChange={this.handleChange} />
                               </div>
                               <div className="form-group">
                               <label htmlFor="type">Tipo:</label>
                               <select className="form-control" id="sel1" id="type" name="type" value={this.state.type} onChange={this.handleChange}>
                                   <option value="ON-OFF">ON-OFF</option>
                                   <option value="TEMP">TEMP</option>
                                   <option value="COUNTER">COUNTER</option>
                               </select>
                               </div> 
                               <div className="form-group">
                               <label htmlFor="plant_id">Planta:</label>
                               <select className="form-control" id="plant_id" name="plant_id" value={this.state.plant_id} onChange={this.handleChange}>
                                       {plants.map((plant, key) => (
							                <option key={key} value={plant.id}>{plant.name}</option>
						                ))}
                                        </select>
                               </div> 
                               <button type="submit" className="btn btn-primary" data-toggle="modal" data-target="#myModal">Aceptar</button>
                               <div className="modal fade" id="myModal">
                                <div className="modal-dialog">
                                <div className="modal-content">
                                    <div className="modal-header">
                                    <h4 className="modal-title">NoTE Admin</h4>
                                    <button type="button" className="close" data-dismiss="modal">&times;</button>
                                    </div>
                                    
                                    <div className="modal-body">
                                    Device agregado correctamente...
                                    </div>
                                    
                                    <div className="modal-footer">
                                    <button type="button" className="btn btn-danger" data-dismiss="modal">Close</button>
                                    </div>
                                    
                                </div>
                                </div>
                            </div>
                           </form>
                           </div>
                       </div>
                    </div>
                </div> 
                 </div>
                    
                              
        );
    }
}
