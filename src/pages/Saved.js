import React, { useState } from "react";
import './styles.css';
import '../components/Feed';
import Feed from "../components/Feed";
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import CardDeck from 'react-bootstrap/CardDeck';
import GetSavedImages from '../components/UserSavedArt/getSavedImages'

const Saved = () => {
  const [images] = useState();

    return (
      <React.Fragment>
        <h1 className='feed-title'>Here are your saved artworks:</h1>
        <p className='feed-title'>Add more from your feed page</p>
        {/* <CardDeck>
        {images.map(painting => 
          <Col key={painting.id} xs={1} md={4}>
            <Card style={{ width: '25rem', marginBottom: '2rem' }}>
              <Card.Img src={painting.url} /> 
            </Card>
          </Col>)}
        </CardDeck> */}
        <GetSavedImages/>
      </React.Fragment>
    )
  }

export default Saved;