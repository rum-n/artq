import React, { useState, useContext } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './SideNav.css';
import { Link, useHistory } from 'react-router-dom';
import {AuthContext} from "../context/auth-context";
import cartimg from "../assets/cart.png";
import {itemTotal} from "./cartHelpers"
import Modal from 'react-bootstrap/Modal';
import AddArtForm from './AddArtForm';

const SideNav = () => {
    const [ hover, setHover ] = useState(false);
    const [ show, setShow ] = useState(false);
    const auth = useContext(AuthContext);
    const [artstyle, setartstyle] = useState("");
    const [methodofbuying, setmethodofbuying] = useState("")
    
    const history = useHistory();

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const mouseOver = () => {
        setHover(true);
    };

    const mouseLeave = () => {
        setHover(false);
    };
    
    return (
        <div className='sidenav'>
            <ul>
                <li><Link to='/'>Followed</Link></li>
                <li><Link to='explore'>Explore</Link></li>
                <li><Link to='currentbids'>Current bids</Link></li>
                <li><Link to='saved'>Saved</Link></li>
                <li><Link to='nearme'>Near me</Link></li>
            </ul>
            
            <button className='add-art' disabled={auth.isLoggedIn ? false : true} onClick={handleShow}>Add Art <span>+</span></button>
            
            <Link to={auth.isLoggedIn ? '/cart' : 'signup'}>
                <img className="cart" src={cartimg}/>
                {/* <sup><small className="cart-badge">{itemTotal()}</small></sup> */}
            </Link>

            <Modal size='lg' show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Add art</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            
                <AddArtForm/>
                
            </Modal.Body>
            <Modal.Footer>
                <button className='intro-signup-btn' >Publish</button>
            </Modal.Footer>
            </Modal>
        </div>
    )
}

export default SideNav;