import React, {useContext, useState} from "react";
import './styles.css';
import GetRealImages from "../components/OtherPeople'sArt/getRealImages";
import './homepage.css';
import Modal from 'react-bootstrap/Modal';

import {AuthContext} from "../context/auth-context"
import { artistsearch, list,mediums, stylesearch } from './../components/apiCore';

import Feed from './../components/Feed';
import UsersList from './../components/UsersList';

const Home = () => {
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
    <form className="feed-search" onSubmit={searchSubmit}>
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
          <input type="search" className="form-control" onChange={handleChange("search")}></input>
          </div>
          <div className="btn input-group-append" style={{border:"none"}}>
          <button className="input-group-text">Search</button>
        </div>
      </div>
    </form>
  )
  
  return (
    <React.Fragment>
        <div className='home-intro'>
          <h1 className='home-intro-title'>GET YOUR ARTWORK SEEN!</h1>
          <p>We help artists get more audience.</p>
          <p>We help you explore gorgeous art.</p>
          {searchForm()}

        </div>
        <div className="artwork-wrapper">
            <GetRealImages/>
        </div>

        <Modal size='lg' show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Search Results</Modal.Title>
          </Modal.Header>
          <Modal.Body>   {searchedProducts(results)}</Modal.Body>
          <Modal.Footer>
          </Modal.Footer>
        </Modal>

    </React.Fragment>
    );
  }

export default Home;