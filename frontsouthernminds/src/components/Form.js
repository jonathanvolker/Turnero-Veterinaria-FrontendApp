import React,{useEffect , useState} from "react";
import {raza , nuevoRegistro} from "../controllers/ApiRequest"
import './Form.css';
import Calendar from 'react-calendar';
import {useNavigate} from 'react-router-dom';

const Form =() => {
    const navigate = useNavigate();
   const [razas, setRazas] = useState([]);
    const [menor, setMenor] =useState(false)
    const [exacta, setExacta] =useState(false)
    
    const [input,setInput] =useState({  
        nombre:"",
        raza:"",
        sexo:"",
        fechaNacimiento:"",
        edadAprox:"",
        meses:"" || 0, 
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
         console.log(exacta)
    }
    const handleSubmit= (e)=> {
        e.preventDefault();
        if(!input.sexo || !input.nombre || !input.raza ){
            alert("se requieren Nombre, sexo y raza")
        }else{
            nuevoRegistro(input).then(response => {
                console.log(response.data)
            })
            alert("mascota cargada con exito")
            navigate('/')
          }
       }
    return (
        <>
        <div className="container">
         <div className="form-container">
               
            <form onSubmit={handleSubmit}>
                <div className="title">
                    <h1>Aqui puede registrar una nueva mascota</h1>    
                </div>
             <div className="form-group">
                <div className="left">
                    <div className="pet-title">
                    <label className="nombre" htmlFor="nombre">SouthernMinds Pets</label>
                    </div>
                    <div>
                    <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/38816/image-from-rawpixel-id-542207-jpeg.png" alt="imagen de perro"/>        
                    </div>
                </div>
                <div className="right">
             <div className="izquierda">
                    <div className="colums-peq">
                    <h4 className= "label">
                        Nombre :
                        
                    </h4>  
                        <input className={!input.nombre && "inpError"} 
                                type="text" value={input.nombre} 
                                name="nombre" 
                                onChange={handleInputChange} 
                                required/>
                    </div> 
                   
                    <div className="colums-peq">
                    <h4 className= "label">
                    Elija la raza:
                    </h4>  
                                <select name="raza" 
                                        value={input.raza} 
                                        onChange={handleInputChange} >

                                <option defaultValue="selected"></option>
                                {razas.map((a)=>{ 
                                    
                                    return(
                                            <option value={a.nombreDeRaza} >{a.nombreDeRaza} </option>
                                        )
                                    })}
                                </select>
                                    {
                                        <ul className="list">
                                       
                                        
                                            <p>{input.raza} </p>
                                        
                                        </ul>
                                    }
                    </div>  
                    <div className="colums-peq">
                    <h4 className= "label">
                    Elija el sexo:
                    <br/>
                                <select name="sexo" value={input.sexo} onChange={handleInputChange} >
                                <option defaultValue="selected"></option>
                                <option value="nene"> nene</option> 
                                <option value="nena"> nena</option>     
                                </select>
                                    {
                                        <ul className="list">
                                      
                                        
                                            <p>{input.sexo} </p>
                                        
                                        </ul>
                                    }
                
                </h4>
                </div>
            </div>    
                <div className="center"> 
                <div className="colums">               
                <h4>  Su mascota tiene menos de un año?</h4> 
                    <button className="button" type="button" onClick={handleCheckbox} value= "true" > Si </button>
                    <button className="button" type="button" onClick={handleCheckbox} value= "false" > No </button>

                </div>                
                    <div className="colums">
                    <h4> Marcar en caso de no conocer la edad exacta</h4>    
                    <input className="checkmark" checked={exacta} type="checkbox" onClick={handleCheckbox2} value= "false" /> 
                    </div>
                </div>                
                <div className="derecha">
                
            { !menor ?   
                ( 
                !exacta ? (
                <> 
                <h4 className= "label"> Indique la fecha de nacimiento </h4>
                <div className="date">   
                    </div>
                    <div  >   
                        <Calendar
                                className="react-calendar"
                                onChange={(e)=>{  setInput({ ...input, fechaNacimiento: e.getFullYear() + "-" + (e.getMonth() + 1) + "-" + e.getDate()
                                });}}
                                value={new Date}
                        />
                                        <ul>
                                        Fecha de nacimiento: 
                                            <p className="list">{input.fechaNacimiento} </p>
                                        </ul>
                    </div>

                    </>
                ) 
                : 
                (
                    <>
                    <div className="colums-caledario">   
                        <h4>  volver a calendario</h4> 
                        <button className="button" onClick={handleCheckbox2 } value= "true" >volver </button> 
                    </div>
                    <div className="colums-caledario">   
                        <h4>elija los años aproximados</h4>
                        <select name="edadAprox" value={input.edadAprox} onChange={handleInputChange } >
                                <option defaultValue="selected"></option>
                                <option value= "1"> 1 años </option> 
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
                                <option value="12"> 12 años</option>
                                <option value="13"> 13 años</option>
                                <option value="14"> 14 años</option>
                                <option value="15"> 15 años</option>
                                <option value="16"> 16 años</option>
                                <option value="17"> 17 años</option>
                                <option value="18"> 18 años</option>
                                <option value="19"> 19 años</option>

                        </select>
                        <ul>
                        Años aproximados: 
                        
                            <li>{input.edadAprox} años</li>
                        
                        </ul>
                    </div>
                    </>

                )
                
                )
                : 
                (
                    <>
                <div className="colums">            
                        <h4>elija los meses</h4>
                        <select name="meses" value={input.meses} onChange={handleInputChange} >
                                    <option defaultValue="selected"></option>
                                    <option value="1"> 1 meses</option> 
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
                    </div>
                </>
                )
                }
                <div className="submit">
                        <input className="butt" disabled={!input.name && !input.raza && !input.sexo } onClick={input.name && input.raza && input.sexo && handleSubmit} value= "Submit" type="submit"/> 
                    </div>
            
                </div>
                </div>
                
                </div>
                   
                </form>
           </div>   


        </div>
        </>
    )
}

export default Form;