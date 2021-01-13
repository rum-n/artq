import React,{useContext,useState,useEffect,Redirect,useReducer,useCallback} from "react";
// import auth0Client from './../Auth';
// import { useAuth0 } from "@auth0/auth0-react";
import {AuthContext} from "../context/auth-context";
import Button from '../components/Button';
import { Link } from "react-router-dom";
// import UsersList from '../components/UsersList';
import {useHttpClient} from "../components/hooks/http-hook"
import MyArt from "./MyArt"
import './profile.css';
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH
} from './util/validators';

const Profile = () => {
  const [file, setFile] = React.useState("");
  function handleUpload(event) {
    setFile(event.target.files[0]);
    handleChange("prof")

    // Add code here to upload file to server
    // ...
  }
  const{sendRequest,clearError,theresponse} = useHttpClient();
  const [loadedImages, setLoadedImages] = useState();
  const [loadedName, setLoadedName] = useState();
  const [loadedEmail, setLoadedEmail] = useState();
  const [loadedId, setLoadedId] = useState();
  const [loadedPhone, setLoadedPhone] = useState();
  const [loadedImage, setLoadedImage] = useState();
  const [loadedAbout, setLoadedAbout] = useState();
  const [loadedFollowing, setloadedFollowing] = useState();
  const [loadedFollowers, setloadedFollowers] = useState();
  const [loadedLocation, setLoadedLocation] = useState();
  const auth = useContext(AuthContext);
  const userId = auth.userId
  console.log("auth.userid "+auth.userId)

  const inputHandler = useCallback((id, value, isValid) => {
    dispatch({
      type: 'INPUT_CHANGE',
      value: value,
      isValid: isValid,
      inputId: id
    });
  }, []);

  const formReducer = (state, action) => {
    switch (action.type) {
      case 'INPUT_CHANGE':
        let formIsValid = true;
        for (const inputId in state.inputs) {
          if (inputId === action.inputId) {
            formIsValid = formIsValid && action.isValid;
          } else {
            formIsValid = formIsValid && state.inputs[inputId].isValid;
          }
        }
        return {
          ...state,
          inputs: {
            ...state.inputs,
            [action.inputId]: { value: action.value, isValid: action.isValid }
          },
          isValid: formIsValid
        };
      default:
        return state;
    }
  };
  

  useEffect(() => {
    const sendRequest = async () => {

      try {
        const response = await fetch(`http://localhost:5000/api/users/${auth.userId}`);
        const responseData = await response.json();
        
        if (!response.ok) {
          throw new Error(responseData.message);
        }  
        setLoadedName(responseData.userWithImages.name)
        setLoadedEmail(responseData.userWithImages.email)
        setLoadedPhone(responseData.userWithImages.phone)
        setLoadedId(responseData.userWithImages.id)
        setLoadedImage(responseData.userWithImages.prof)
        setLoadedAbout(responseData.userWithImages.about)
        setLoadedLocation(responseData.userWithImages.location)
        setloadedFollowing(responseData.userWithImages.followingnumber)
        setloadedFollowers(responseData.userWithImages.followersnumber)
        console.log(responseData.userWithImages)
       
      } catch (err) {
       
      }
    
    };
    sendRequest();
    
  }, []);

  const [values,setValues] = useState({
    name:'',
    email:'',
    password:'',
    error:false,
    success:false
})

const [allvalues,setallValues] = useState({
 name:'',
 email:'',
 password:'',
 image: [],
 savedimage:[],
 phone:'',
 about:'',
 location:'',
 prof:''

})

const [formState, dispatch] = useReducer(formReducer, {
  inputs: {
    password: {
      value: '',
      isValid: false
    },
  },
  isValid: false
});



const updateinfo = async (event,user) => {
 event.preventDefault();
 try {
  
   await sendRequest(
     `http://localhost:5000/api/users/${auth.userId}`,
     'PUT',
     JSON.stringify({
       user
 }),
     {
       'Content-Type': 'application/json',Authorization: 'Bearer '+auth.token
     }
   );
 
 } catch (err) {alert("nah bruh it didnt work")}
};

const getprofile = async () => {
 try {
   
   const response =  await fetch(`http://localhost:5000/api/users/${userId}`);
   const responseData = await response.json();
   console.log(responseData)
   setValues({...values,name:responseData.userWithImages.name, email:responseData.userWithImages.email,image:responseData.userWithImages.image,savedimage:responseData.userWithImages.savedimage,phone:responseData.userWithImages.phone, about:responseData.userWithImages.about, location:responseData.userWithImages.location,prof:responseData.userWithImages.prof})
   setallValues({...allvalues,name:responseData.userWithImages.name, email:responseData.userWithImages.email,password:responseData.userWithImages.password,image:responseData.userWithImages.image,savedimage:responseData.userWithImages.savedimage,phone:responseData.userWithImages.phone,about:responseData.userWithImages.about,location:responseData.userWithImages.location,prof:responseData.userWithImages.prof})
   
   
   
   if (!response.ok) {
     throw new Error(responseData.message);
   } 
 
 } catch (err) {
  
 }

}

const {name,email,password,error,success} = values
const {phone,image,savedimage,about,location,prof} = allvalues
const init = (userId) =>{
 getprofile(userId)

}
useEffect(() =>{
    init(auth.userId)

},[])

const finallyupdate = async event=> {
 
 try {
  const formData = new FormData()
  formData.append('name',values.name)
  formData.append('email',values.email)
  formData.append('password',values.password)
  formData.append('phone',allvalues.phone)
  formData.append('prof',file)
  formData.append('location',allvalues.location)
  formData.append('about',allvalues.about)
 
 
   await sendRequest(
     `http://localhost:5000/api/users/${auth.userId}`,
     'PATCH',
     formData
   );
     
  
     alert("saved changes")
   

   
 } catch (err) {alert("nah bruh it didnt work")}
 
 
};

const clickSubmit = (e) =>{
  e.preventDefault()
    console.log(name)
    if (values.password.length<=5){
      alert("enter a new password greater than 5 characters")
    }
    else{
    console.log(values.name,values.email,values.password,allvalues.image,allvalues.savedimage,allvalues.phone)
    finallyupdate()}

}

const redirectUser = (success) =>{
    if(success){
        return <Redirect to="/"/>
    }
}

const handleChange = name => (e) =>{
    console.log(e.target.value)
    setValues({...values,error:false,[name]:e.target.value})
    setallValues({...values,error:false,[name]:e.target.value})

}

const profileUpdate = (name,email,password) =>{
    <form>
        <div className="form-group">
            <label className="text-muted">Name
            </label>
            <input type="text" onChange={handleChange("name")} className="form-control" value={name}/>
        </div>
        <div className="form-group">
            <label className="text-muted">Email
            </label>
            <input type="text" onChange={handleChange("email")} className="form-control" value={email}/>
        </div>
        <div className="form-group">
            <label className="text-muted">Password
            </label>
            <input type="text" onChange={handleChange("password")} className="form-control" value={password}/>
        </div>
       
        <Button type="submit" disabled={!formState.isValid}>
          Publish
        </Button>
        <button onClick={clickSubmit} disabled={false} className="btn btn-primary">
            Submit
        </button>
        <text>hi</text>
        
        {redirectUser(success)}
    </form>
}

return(
  <div>
    <div title="Profile" description="Update your profile" className="container-fluid">
     <h2 className="mb-4">Profile update</h2>
     <form>
        <div className="form-group">
            <label className="text-muted">Name
            </label>
            <input type="text" onChange={handleChange("name")} className="form-control" value={name}/>
        </div>
        <div className="form-group">
            <label className="text-muted">Email
            </label>
            <input type="text" onChange={handleChange("email")} className="form-control" value={email}/>
        </div>
        <div className="form-group">
            <label className="text-muted">New Password (at least 5 characters)
            </label>
            <input type="text" onChange={handleChange("password")} className="form-control" value={password} validators={[VALIDATOR_MINLENGTH(5)]}
              errorText="Please enter a valid password (at least 5 characters)."
              onInput={inputHandler}/>
        </div>
        <div className="form-group">
            <label className="text-muted">Phone
            </label>
            <input type="text" onChange={handleChange("phone")} className="form-control" value={phone}
              errorText="Please enter a valid phone #."
              onInput={inputHandler}/>
        </div>
        <div className="form-group">
            <label className="text-muted">Bio
            </label>
            <input type="text" onChange={handleChange("about")} className="form-control" value={about}
              onInput={inputHandler}/>
        </div>
        <div className="form-group">
            <label className="text-muted">Location
            </label>
            <input type="text" onChange={handleChange("location")} className="form-control" value={location}
              onInput={inputHandler}/>
        </div>
       <p>Choose a new profile pic</p>
            <div id="upload-box">
      <input type="file" onChange={handleUpload} />
     
    </div>
        <button onClick={clickSubmit} className="btn btn-primary">
            Submit
        </button>
    </form>
    </div>
    <div className='main'>
    <div className='personal-info'>
      {console.log(loadedImage)}
    
      <img className='profile-pic' src={`http://localhost:5000/${loadedImage}`} alt="new"/>
      
      <div className='flex-c'>
        <div className='personal-info-text'>
          <div className='col-1'>
            <h2>{loadedName}</h2>
            {loadedEmail}
           
          </div>
          <div className='col-2'>
            <div className='follow-stats'>
              <p>{loadedFollowers} Followers</p>
              <p>{loadedFollowing} Following</p>
            </div>
         
            {loadedLocation}
          </div>
        </div>
        <div className='personal-bio'>
            {loadedAbout}
        </div>
        <div className='profile-btn-wrapper'>
          <button className='edit-profile-btn'>Edit profile pic</button>
          <a href="http://localhost:3000/addart">Add new post</a> 
        </div>
      </div>
    </div>
   <hr/>
         {<MyArt/>}
   
   </div>
   </div>
)

  
  
};

export default Profile;