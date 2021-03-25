import React, { useContext, useState, useEffect, useReducer, useCallback } from 'react';
import {useHttpClient} from "../components/hooks/http-hook"
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import {AuthContext} from "../context/auth-context";
import './settings.css';
import './NewArtForm.css';
import { VALIDATOR_MINLENGTH } from './util/validators';

const Settings = () => {
  
  let [followers, setfollowers] = useState("")
  let [likes, setlikes] = useState("")
  let [bids, setbids] = useState("")
  let [auction, setauction] = useState("")
  let [items, setitems] = useState("")
  const [notifications, setnotifications] = useState([])
  const { sendRequest } = useHttpClient();
  const auth = useContext(AuthContext)
  const [loadedName, setLoadedName] = useState();
  const [loadedEmail, setLoadedEmail] = useState();
  const [loadedId, setLoadedId] = useState();
  const [loadedPhone, setLoadedPhone] = useState();
  const [loadedImage, setLoadedImage] = useState();
  const [loadedAbout, setLoadedAbout] = useState();
  const [loadedFollowing, setloadedFollowing] = useState();
  const [loadedFollowers, setloadedFollowers] = useState();
  const [loadedLocation, setLoadedLocation] = useState();
  const userId = auth.userId

  const placeSubmitHandler = async (e) => {
    e.preventDefault()
    alert("Settings have been updated")
    try {
      const response = await fetch(
        `https://artq-api-rum-n.vercel.app/api/images/notifications/5fff516aa5ddb630731f4430`
      );
      const responseData = await response.json();
      setnotifications(responseData);
      let updatedfollowers = []
      let updatedlikes = []
      let updatedauction = []
      let updatedbids = []
      let updateditems = []
    
      if (followers === "No"){
        updatedfollowers = responseData.followers + (auth.userId)
      }
      if (likes === "No"){
        updatedlikes = responseData.likes.push(auth.userId)
      }
      if (bids === "No"){
        updatedbids = responseData.bids.push(auth.userId)
      }
      if (auction === "No"){
        updatedauction = responseData.auction.push(auth.userId)
      }
      if (items === "No"){
        updateditems = responseData.items.push(auth.userId)
      }
    
      await sendRequest(`https://artq-api-rum-n.vercel.app/api/images/notifications/5fff516aa5ddb630731f4430`,'PUT',JSON.stringify({
        followers:updatedfollowers,
        likes: updatedlikes,
        auction:updatedauction,
        bids:updatedbids,
        items:updateditems
      }),
      {
        'Content-Type':'application/json', Authorization: 'Bearer '+ auth.token
      })
    } catch(err) {
      console.log(err)
    }
  };

  const [file, setFile] = useState("");

  function handleUpload(event) {
    setFile(event.target.files[0]);
    handleChange("prof")

    // Add code here to upload file to server
    // ...
  }

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
        const response = await fetch(`https://artq-api-rum-n.vercel.app/api/users/${auth.userId}`);
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
      } catch (err) {
      
      }
    };
    sendRequest();
  });

  const [values,setValues] = useState({
    name:'',
    email:'',
    password:'',
    error:false,
    success:false
  });

  const [allvalues, setallValues] = useState({
    name:'',
    email:'',
    password:'',
    image: [],
    savedimage:[],
    phone:'',
    about:'',
    location:'',
    prof:''
  });

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
        `https://artq-api-rum-n.vercel.app/api/users/${auth.userId}`,
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
      const response =  await fetch(`https://artq-api-rum-n.vercel.app/api/users/${userId}`);
      const responseData = await response.json();
      setValues(
        { 
          ...values,
          name:responseData.userWithImages.name, 
          email:responseData.userWithImages.email,
          image:responseData.userWithImages.image,
          savedimage:responseData.userWithImages.savedimage,
          phone:responseData.userWithImages.phone, 
          about:responseData.userWithImages.about, 
          location:responseData.userWithImages.location,
          prof:responseData.userWithImages.prof
          })
      setallValues(
        {
          ...allvalues,
          name:responseData.userWithImages.name, 
          email:responseData.userWithImages.email,
          password:responseData.userWithImages.password,
          image:responseData.userWithImages.image,
          savedimage:responseData.userWithImages.savedimage,
          phone:responseData.userWithImages.phone,
          about:responseData.userWithImages.about,
          location:responseData.userWithImages.location,
          prof:responseData.userWithImages.prof
          })
      if (!response.ok) {
        throw new Error(responseData.message);
      } 
    } catch (err) {
      
    }
  };

  const {name,email,password,error,success} = values
  const {phone,image,savedimage,about,location,prof} = allvalues
  
  const init = (userId) =>{
    getprofile(userId)
  };

  useEffect(() =>{
      init(auth.userId)
  })

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
      `https://artq-api-rum-n.vercel.app/api/users/${auth.userId}`,
      'PATCH',
      formData
    );
      alert("saved changes")
  } catch (err) {alert("nah bruh it didnt work")}
  };

  const clickSubmit = (e) =>{
    e.preventDefault()
      if (values.password.length > 0 && values.password.length <=5){
        alert("enter a new password greater than 5 characters")
      }
      else{
      finallyupdate()}
  };

  const handleChange = name => (e) =>{
      console.log(e.target.value)
      setValues({...values,error:false,[name]:e.target.value})
      setallValues({...values,error:false,[name]:e.target.value})
  };

  return (
    <div className='settings-wrapper'>
      <div className='firstrow'>
        <div className='notifications-wrapper'>
        <h4>Notification Preferences</h4>

        <Form className='notifications-form' onSubmit={placeSubmitHandler}>
          <Form.Group as={Row}>
            <Form.Label column sm="4">New Followers</Form.Label>
            <Col sm="4">
              <Form.Control 
                as='select' 
                defaultValue="Choose..." 
                value={followers} 
                onChange={e => setfollowers(e.target.value)}>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
              </Form.Control>
            </Col>
          </Form.Group>

          <Form.Group as={Row}>
            <Form.Label column sm="4">New Likes</Form.Label>
            <Col sm="4">
              <Form.Control 
                as='select' 
                defaultValue="Choose..." 
                value={likes} 
                onChange={e => setlikes(e.target.value)}>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
              </Form.Control>
            </Col>
          </Form.Group>

          <Form.Group as={Row}>
            <Form.Label column sm="4">New bids</Form.Label>
            <Col sm="4">
              <Form.Control 
                as='select' 
                defaultValue="Choose..." 
                value={bids} 
                onChange={e => setbids(e.target.value)}>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
              </Form.Control>
            </Col>
          </Form.Group>

          <Form.Group as={Row}>
            <Form.Label column sm="4">Auction Results</Form.Label>
            <Col sm="4">
              <Form.Control 
                as='select' 
                defaultValue="Choose..." 
                value={auction} 
                onChange={e => setauction(e.target.value)}>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
              </Form.Control>
            </Col>
          </Form.Group>

          <Form.Group as={Row}>
            <Form.Label column sm="4">Items Sold</Form.Label>
            <Col sm="4">
              <Form.Control 
                as='select' 
                defaultValue="Choose..." 
                value={items} 
                onChange={e => setitems(e.target.value)}>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
              </Form.Control>
            </Col>
          </Form.Group>

          <Button variant='outline-dark' type="submit">Update</Button>
        </Form>
        </div>
        <div className='password-wrapper'>
        <h4>General</h4>
        
          <Form>
            <Form.Group>
              <Form.Label className="text-muted">Name</Form.Label>
              <Form.Control type="text" onChange={handleChange("name")} value={name}/>
            </Form.Group>
              <div className="form-group">
                  <label className="text-muted">Email
                  </label>
                  <input type="text" onChange={handleChange("email")} className="form-control" value={email}/>
              </div>
              <div className="form-group">
                  <label className="text-muted">New Password (at least 5 characters) or Type Current Password
                  </label>
                  <input type="text" onChange={handleChange("password")} className="form-control" value={password} validators={[VALIDATOR_MINLENGTH(5)]}
                    // errorText="Please enter a valid password (at least 5 characters)."
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
                  <div id="upload-box2">
                    <input type="file" onChange={handleUpload} />
                  </div>
              <Button onClick={clickSubmit} variant='outline-dark'>Update</Button>
          </Form>
        </div>
        <div className='address-wrapper'>
        <h4>Payment & Shipping</h4>
        <h5>Payment method</h5>
        <h5>Shipping address</h5>
        {allvalues.location}
          <Button variant='outline-dark'>Update</Button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
