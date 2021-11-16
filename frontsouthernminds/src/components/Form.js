import React,{useEffect , useState} from "react";
import {raza} from "../controllers/ApiRequest"
import './Form.css';
import Calendar from 'react-calendar';


const Form =() => {
    const [date, setDate] = useState("");
    const [razas, setRazas] = useState([]);
    const fechaNacimiento = date.toString().slice(0,15)
    const [menor, setMenor] =useState(false)
    const [input,setInput] =useState({  
        nombre:"",
        raza:"",
        sexo:"",
        edadAdulta:fechaNacimiento,
        mes:"" || 0, 
        aprox:"false"
    })
    
    //console.log(razas)
    useEffect(() => {
        raza().then(response => {
            setRazas(response.data);
        })
    
    
    },[])

      const handleInputChange = function(e) {
         // e.preventDefault()
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
                
                <input className={!input.nombre && "inpError"} type="text" value={input.nombre} name="nombre" onChange={handleInputChange} required/>
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
                        <select name="menor" value={menor} onChange={handleInputChange} >
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
                su mascota es menor de un año? 
                <br/>
                <br/>

        { !menor ?   
             ( <>
             ( 
                <> 
                seleccione en caso de no saber la fecha exacta      
              <input type="checkbox" id="aprox" name="aprox" value="true" onChange={handleInputChange} />
       
              <Calendar
                  className="react-calendar"
                  onChange={(e)=>{setDate(e)}}
                  value={date}
              />
              </>
        )
           : 
          (
              <>
              <div>elija los meses</div>
              <select name="mes" value={input.mes} onChange={handleInputChange} >
                        <option defaultValue="selected"></option>
                        <option value="1"> 1 mes</option> 
                        <option value="2"> 2 meses</option>
                        <option value="3"> 3 meses</option>
                        <option value="4"> 4 meses</option>     
                        <option value="5"> 5 meses</option>
                        <option value="6"> 6 meses</option>
                        <option value="7"> 7 meses</option>
                        <option value="8"> 8 meses</option>
                        <option value="9"> 9 meses</option>
                        <option value="10"> 10 meses</option>
                        <option value="11"> 11 meses</option>
            </select>

              </>
          )
              
              </>)
              : null
              
              }
              
            </label>    
            <br/>
           
                       
             
            <br/>
                <input className="butt" onClick={handleSubmit} value= "Submit" type="submit"/> 
             </form>
        </div>   


        </div>

    )
}

export default Form;