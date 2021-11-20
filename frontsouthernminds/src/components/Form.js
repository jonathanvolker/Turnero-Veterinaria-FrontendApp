import React,{useEffect , useState} from "react";
import {raza , nuevoRegistro} from "../controllers/ApiRequest"
import './Form.css';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { DatePicker } from '@mui/lab';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { TextField } from '@mui/material';
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

    console.log(razas)
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
        if(input.meses !== ""){
            setInput({ ...input, meses : ""})
        }
    }
    const handleCheckbox2 =(e)=>{
        setExacta(!exacta)
        
            if(input.aprox === "true"){
                setInput({ ...input, aprox:"false"})
            }else{

                setInput({ ...input, aprox:"true"})
            }
        if(input.edadAprox !== ""){
            setInput({ ...input, edadAprox:""})
        }
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
                <div className="title-form">
                    <h1>Registre una nueva mascota</h1>    
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
                    
                     <TextField
                        id="outlined-name"
                        label="Nombre"
                        name="nombre"
                        onChange={handleInputChange}
                        required
                       />
                        </div> 
                   
                    <div className="colums-peq">
                    <h4 className= "label">
                    Elija la raza:
                    </h4> 
                    <FormControl fullWidth>
                            <InputLabel id="raza">Raza</InputLabel>
                            <Select
                            labelId="raza"
                            id="raza"
                            name="raza"
                            label="Raza"
                            onChange={handleInputChange}
                            >
                           {razas.map((raza) =>  {
                               return (
                               <MenuItem value={raza.nombreDeRaza}>{raza.nombreDeRaza}</MenuItem>)})}
                         
          
                            </Select>
                        </FormControl>

                    </div>  
                    <div className="colums-peq">
                    <h4 className= "label">
                    Elija el sexo:
                    
                    </h4>
                    <FormControl fullWidth>
                            <InputLabel id="raza">Sexo</InputLabel>
                            <Select
                            labelId="sexo"
                            id="sexo"
                            name="sexo"
                            label="Sexo"
                            onChange={handleInputChange}
                            >
                           <MenuItem value={"hembra"}>hembra</MenuItem>
                           <MenuItem value={"macho"}>macho</MenuItem>
          
                            </Select>
                     </FormControl>
                </div>
            </div>    
                <div className="center"> 
                <div className="colums">               
                <h4>  La mascota tiene menos de un año?</h4> 
                <div className="buttons-center">
                     <Stack direction="row" spacing={2}>
                        <Button variant="outlined" 
                        onClick={handleCheckbox } value= "true" 
                        style={{
                            borderRadius: 5,
                            backgroundColor: "#66806A",
                            padding: "5px 10px",
                            fontSize: "10px",
                            color:"black",
                        }}
                      >si
                      </Button>
                       
                        </Stack> 
                        <Stack direction="row" spacing={2}>
                        <Button variant="outlined" 
                        onClick={handleCheckbox } value= "false" 
                        style={{
                            borderRadius: 5,
                            backgroundColor: "#66806A",
                            padding: "5px 10px",
                            fontSize: "10px",
                            color:"black",
                        }}
                      >no
                      </Button>
                       
                        </Stack>  
                        </div>           


                </div>                
                    <div className="colums">
                    <h4> Marcar en caso de no conocer la edad exacta</h4>    
                    <input className="checkmark" checked={exacta} type="checkbox" onClick={handleCheckbox2} value= "true" /> 
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
                      
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DatePicker
                            label="fecha de nac."
                            value={input.fechaNacimiento}
                            onChange={(e)=>{  setInput({ ...input, fechaNacimiento: e.getFullYear() + "-" + (e.getMonth() + 1) + "-" + e.getDate()
                                });}}
                            renderInput={(params) => <TextField {...params} />}
                        />
                        </LocalizationProvider>
                    
                                   
                    </div>

                    </>
                ) 
                : 
                (
                    <>
                    <div className="colums-caledario">   
                        <h4>  volver a calendario</h4> 
                       <div className="volver">
                        <Stack direction="row" spacing={2}>
                        <Button variant="outlined" 
                        onClick={handleCheckbox2 } value= "true" 
                        style={{
                            borderRadius: 5,
                            backgroundColor: "#66806A",
                            padding: "5px 10px",
                            fontSize: "10px",
                            color:"black",
                        }}
                      >volver
                      </Button>
                       
                        </Stack>
                   </div>
                    </div>
                    <div className="colums-caledario">   
                        <h4>Seleccione años aproximados</h4>
                        <FormControl fullWidth>
                            <InputLabel id="raza">Años aproximados</InputLabel>
                            <Select
                            labelId="edadAprox"
                            id="edadAprox"
                            name="edadAprox"
                            label="edadAprox"
                            onChange={handleInputChange}
                            >
                           <MenuItem value={"1"}>1 año</MenuItem>
                           <MenuItem value={"2"}>2 años</MenuItem>
                           <MenuItem value={"3"}>3 años</MenuItem>
                           <MenuItem value={"4"}>4 años</MenuItem>
                           <MenuItem value={"5"}>5 años</MenuItem>
                           <MenuItem value={"6"}>6 años</MenuItem>
                           <MenuItem value={"7"}>7 años</MenuItem>
                           <MenuItem value={"8"}>8 años</MenuItem>
                           <MenuItem value={"9"}>9 años</MenuItem>
                           <MenuItem value={"10"}>10 años</MenuItem>
                           <MenuItem value={"11"}>11 años</MenuItem>
                           <MenuItem value={"12"}>12 años</MenuItem>
                           <MenuItem value={"13"}>13 años</MenuItem>
                           <MenuItem value={"14"}>14 años</MenuItem>
                           <MenuItem value={"15"}>15 años</MenuItem>
                           <MenuItem value={"16"}>16 años</MenuItem>
                           <MenuItem value={"17"}>17 años</MenuItem>
                           <MenuItem value={"18"}>18 años</MenuItem>
                           <MenuItem value={"19"}>19 años</MenuItem>
                           <MenuItem value={"20"}>20 años</MenuItem>
                           </Select>
                        </FormControl>
                      
                    </div>
                    </>

                )
                
                )
                : 
                (
                    <>
                <div className="colums">            
                        <h4>Elija los meses de la mascota</h4>
                        <FormControl fullWidth>
                            <InputLabel id="meses">meses aproximados</InputLabel>
                            <Select
                            labelId="meses"
                            id="meses"
                            name="meses"
                            label="meses"
                            onChange={handleInputChange}
                            >
                           <MenuItem value={"1"}>1 mes</MenuItem>
                           <MenuItem value={"2"}>2 meses</MenuItem>
                           <MenuItem value={"3"}>3 meses</MenuItem>
                           <MenuItem value={"4"}>4 meses</MenuItem>
                           <MenuItem value={"5"}>5 meses</MenuItem>
                           <MenuItem value={"6"}>6 meses</MenuItem>
                           <MenuItem value={"7"}>7 meses</MenuItem>
                           <MenuItem value={"8"}>8 meses</MenuItem>
                           <MenuItem value={"9"}>9 meses</MenuItem>
                           <MenuItem value={"10"}>10 meses</MenuItem>
                           <MenuItem value={"11"}>11 meses</MenuItem>
                           </Select>
                        </FormControl>
                        
                    </div>
                </>
                )
                }
                <br/>
                <div className="submit">
                        <Stack direction="row" spacing={2}>
                        <Button variant="outlined"  
                        style={{
                            borderRadius: 5,
                            backgroundColor: "#66806A",
                            padding: "10px 26px",
                            fontSize: "18px",
                            color:"black"
                        }}
                        disabled={!input.name && !input.raza && !input.sexo } onClick={input.name && input.raza && input.sexo && handleSubmit} value= "Submit" type="submit">Cargar</Button>
                       
                        </Stack>
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