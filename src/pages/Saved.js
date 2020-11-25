import React, { useState } from "react";
import './styles.css';
import '../components/Feed';
import Feed from "../components/Feed";
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import CardDeck from 'react-bootstrap/CardDeck';

const Saved = () => {
  const [images] = useState();

    return (
      <React.Fragment>
        <h1 className='feed-title'>Here's your saved artwork:</h1>
        {/* <CardDeck>
        {images.map(painting => 
          <Col key={painting.id} xs={1} md={4}>
            <Card style={{ width: '25rem', marginBottom: '2rem' }}>
              <Card.Img src={painting.url} /> 
            </Card>
          </Col>)}
        </CardDeck> */}
      </React.Fragment>
    )
  }

export default Saved;