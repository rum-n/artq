import React,{useContext,useState,useEffect,Redirect} from "react";
// import auth0Client from './../Auth';
// import { useAuth0 } from "@auth0/auth0-react";
import {AuthContext} from "../context/auth-context";
// import UsersList from '../components/UsersList';
import {useHttpClient} from "../components/hooks/http-hook"
import MyArt from "./MyArt"
import './profile.css';

const Profile = () => {
  const{sendRequest,clearError,theresponse} = useHttpClient();
  const [loadedImages, setLoadedImages] = useState();
  const [loadedName, setLoadedName] = useState();
  const [loadedEmail, setLoadedEmail] = useState();
  const [loadedId, setLoadedId] = useState();
  const [loadedPhone, setLoadedPhone] = useState();
  const [loadedImage, setLoadedImage] = useState();
  const auth = useContext(AuthContext);
  const userId = auth.userId
  console.log("auth.userid "+auth.userId)

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
        setLoadedImage(responseData.userWithImages.image)
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
 phone:''

})

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
   setValues({...values,name:responseData.userWithImages.name, email:responseData.userWithImages.email,password:responseData.userWithImages.password,image:responseData.userWithImages.image,savedimage:responseData.userWithImages.savedimage,phone:responseData.userWithImages.phone})
   setallValues({...allvalues,name:responseData.userWithImages.name, email:responseData.userWithImages.email,password:responseData.userWithImages.password,image:responseData.userWithImages.image,savedimage:responseData.userWithImages.savedimage,phone:responseData.userWithImages.phone})
   
   
   
   if (!response.ok) {
     throw new Error(responseData.message);
   } 
 
 } catch (err) {
  
 }

}

const {name,email,password,error,success} = values
const {phone,image,savedimage} = allvalues
const init = (userId) =>{
 getprofile(userId)

}
useEffect(() =>{
    init(auth.userId)

},[])

const finallyupdate = async event=> {
 
 try {
 
   await sendRequest(
     `http://localhost:5000/api/users/${auth.userId}`,
     'PATCH',
     JSON.stringify({
         
         name : values.name,
         email: values.email,
         password:values.password,
         image:allvalues.image,
         savedimage:allvalues.savedimage,
         phone:allvalues.phone
 }),
     {
       'Content-Type': 'application/json',Authorization: 'Bearer '+auth.token
     }
   );
  
     alert("saved changes")

   
 } catch (err) {alert("nah bruh it didnt work")}
 
};

const clickSubmit = (e) =>{
    console.log(name)
    e.preventDefault()
    console.log(values.name,values.email,values.password,allvalues.image,allvalues.savedimage,allvalues.phone)
    finallyupdate()

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
        <button onClick={clickSubmit} className="btn btn-primary">
            Submit
        </button>
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
            <label className="text-muted">Password
            </label>
            <input type="text" onChange={handleChange("password")} className="form-control" value={password}/>
        </div>
        <button onClick={clickSubmit} className="btn btn-primary">
            Submit
        </button>
    </form>
    </div>
    <div className='main'>
    <div className='personal-info'>
      <img className='profile-pic' src="https://images.pexels.com/photos/20787/pexels-photo.jpg?auto=compress&cs=tinysrgb&h=350" alt="new"/>
      <div className='flex-c'>
        <div className='personal-info-text'>
          <div className='col-1'>
            <h2>{loadedName}</h2>
            {loadedEmail}
            <p>Painter</p>
          </div>
          <div className='col-2'>
            <div className='follow-stats'>
              <p>101 Followers</p>
              <p>121 Following</p>
            </div>
            <p>Based in San Francisco, CA</p>
          </div>
        </div>
        <div className='personal-bio'>
          <p>Self-thaught painter // Take a look at my work</p>
        </div>
        <div className='profile-btn-wrapper'>
          <button className='edit-profile-btn'>Edit profile</button>
          <button className='add-new-post-btn'>Add new post</button>
        </div>
      </div>
    </div>
   <hr/>
         {<MyArt/>}
   
   </div>
   </div>
)

  
   return (
    <div className='main'>
      <div className='personal-info'>
        <img className='profile-pic' src="https://images.pexels.com/photos/20787/pexels-photo.jpg?auto=compress&cs=tinysrgb&h=350" alt="new"/>
        <div className='flex-c'>
          <div className='personal-info-text'>
            <div className='col-1'>
              <h2>{loadedName}</h2>
              {loadedEmail}
              <p>Painter</p>
            </div>
            <div className='col-2'>
              <div className='follow-stats'>
                <p>101 Followers</p>
                <p>121 Following</p>
              </div>
              <p>Based in San Francisco, CA</p>
            </div>
          </div>
          <div className='personal-bio'>
            <p>Self-thaught painter // Take a look at my work</p>
          </div>
          <div className='profile-btn-wrapper'>
            <button className='edit-profile-btn'>Edit profile</button>
            <button className='add-new-post-btn'>Add new post</button>
          </div>
        </div>
      </div>
     <hr/>
           {<MyArt/>}
     
     </div>
   )
};

export default Profile;