import React, {useEffect, useState} from "react";
import { Link } from 'react-router-dom'
import './Landing.css';
import axios from "axios"

const Landing =() => {


    return (
        <div className="container">
            <div className="img-container">
            <img className="landing-img" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHXx7adkiKfkxshoykiakxsdUMmKq7LgkTaQ&usqp=CAU" />
            </div>
            <div className="row">
            <div className="title-container">
                <h1 className="title">Southern Minds Pets </h1>
            </div>
            <div className="p-container"> 
                <p className="p"> 
                    Bienvenido a la tienda de mascotas de Southern Minds. 
                    Aqui podra registrar su mascota en nuestra base de datos
                </p>
              <Link to="/nuevamascota"> <button className="butt">Registrar Mascota</button></Link>  
            </div>
            </div>
        </div>

    )
}

export default Landing;