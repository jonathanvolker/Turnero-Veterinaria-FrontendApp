import React, {useEffect, useState} from "react";
import { Link } from 'react-router-dom'
import './Landing.css';
import axios from "axios"

const Landing =() => {


    return (
        <div className="container">
            <img src="https://img.freepik.com/vector-gratis/tienda-mascotas-relacionada_24908-57968.jpg?size=338&ext=jpg" />
            <div className="row">
            <div className="title-container">
                <h1 className="title">Southern Minds Pets </h1>
            </div>
            <div className="p-container"> 
                <p className="p"> 
                    Bienvenido a la tienda de mascotas de Southern Minds. 
                    Aqui podra registrar su mascota en nuestra base de datos
                </p>
              <Link to="/nuevamascota"> <button className="btn">Registrar Mascota</button></Link>  
            </div>
            </div>
        </div>

    )
}

export default Landing;