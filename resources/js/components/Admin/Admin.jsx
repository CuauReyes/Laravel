import React, { Component } from "react";
import ReactDOM from "react-dom";
import "./Admin.scss";
import Sidebar from './Assets/Sidebar';

export default class Admin extends Component {
    render() {
        return (
            <div className="row">
                <div className="col-md-2">
                <h1 className="center">Menu</h1>
                
                </div>
                 <div className="col-md-9">
                    <h1>Admin</h1>
                        <div className="card ">
                            <div className="card-header">Agregar nuevo cliente:</div>
                            <div className="col-md-4">
                            <div className="card-body">
                                <div class="form-group">
                                <label for="email">Nombre:</label>
                                <input type="email" class="form-control" id="email" />
                                </div>
                                <div class="form-group">
                                <label for="email">Correo:</label>
                                <input type="email" class="form-control" id="email" />
                                </div>
                                <div class="form-group">
                                <label for="email">Contraseña:</label>
                                <input type="email" class="form-control" id="email" />
                                </div>
                                <button type="submit" class="btn btn-primary">Aceptar</button>
                            </div>
                            </div>
                        </div>
                        <div className="card">
                            <div className="card-header">Buscar Cliente:</div>
                            <div className="col-md-12">
                            <div class="input-group mb-3">
                                <input type="text" class="form-control" placeholder="Buscar"/>
                                <div class="input-group-append">
                                    <button class="btn btn-success" type="submit">Go</button>
                                </div>
                                </div>
                                <h2>Clientes</h2>
                                    <p>The .table-striped class adds zebra-stripes to a table:</p>            
                                    <table class="table table-striped">
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
                                            <button type="button" class="btn btn-primary">Ver info</button>
                                            <button type="button" class="btn btn-danger">Eliminar</button>
                                        </tr>
                                        <tr>
                                            <td>Mary</td>
                                            <td>Moe</td>
                                            <td>mary@example.com</td>
                                            <button type="button" class="btn btn-primary">Ver info</button>
                                            <button type="button" class="btn btn-danger">Eliminar</button>
                                        </tr>
                                        <tr>
                                            <td>July</td>
                                            <td>Dooley</td>
                                            <td>july@example.com</td>
                                            <button type="button" class="btn btn-primary">Ver info</button>
                                            <button type="button" class="btn btn-danger">Eliminar</button>
                                        </tr>
                                        
                                        </tbody>
                                    </table>    
                            </div>
                        </div>
                    </div>
                    <div className="col-md-2">
                    </div>
                    <div className="col-md-9">
                    <div className="card ">
                            <div className="card-header">John Doe</div>
                            <div className="col-md-6">
                            <h3>Agregar Planta</h3>
                            <div className="card-body">
                                <div class="form-group">
                                <label for="email">Nombre:</label>
                                <input type="email" class="form-control" id="email" />
                                </div>
                                <div class="form-group">
                                <label for="email">Localización:</label>
                                <input type="email" class="form-control" id="email" />
                                </div>
                                <div class="form-group">
                                <label for="email">Url:</label>
                                <input type="email" class="form-control" id="email" />
                                </div>
                                <div class="form-group">
                                <label for="email">Key:</label>
                                <input type="email" class="form-control" id="email" />
                                </div>
                                <div class="form-group">
                                <label for="email">Imagen:</label>
                                <input type="email" class="form-control" id="email" />
                                </div>
                                
                                <button type="submit" class="btn btn-primary">Aceptar</button>
                            </div>
                            </div>
                            <div className="col-md-6">
                            <h3>Agregar Device</h3>
                            <div className="card-body">
                                <div class="form-group">
                                <label for="email">Sensor:</label>
                                <input type="email" class="form-control" id="email" />
                                </div>
                                
                                <button type="submit" class="btn btn-primary">Aceptar</button>
                            </div>
                            </div>
                        </div>
                    </div>
            </div>
         
                   
            
        );
    }
}
