import axios from "axios"

export const raza = () =>{
   
   
        let raza = axios.get(`http://localhost:1337/razas`)
       return raza
}


export const nuevoRegistro = async (nombre, raza, sexo,edadAdulta, mes, aprox ) =>{
    
}