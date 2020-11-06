import React from 'react';
import { ToggleButton } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Switch from 'react-input-switch';


//Lot of redundant code i know D: ...i'll fix it

class NameForm extends React.Component {
    constructor(props) {
      super(props);
      this.state = {username: '',password: '',email: '', nmessages: false,
      nfollowers: false, nlikes: false, nbids: false, nauction: false, 
      nsold: false,emessages: false,
      efollowers: false, elikes: false, ebids: false, eauction: false, 
      esold: false, freq:false};
      this.nmessages = this.nmessages.bind(this);
      this.nfollowers = this.nfollowers.bind(this);
      this.nlikes = this.nlikes.bind(this);
      this.nbids = this.nbids.bind(this);
      this.nauction = this.nauction.bind(this);
      this.nsold = this.nsold.bind(this);
      this.emessages = this.emessages.bind(this);
      this.efollowers = this.efollowers.bind(this);
      this.elikes = this.elikes.bind(this);
      this.ebids = this.ebids.bind(this);
      this.eauction = this.eauction.bind(this);
      this.esold = this.esold.bind(this);
      this.freq = this.freq.bind(this);
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    handleChange(event) {
      this.setState({username: event.target.username,password: event.target.password,email: event.target.email});
    }
    freq() {
        this.setState(prevState => ({
          freq: !prevState.freq
        }));
      }
    nmessages() {
        this.setState(prevState => ({
          nmessages: !prevState.nmessages
        }));
      }
    nfollowers() {
        this.setState(prevState => ({
          nfollowers: !prevState.nfollowers
        }));
      }
    nlikes() {
        this.setState(prevState => ({
          nlikes: !prevState.nlikes
        }));
      }
    nbids() {
        this.setState(prevState => ({
          nbids: !prevState.nbids
        }));
      }
    nauction() {
        this.setState(prevState => ({
          nauction: !prevState.nauction
        }));
      }
    nsold() {
        this.setState(prevState => ({
          nsold: !prevState.nsold
        }));
      }
    emessages() {
        this.setState(prevState => ({
          emessages: !prevState.emessages
        }));
      }
    efollowers() {
        this.setState(prevState => ({
          efollowers: !prevState.efollowers
        }));
      }
    elikes() {
        this.setState(prevState => ({
          elikes: !prevState.elikes
        }));
      }
    ebids() {
        this.setState(prevState => ({
          ebids: !prevState.ebids
        }));
      }
    eauction() {
        this.setState(prevState => ({
          eauction: !prevState.eauction
        }));
      }
    esold() {
        this.setState(prevState => ({
          esold: !prevState.esold
        }));
      }
    
    handleSubmit(event) {
      alert('Edit Saved: ');
      event.preventDefault();
    }
  
    render() {
      return (
          
          <div >
               
              
              <h2 style={{display: 'flex', justifyContent: 'flex-start'}}>General</h2>
        <form style={{display: "flex",flexFlow: "column",justifyContent: "center"}} onSubmit={this.handleSubmit}>
            <div style={{display: 'flex', justifyContent: 'flex-end'}}>
          <label >
            Username:
            <input type="text" value={this.state.username} onChange={this.handleChange} />
          </label >

          
          <input className="btn btn-dark" type="submit" value="Submit" />
          </div>
          

          <br></br>
          <div style={{display: 'flex', justifyContent: 'flex-end'}}>
          <label>
            Password: 
            <input type="text" value={this.state.password} onChange={this.handleChange} />
          </label>
          <input  className="btn btn-dark" type="submit" value="Submit" />
          
          </div >
          <br></br>     
          <div style={{display: 'flex', justifyContent: 'flex-end'}}>
          <label>
            Email:
            <input type="text" value={this.state.email} onChange={this.handleChange} />
          </label>
          <input className="btn btn-dark" type="submit" value="Submit" />
          </div>
          
        </form>
        
        <div>
        <h2 style = {{display: 'flex',justifyContent: 'flex-start'}}>Notification Preferences</h2>
        <text>Type</text>
        <text style={{position: 'absolute', left: '35%', top: '50%'}}>Frequency</text> 
        <div style={{position: 'absolute', left: '35%', top: '55%'}}>
      <button onClick={this.freq} disabled={this.state.freq}>daily</button>
      <button onClick={this.freq} disabled={!this.state.freq}>weekly</button>
    </div>
        <text style={{position: 'absolute', left: '55%', top: '50%'}}> Notification</text>
        <text style={{position: 'absolute', left: '80%', top: '50%'}}>Email</text>
        <div style = {{display: 'flex',justifyContent: 'flex-start'}}>
        <h4>New Messages </h4>  <div style={{position: 'absolute', left: '55%', top: '55%'}}>
      <button onClick={this.nmessages} disabled={this.state.nmessages}>yes</button>
      <button onClick={this.nmessages} disabled={!this.state.nmessages}>no</button>
    </div>
    <div style={{position: 'absolute', left: '80%', top: '55%'}}>
      <button onClick={this.emessages} disabled={this.state.emessages}>yes</button>
      <button onClick={this.emessages} disabled={!this.state.emessages}>no</button>
    </div>
    </div>
        <br></br>
        <div style = {{display: 'flex',justifyContent: 'flex-start'}}>
        <h4>New Followers</h4>  <div style={{position: 'absolute', left: '55%', top: '65%'}}>
      <button onClick={this.nfollowers} disabled={this.state.nfollowers}>yes</button>
      <button onClick={this.nfollowers} disabled={!this.state.nfollowers}>no</button>
      </div>
      <div style={{position: 'absolute', left: '80%', top: '65%'}}>
      <button onClick={this.efollowers} disabled={this.state.efollowers}>yes</button>
      <button onClick={this.efollowers} disabled={!this.state.efollowers}>no</button>
    </div>
    </div>   
        <br></br>
        <div style = {{display: 'flex',justifyContent: 'flex-start'}}>
        <h4>New likes/comments</h4><div div style={{position: 'absolute', left: '55%', top: '75%'}}>
      <button onClick={this.nlikes} disabled={this.state.nlikes}>yes</button>
      <button onClick={this.nlikes} disabled={!this.state.nlikes}>no</button>
      </div>
      <div style={{position: 'absolute', left: '80%', top: '75%'}}>
      <button onClick={this.elikes} disabled={this.state.elikes}>yes</button>
      <button onClick={this.elikes} disabled={!this.state.elikes}>no</button>
    </div>
    </div>
    
        <br></br>
        <div style = {{display: 'flex',justifyContent: 'flex-start'}}>
        <h4>New bids</h4><div div style={{position: 'absolute', left: '55%', top: '85%'}}>
      <button onClick={this.nbids} disabled={this.state.nbids}>yes</button>
      <button onClick={this.nbids} disabled={!this.state.nbids}>no</button>
    </div>
    <div style={{position: 'absolute', left: '80%', top: '85%'}}>
      <button onClick={this.ebids} disabled={this.state.ebids}>yes</button>
      <button onClick={this.ebids} disabled={!this.state.ebids}>no</button>
    </div>
    </div>
        <br></br>
        <div style = {{display: 'flex',justifyContent: 'flex-start'}}>
        <h4>Aution results</h4><div div style={{position: 'absolute', left: '55%', top: '95%'}}>
      <button onClick={this.nauction} disabled={this.state.nauction}>yes</button>
      <button onClick={this.nauction} disabled={!this.state.nauction}>no</button>
    </div>
    <div style={{position: 'absolute', left: '80%', top: '95%'}}>
      <button onClick={this.eauction} disabled={this.state.eauction}>yes</button>
      <button onClick={this.eauction} disabled={!this.state.eauction}>no</button>
    </div>
    </div>
        <br></br>
        <div style = {{display: 'flex',justifyContent: 'flex-start'}}>
        <h4>Item sold</h4><div div style={{position: 'absolute', left: '55%', top: '105%'}}>
      <button onClick={this.nsold} disabled={this.state.nsold}>yes</button>
      <button onClick={this.nsold} disabled={!this.state.nsold}>no</button>
    </div>
    <div style={{position: 'absolute', left: '80%', top: '105%'}}>
      <button onClick={this.esold} disabled={this.state.esold}>yes</button>
      <button onClick={this.esold} disabled={!this.state.esold}>no</button>
    </div>
    </div>
        <br></br>
       
        </div>
        </div>
        
        
      );
    }
  }
  export default NameForm