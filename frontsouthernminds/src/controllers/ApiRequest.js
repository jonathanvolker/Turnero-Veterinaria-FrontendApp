import axios from "axios"

export const raza = () =>{
   
   
        let raza = axios.get(`http://localhost:1337/razas`)
       return raza
}


export const nuevoRegistro = async (input) =>{
 

        let animal = axios.post(`http://localhost:1337/nuevamascota`,input)
        return animal

}