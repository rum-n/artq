import React from 'react';
import './styles.css';

class SellingCenter extends React.Component {
    constructor(props) {
    super(props)
    this.state = {
        render: false,
        render2: false
    }
    this.alertHi = this.alertHi.bind(this);
    this.Completed = this.Completed.bind(this);
    }
    
    alertHi() {
     this.setState({render: !this.state.render});
     this.setState({render2:false});
    }
    Completed() {
        this.setState({render2: !this.state.render2});
        this.setState({render: false});
       
       }
    
    render() {
      return(
      <div className="App">
        <button  style = {{position: 'absolute', left: '50%', top: '15%'}} className="btn btn-dark" onClick={this.alertHi}>In-Progress</button>
        <button  style = {{position: 'absolute', left: '40%', top: '15%'}} className="btn btn-dark" onClick={this.Completed}>Completed</button>
        {this.state.render2  &&  <h1 style = {{position: 'absolute', left: '50%', top: '35%'}}>Item 1 </h1>}
        {this.state.render && <h1 style = {{position: 'absolute', left: '50%', top: '35%'}}>Item 2</h1>}
       
      </div>
      );
     }
    }

export default SellingCenter;