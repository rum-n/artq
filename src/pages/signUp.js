import React, { useEffect, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import './signUp.css';
import artist from '../assets/artist_1.png';
import buyer from '../assets/buyer_1.png';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import plus from '../assets/plus.png'; 
import ImageUploading from "react-images-uploading";
import { useHttpClient } from "../components/hooks/http-hook"
import { ShortenUrlProvider } from 'react-shorten-url';
import { useShortenUrl } from 'react-shorten-url';
import ImageUpload from "../components/imageUpload"


const Signup =  () => {

    const [images, setImages] = React.useState([]);
  const maxNumber = 1;
  const [thepic,setthepic] = useState("")
  const [file, setFile] = React.useState("");
  const onChange = (imageList, addUpdateIndex) => {
    // data for submit
    console.log(imageList[0].data_url);
    
    setImages(imageList);}
    const { sendRequest } = useHttpClient();
    const [previewUrl,setPreviewUrl] = useState()
    const pic = []
    const [ redirect, setRedirect ] = useState(false)
    const [ click, setClick ] = useState(false)
   
    // useEffect(()=>{
    //     if (thepic){
    //         const fileReader = new FileReader();
    //     fileReader.onload = () =>{
    //         console.log("ENTETED LOADDDDDDDDDDDDDDDD")
    //         console.log(thepic)
    //         setPreviewUrl(fileReader.url)
    //     }
    //     fileReader.readAsDataURL(thepic)
    //     }

    // },[])
    
    function handleUpload(event) {
        setFile(event.target.files[0]);
    
        // Add code here to upload file to server
        // ...
      }
      const ImageThumb = ({ image }) => {
          console.log(URL.createObjectURL(file))
          console.log(URL.createObjectURL(file))
        return <img src={URL.createObjectURL(file)} alt={image.name} />;
      };
    
    const [ account, setAccount ] = useState({
        firstname:'',
        lastname:'',
        email:'',
        password:'',
        phone:'',
        location:'',
        about:'',
        image:'default.png'
    })

let handleChange = (e) => {
    
    let name = e.target.name;
    let value = e.target.value;
    account[name] = value;
    setAccount(account);
    profilepic()
  }

  let save = async(e) => {
    e.preventDefault();
    
    try{
        const formData = new FormData()
        formData.append('name',account.firstname)
        formData.append('email',account.email)
        formData.append('password',account.password)
        formData.append('phone',account.phone)
        formData.append('prof',file)
        formData.append('image',account.image)
        formData.append('location',account.location)
        formData.append('about',account.about)
       

        console.log(previewUrl)
    await sendRequest('http://165.227.117.138:5000/api/users/signup', 'POST', formData
   
      );
      setRedirect(true)
    } catch(err){
        if (err == "Error: User exists already, please login instead"){
            alert("User already exists, login instead")
        }else{
            alert("Error with logging in")

        }
      
        setRedirect(false)
    }
}
    const shouldRedirect = redirect =>{
        if (redirect){
            return <Redirect to = "/login"/>
        }
    }

    const profilepic = () =>{
        setthepic(pic[0])
    }
    
    return (
        <React.Fragment>
            <div className="App">
      
    </div>
       {shouldRedirect(redirect)}
        <div className='signup-wrapper'>
            <div className='left-wrapper'>
                <div className='white-rectangle'>
                    <div className='img-div'>
                        <img src={artist} alt='Painter'/>
                    </div>
                    <div className='label-wrapper'>
                        <p>Join as an artist</p>
                        <div className='profile-type-selector'></div>
                    </div>
                </div>
                <div className='white-rectangle'>
                <div className='img-div'>
                    <img src={buyer} alt='Art Collector'/>
                </div>
                    <div className='label-wrapper'>
                        <p>Join as a collector</p>
                        <div className='profile-type-selector'></div>
                    </div>
                </div>
            </div>

            <div className='right-wrapper'>
                
            <Form className='signup-form-wrapper'>
            <div id="upload-box">
      <input type="file" onChange={handleUpload} />
      {/* <p>Filename: {file.name}</p>
      <p>File type: {file.type}</p>
      <p>File size: {file.size} bytes</p> */}
      {/* {file && <ImageThumb className='profile-pic' image={file} />} */}
    </div>
                {/* <ImageUpload id="image" onInput={onChange}/> */}
            {/* <ImageUploading
        multiple
        value={images}
        onChange={onChange}
        maxNumber={maxNumber}
        dataURLKey="data_url"
      >
        {({
          imageList,
          onImageUpload,
          onImageRemoveAll,
          onImageUpdate,
          onImageRemove,
          isDragging,
          dragProps
        }) => (
          // write your building UI
          <div className="upload__image-wrapper">
             <img   onClick={onImageUpload} className='add-profile-pic' src={plus} alt="Plus in circle" />
            &nbsp;
            {imageList.map((image, index) => (
              <div key={index} className="image-item">
                <img src={image.data_url} alt="" width="100" />
                {pic.push(image.data_url)}
                {console.log(image.data_url)}
               
              </div>
            ))}
          </div>
          
        )}
        
      </ImageUploading> */}
          
              
            <Form.Row>
                <Col>
                <Form.Control type="text" name="firstname" placeholder="First name" onChange={handleChange}/>
                </Col>
                <Col>
                <Form.Control type="text" placeholder="Last name" />
                </Col>
            </Form.Row>
            <Form.Row>
                <Col>
                    <Form.Control type="email" name="email"placeholder="Email" onChange={handleChange}/>
                    <Form.Control placeholder="Phone" name="phone" onChange={handleChange}/>
                    <Form.Control type="password" name="password" placeholder="Password" onChange={handleChange} />
                    <Form.Control type="password" placeholder="Confirm Password" />
                    <Form.Control type="location" name="location" onChange={handleChange} placeholder="Where are you based at?" />
                    <Form.Control type="about" name="about" onChange={handleChange} placeholder="Tell us a bit about yourself!" />
                </Col>
            </Form.Row>
                <Button onClick= {save}>Next <span>→</span></Button>
                <p>Already have an account? <Link to='/login'>Sign in!</Link></p>
            </Form>          
            </div>
        </div>
        </React.Fragment>
    )
} 

export default Signup;