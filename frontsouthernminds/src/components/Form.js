import React,{useEffect , useState} from "react";
import {raza} from "../controllers/ApiRequest"
import './Form.css';
import Calendar from 'react-calendar';


const Form =() => {
    const [date, setDate] = useState(new Date());
    const [razas, setRazas] = useState([]);
    useEffect(() => {
        raza().then(response => {
            setRazas(response.data);
        })

    },[])
    console.log(razas)
    const [input,setInput] =useState({  //controladores de imputs
       
        nombre:"",
        raza:"",
        sexo:"",
        edadAdulta:"" || "menordeunaño",
        mes:0,
        aprox:false
      })

      const handleInputChange = function(e) {
          e.preventDefault()
        const upper= e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1);
        
        setInput({ ...input, [e.target.name]: upper
        });
    }

    
    const handleSubmit= (e)=> {
        e.preventDefault();
      }
    return (
        <div className="container">
         <div className="title-container">
            <h1>Aqui puede registrar a su mascota</h1>    
         </div>
         <div className="form-container">
         <form onSubmit={handleSubmit}>
            <label className= "label">
            <br/>
                Nombre :
                <br/>
                
                <input className={!input.name && "inpError"} type="text" value={input.nombre} name="name" onChange={handleInputChange} required/>
            </label>    
            <br/>

            <label className= "label">
            <br/>
            Elija la raza:
                        <select name="raza" value={input.raza} onChange={handleInputChange} >
                        <option defaultValue="selected"></option>
                           {razas.map((a)=>{ 
                               
                               return(
                                    <option value={a.nombreDeRaza} >{a.nombreDeRaza} </option>
                                )
                            })}
                         </select>
                             {
                                <ul>
                                   Raza seleccionados: 
                                 
                                    <li>{input.raza} </li>
                                  
                                </ul>
                             }
            </label>    
            <label className= "label">
            <br/>
            Elija el sexo:
                        <select name="sexo" value={input.sexo} onChange={handleInputChange} >
                        <option defaultValue="selected"></option>
                        <option value="nene"> nene</option> 
                        <option value="nena"> nena</option>     
                         </select>
                             {
                                <ul>
                                   Sexo seleccionados: 
                                 
                                    <li>{input.sexo} </li>
                                  
                                </ul>
                             }
          
           </label>    
            <br/>
            <label className= "label">
            <br/>
                Seleccione la fecha de nacimiento :
             <Calendar
                    className="calendar"
                    onChange={handleInputChange}
                    value={date}
            />
              
            </label>    
            <br/>
            <label className= "label">
            <br/>
                Temporada: (Invierno,Otoño,Primavera,Verano)
                <br/> 
                <input className={!input.temporada && "inpError"} type="text" value={input.temporada} name="temporada" onChange={handleInputChange} />
            </label>    
                       
             
            <br/>
                <input className="butt" onClick={handleSubmit} value= "Submit" type="submit"/> 
             </form>
        </div>   


        </div>

    )
}

export default Form;