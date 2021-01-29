import React, {useContext, useState}from 'react';
import Navbar from 'react-bootstrap/Navbar';
import { Nav, Dropdown } from "react-bootstrap";
import {itemTotal} from "./cartHelpers"
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Nav.css';
import './styles.css'
import logo from "../assets/logo.PNG";
import {AuthContext} from "../context/auth-context"
import { artistsearch, list,mediums, stylesearch } from './apiCore';
import Modal from 'react-bootstrap/Modal';
import Feed from './Feed';
import UsersList from './UsersList';
const Navigation = () => { 
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [data,setData] = useState({
    categories:[],
    category:'',
    search:'',
    results:[],
    searched:false
  })

  const {results} = data;
  const auth = useContext(AuthContext)

  const handleChange = name => event =>{
    setData({...data,[name]:event.target.value, searched:false});
  }

  const searchedProducts = (results = []) =>{
    console.log(results)
    if (results.length && !results[0].email){
    return (
      <div className="row">
        {results.map(image => (
          <Feed
            key={image.id}
            id={image.id}
            image={image.url}
            url={image.url}
            likes={image.likes}
            peoplewholiked={image.peoplewholiked}
            title={image.title}
            description={image.description}
            address={image.address}
            creatorId={image.author}
            coordinates={image.location}
          />
        ))}
      </div>
      )}
      else{
        return (
          <div className="row">
            {<UsersList items={results} />}
          </div>
          )
      }
  }

  const searchData = () => {
    console.log(data.category)
    if(data.search || data.category){
      console.log(data.search)
      stylesearch({search:data.search || undefined, category:data.category})
      .then(response =>{
        if(response.error){
          console.log(response.error)
        } else{
          setData({...data,results:response,searched:true})
          console.log(response)
          if (response.length === 0){
            list({search:data.search || undefined, category:data.category})
            .then(response =>{
              if(response.error){
                console.log(response.error)
              } else{
                setData({...data,results:response,searched:true})
                console.log(response)
                if (response.length === 0){
                  mediums({search:data.search || undefined, category:data.category})
                  .then(response =>{
                    if(response.error){
                      console.log(response.error)        
                    } else {
                      setData({...data,results:response,searched:true})
                      console.log(response)
                      if (response.length === 0){
                        artistsearch({search:data.search || undefined, category:data.category})
                        .then(response =>{
                          if(response.error){
                            console.log(response.error) 
                          } else{
                            setData({...data,results:response,searched:true})
                            console.log(response)
                            if (response.length === 0){
                              console.log("hoiiiiiiiiiiiii")
                            }
                          }
                        })
                      }
                    }
                  })
                }
              }
            })
          }
        }
      })
    }
    handleShow();
  }

const searchSubmit = (e) =>{
  e.preventDefault()
  searchData()
}

const searchForm = () =>(
  <form className="nav-search-form" onSubmit={searchSubmit}>
  <div className="input-group-text">
    <div className="input-group input-group-lg">
      <div className="input-group-prepend">
          <select className="btn mr-2" onChange={handleChange("category")}>
            <option style={{color:"black"}} value="All">Pick Category</option>
            <option style={{color:"black"}}value="Abstract">Abstract</option>
            <option style={{color:"black"}}value="Figurative">Figurative</option>
            <option style={{color:"black"}}value="Geometric">Geometric</option>
            <option style={{color:"black"}}value="Minimalist">Minimalist</option>
            <option style={{color:"black"}}value="Nature">Nature</option>
            <option style={{color:"black"}}value="Pop">Pop</option>
            <option style={{color:"black"}}value="Portraiture">Portraiture</option>
            <option style={{color:"black"}}value="Still Life">Still Life</option>
            <option style={{color:"black"}}value="Surrealist">Surrealist</option>
            <option style={{color:"black"}}value="Typography">Typography</option>
            <option style={{color:"black"}}value="Urban">Urban</option>
            <option style={{color:"black"}}value="Others">Others</option>
          </select>
      </div>
      <input type="search" className="form-control" onChange={handleChange("search")} placeholder="search by artist, style..."></input>
    </div>
    <div className="btn input-group-append" style={{border:"none"}}>
      <button className="input-group-text">Search</button>
    </div>
  </div>
  </form>
)
   
return(
  <>
  <div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Search Results</Modal.Title>
        </Modal.Header>
        <Modal.Body>   {searchedProducts(results)}</Modal.Body>
        <Modal.Footer>
        </Modal.Footer>
      </Modal>

  <Navbar style = {{backgroundColor: "rgb(36,38,54)", fontFamily: "Roboto, sans-serif"}}  variant="light">
    <Dropdown>
    <Dropdown.Toggle style = {{borderColor: "rgb(36,38,54)", backgroundColor: "rgb(36,38,54)"}}  variant="success" >
    {/* <img style={{height:40, width:40}} src={sidebar} alt="Logo" /> */}
    </Dropdown.Toggle>

    <Dropdown.Menu  style = {{borderColor: "rgb(36,38,54)", backgroundColor: "rgb(36,38,54)"}}>
      <Dropdown.Item>
        <Link className='nav-links' to={auth.isLoggedIn ? '/profile' : '/login'}>My profile</Link>
      </Dropdown.Item>
      <Dropdown.Item>
        <Link className='nav-links' to='/about'>Messages</Link>
      </Dropdown.Item>
      <Dropdown.Item>
        <Link className='nav-links' to='/about'>Notifications</Link>
      </Dropdown.Item>
      <Dropdown.Item>
        <Link className='nav-links' to={auth.isLoggedIn ? '/purchases' : '/login'}>Purchase history</Link>
      </Dropdown.Item>
      <Dropdown.Item>
        <Link className='nav-links' to={auth.isLoggedIn ? '/sellingcenter' : '/login'}>Selling center</Link>
      </Dropdown.Item>
      <Dropdown.Item>
        <Link className='nav-links' to={auth.isLoggedIn ? '/settings' : '/login'}>Settings</Link>
      </Dropdown.Item>
      <Dropdown.Item>
        <Link className='nav-links' to='/about'>About</Link>
      </Dropdown.Item>
      
      <br></br>
      <br></br>
      
      {!auth.isLoggedIn &&
      (<Dropdown.Item>
        <Link className='nav-links' to='/signup'>Sign Up</Link>
      </Dropdown.Item>
      )}
      {!auth.isLoggedIn &&
      (<Dropdown.Item>
        <Link className='nav-links' to='/login'>Sign In</Link>
      </Dropdown.Item>
      )}
      
      {auth.isLoggedIn && (
      <Dropdown.Item>
        <Link className='nav-links' to='/' onClick={auth.logout}>Sign Out</Link>
      </Dropdown.Item>
      )}
      <br></br>
    </Dropdown.Menu>
  </Dropdown>
          
    <Link className='nav-links' to={auth.isLoggedIn ? '/' : '/login'}>
      <img style={{height:50, width:50}} src={logo} alt="Logo" />
    </Link>
    <Nav className="mr-auto">
        <Link className='nav-links' to={auth.isLoggedIn ? '/' : '/login'}>My Feed</Link>
        <Link className='nav-links' to={auth.isLoggedIn ? '/explore' : '/login'}>Explore</Link>
        <Link className='nav-links' to={auth.isLoggedIn ? '/currentbids' : '/login'}>Current Bids</Link>
        <Link className='nav-links' to={auth.isLoggedIn ? '/saved' : '/login'}>Saved</Link>
        <Link className='nav-links' to={auth.isLoggedIn ? '/nearme' : '/login'}>Near Me</Link>
        <Link className='nav-links' to={auth.isLoggedIn ? '/addart' : '/login'}>Add Art</Link>
    </Nav>
    <div className="row">
      <div style ={{color:"white"}}className="container">{searchForm()}
        <div className="container-fluid mb-3">
        </div>
      </div>
    </div>
   
    {auth.isLoggedIn && auth.userId != "5fef79391c01e059f13f3823" && (
      <Link className='nav-links' to='/cart'>Cart <sup><small className="cart-badge">{itemTotal()}</small></sup></Link>
    )}
    {auth.isLoggedIn && auth.userId === "5fef79391c01e059f13f3823" && (
      <Link className='nav-links' to='/admin'>Order Dashboard </Link>
    )}

{auth.isLoggedIn && auth.userId === "5fef79391c01e059f13f3823" && (
      <Link className='nav-links' to='/manage'>Manage Posts </Link>
    )}
    {auth.isLoggedIn && auth.userId === "5fef79391c01e059f13f3823" && (
      <Link className='nav-links' to='/managebids'>Manage Bids </Link>
    )}
  </Navbar>
  </div>
  </> 
  )
}

export default Navigation;
