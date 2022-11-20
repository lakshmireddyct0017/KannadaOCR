import { useState,useEffect } from 'react'
import reactLogo from './assets/react.svg'
import React, { useCallback} from 'react'

import { useDropzone } from 'react-dropzone'
import { Col, Row } from 'react-bootstrap'
import { Alert, Button, CircularProgress } from '@mui/material';
import { useAuth0 } from "@auth0/auth0-react";
import validator from 'validator'
import TextField from '@mui/material/TextField';
import './App.css'
import UploadFileIcon from '@mui/icons-material/UploadFile';
import {NavLink} from 'react-router-dom'
// import { formatBytes } from './functions';


import axios from "axios";



export default function App() {
  const [ocr, setocr] = useState("")
  const { loginWithRedirect,isAuthenticated } = useAuth0();
  const { logout } = useAuth0();
  const [input,setInput]=useState("");
   const [loading, setLoading] = useState(false)
    
    const [method, setMethod] = useState(0)
    const [isValidUrl, setIsValidUrl] = useState(true)

    const [image, setImage] = useState(null);
    const [base64, setBase64] = useState(null);
    const[result,setResult]=useState('');
    const [success, setSuccess] = useState(false)
    const [error, setError] = useState(false)
    const[cameraImage,setCameraImage]=useState('')
    // const[text,setText]=useState('')

    // meta
    const [meta, setMeta] = useState(null)

    // const mongoose=require('mongoose')

    // const DB='mongodb+srv://KanndaOCR:KanndaOCR@cluster0.9vhjq4r.mongodb.net/db?retryWrites=true&w=majority'

    // mongoose.connect(DB).then(()=>{
    //   console.log("connection succesful")
    // }).catch((err)=>console.log("connection unsuccesful"))

    const handleRemoveImage = () => {
      setImage(null)
      setBase64(null)
      setURL('')
      setResult('')
      setError(false)
      setMeta(null)
  }
    const convertBase64 = (file) => {
      return new Promise((resolve, reject) => {
          const fileReader = new FileReader();
          fileReader.readAsDataURL(file);

          fileReader.onload = () => {
              resolve(fileReader.result);
          };

          fileReader.onerror = (error) => {
              reject(error);
          };
      });
  };

//   const config = {
//   headers:{
//     key: "bMlaq8HPmQYIVDvAcMV-GIP9SmHK7kOwn043WzR-Tc_s6KL8cbX4t1gF8JjaHReOTbU"
//   }
// };
// const url = "https://api.onlineocrconverter.com/api/url";

// const data ={
  
//   "url": input,
//   "language": "kan"
// }
//   useEffect(()=>{
//     axios.post(url, data, config)
//     .then(res => setocr(res.data))
//     .catch(err => console.log(err))
//   },[])


  const handelUrlChange = (e) => {
    let value = e.target.value
    setInput(value)
  
    if (validator.isURL(value)) {
        setIsValidUrl(true)
    } else {
        setIsValidUrl(false)
    }
  }


  const {text}=ocr;
  // setText(ocr);
  
function handleClick(){
  setSuccess(false)
  setResult(false)
  setError(false)
  setLoading(true)

  const config = {
    headers:{
      key: "bMlaq8HPmQYIVDvAcMV-GIP9SmHK7kOwn043WzR-Tc_s6KL8cbX4t1gF8JjaHReOTbU"
    }
  };
  const url = "https://api.onlineocrconverter.com/api/url";
  
  
  
    const data ={
      
      "url": input,
      "language": "kan"
    }
     
  

  // const config = {
  //   headers:{
  //     key: "bMlaq8HPmQYIVDvAcMV-GIP9SmHK7kOwn043WzR-Tc_s6KL8cbX4t1gF8JjaHReOTbU"
  //   }
  // };
  // const url = "https://api.onlineocrconverter.com/api/url";
  
  // const data ={
    
  //   "url": input,
  //   "language": "kan"
  // }
   
  axios.post(url, data, config)
  .then(res => setocr(res.data))
  .catch(err => console.log(err))
}
function handleDropboxClick(inp){
  setSuccess(false)
  setResult(false)
  setError(false)
  setLoading(true)

  const config = {
    headers:{
      key: "bMlaq8HPmQYIVDvAcMV-GIP9SmHK7kOwn043WzR-Tc_s6KL8cbX4t1gF8JjaHReOTbU"
    }
  };
  const url = "https://api.onlineocrconverter.com/api/url";
  
  
  
    const data ={
      
      "url": inp,
      "language": "kan"
    }
   
  axios.post(url, data, config)
  .then(res => setocr(res.data))
  .catch(err => console.log(err))
}
function handleImageClick(){

  
  setSuccess(false)
  setResult(false)
  setError(false)
  setLoading(true)

  const config = {
    headers:{
      key: "bMlaq8HPmQYIVDvAcMV-GIP9SmHK7kOwn043WzR-Tc_s6KL8cbX4t1gF8JjaHReOTbU"
    }
  };
  const url = "https://api.onlineocrconverter.com/api/image";
  
          const data = {
              "base64":base64,
              "language":"kan"
          }
        
  // const config = {
  //   headers:{
  //     key: "bMlaq8HPmQYIVDvAcMV-GIP9SmHK7kOwn043WzR-Tc_s6KL8cbX4t1gF8JjaHReOTbU"
  //   }
  // };
  // const url = "https://api.onlineocrconverter.com/api/url";
  
  // const data ={
    
  //   "url": input,
  //   "language": "kan"
  // }
   
  axios.post(url, data, config)
  .then(res => setocr(res.data))
  .catch(err => console.log(err))
}


const onDrop = useCallback(async acceptedFiles => {
  // Do something with the files
  if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      setMeta(file)
      var src = URL.createObjectURL(file)
      setImage(src)
      const base64 = await convertBase64(file);
      setBase64(base64);
  }

}, [])
const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, accept: 'image/*', maxFiles: 1 })


function dropbox(){
const client = filestack.init("Abot0B2TGaLxLO404A7Q7z");


client.picker({
  onFileUploadFinished: function(response){
    handleDropboxClick(response.url);
  },
 
}).open();
}

const handleCopyText = () => {
  navigator.clipboard.writeText(ocr)
  setSuccess('Text copied to clipboard')
}
  return (
   <>
<nav className="navbar navbar-expand-lg navbar-light bg-light">
  <div className="container-fluid">
    <a className="navbar-brand" href="#">Kannada OCR</a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <a className="nav-link active" aria-current="page" href="#">Saved Text</a>
        </li>
        <li className="nav-item">
          <a className="nav-link active" aria-current="page" href="#">Saved Sumarized Text</a>
        </li>
        <li className="nav-item">
          <a className="nav-link active" aria-current="page" href="#">Home</a>
        </li>
        <li className="nav-item loginbtn">
         
        <button onClick={() => loginWithRedirect()}>Log In</button>
          
        </li>
        <li className="nav-item loginbtn">
         
        {isAuthenticated ? (<button onClick={() => logout({ returnTo: window.location.origin })}>Log Out
    </button>):
        (
          <button onClick={() => loginWithRedirect()}>Log In</button>
        )}
      
           
         </li>
        </ul>
        </div>
        </div>
        </nav>
       
   <h1>Kannada OCR</h1>
   
   <label for="basic-url" className="form-label">Enter Image URL</label>
<div className="input-group mb-3">
  <span className="input-group-text" id="basic-addon3" helperText={isValidUrl ? '' : 'Please enter a valid URL'}>https://example.com/users/</span>
  <input type="text" className="form-control" value={input} id="basic-url"  onChange={handelUrlChange}/>
  <input className="btn btn-primary" type="button" value="Extract Text" onClick={handleClick} ></input>

  {text?<TextField
                                        
                                        required
                                        fullWidth
                                        value={text}
                                        
                                        onChange={(e) => { setResult(e.target.value)}}
                                        className='mt-4 mb-4'
                                        label="Result"
                                        
                                        variant="outlined" />:""}
</div>

{text?<button type="button" className="btn btn-primary">Copy Text</button>:""}
{text?<button type="button" className="btn btn-primary">Summarize Text</button>:""}
{text?<button type="button" className="btn btn-primary">Save Summarised Text</button>:""}
{/* <button type="button" onClick="scanToJpg();">Scan</button>
<div id="images"/> */}
<h3>OR</h3>
<p>Upload Image below by clicking on Image Icon(Accepts Only Images)</p>
<div {...getRootProps()} className="drop-area">
                                        <input {...getInputProps()} />
                                        {
                                            isDragActive ?
                                                <><UploadFileIcon /> Drop the Image here ...</> :
                                                <><UploadFileIcon /> Select or Drag Image here</>
                                        }
</div>

<input className="btn btn-primary" type="button" value="Extract Text" onClick={handleImageClick} disabled={!base64}></input>



      {/* <input type="file" accept="image/*" capture="camera"> */}
 {image ? (
                                <Row className='justify-content-center'>
                                    <Col md={4}>
                                        <img src={image} className="img-fluid mb-4 img-preview" alt='selected' />
                                    </Col>
                                    {/* Size: {formatBytes(meta.size)} */}
                                    <Col md={4}>
                                        File Name: {meta.name} <br />
                                         <br /><br />
                                        <Button variant="outlined" color="error" size="small" onClick={handleRemoveImage}>
                                            Remove
                                        </Button>
                                    </Col>
                                </Row>
                            ) : ''}

                            


                            <h3>OR</h3>
<p>Upload from DropBox/GoogleDrive </p>
<button type="button" className="btn btn-primary" onClick={dropbox}>Click To Open File Picker</button>
                      
   </>
  )
}

