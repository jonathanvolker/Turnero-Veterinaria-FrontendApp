import React,{useEffect , useState} from "react";
import {raza} from "../controllers/ApiRequest"
import './Form.css';
import Calendar from 'react-calendar';


const Form =() => {
    const [date, setDate] = useState("");
    const [razas, setRazas] = useState([]);
    const fechaNacimiento = date.toString().slice(0,15)
    const [menor, setMenor] =useState(false)
    const [exacta, setExacta] =useState(true)
    
    const [input,setInput] =useState({  
        nombre:"",
        raza:"",
        sexo:"",
        edadAdulta:date,
        edadAprox:"",
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
        if (e.target.name == "edadAprox"){
            setInput({ ...input, aprox : "true" ,[e.target.name]: upper})
            
          
        }
        
        
    }
    const handleCheckbox =(e)=>{
        setMenor(!menor)
    }
    const handleCheckbox2 =(e)=>{
        setExacta(!exacta)
    }
    const handleSubmit= (e)=> {
        e.preventDefault();
      }
    return (
        <>
        <div className="container">
         <div className="title-container">
            <h1>Aqui puede registrar a su mascota</h1>    
         </div>
         <div className="form-container">
         <form onSubmit={handleSubmit}>
            <div className="form-group">
           <div className="izquierda">
             <div className="colums">
            <label className= "label">
            <br/>
                Nombre :
                <br/>
                
                <input className={!input.nombre && "inpError"} type="text" value={input.nombre} name="nombre" onChange={handleInputChange} required/>
            </label>  
            </div>  
            <br/>
            <div className="colums">
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
            </div>  
            <div className="colums">
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
           </div>
           </div>    
            <br/>


             <div className="center"> 
             <div className="colums-center">               
             <h4>  su mascota es menor de un año?</h4> 
                <input type="checkbox" onClick={handleCheckbox} value= "true" /> 
             </div>                
                <br/>
                <br/>
                <div className="colums-center">
                  <h4> seleccione en caso no estar seguro de la edad </h4>    
                  <input type="checkbox" onClick={handleCheckbox2} value= "true" /> 
                </div>
             </div>                



            <div className="derecha">
            <label className= "label">
            <br/>
              
                <br/>

        { !menor ?   
             ( 
             
               exacta ? (<> 
               <div className="colums-derecha">   
                <h4 className= "label"> indique la fecha exacta </h4>
                </div>
                <div className="colums-derecha">   
                <Calendar
                  className="react-calendar"
                  onChange={(e)=>{  setInput({ ...input, edadAdulta: e.toString().slice(0,15)
                  });}}
                  value={date}
                />
                </div>
                  
              </>) 
              : (
                <>
                <div className="colums-derecha">   
                <h4>  volver a fecha exacta</h4> 
                <button  onClick={handleCheckbox2 } value= "true" >volver </button> 
                </div>
                <div className="colums-derecha">   
                <h4>elija los años aproximados</h4>
                <select name="edadAprox" value={input.edadAprox} onChange={handleInputChange } >
                        <option defaultValue="selected"></option>
                        <option value="1"> 1 años </option> 
                        <option value="2"> 2 años</option>
                        <option value="3"> 3 años</option>
                        <option value="4"> 4 años</option>     
                        <option value="5"> 5 años</option>
                        <option value="6"> 6 años</option>
                        <option value="7"> 7 años</option>
                        <option value="8"> 8 años</option>
                        <option value="9"> 9 años</option>
                        <option value="10"> 10 años</option>
                        <option value="11"> 11 años</option>
            </select>
                </div>
                </>

              )
              
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
              
              }
              
            </label>    
            <br/>
           
             
            <br/>
            </div>
            </div>
                <input className="butt" onClick={handleSubmit} value= "Submit" type="submit"/> 
             </form>
        </div>   


        </div>
        </>
    )
}

export default Form;