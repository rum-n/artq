import React from "react";
import './styles.css';
import '../components/Feed';
import GetSavedImages from '../components/UserSavedArt/getSavedImages'

const Saved = () => {

    return (
      <React.Fragment>
        <h1 className='feed-title'>Here are your saved artworks:</h1>
        <p className='feed-title'>Add more from your feed page</p>
        <GetSavedImages/>
      </React.Fragment>
    )
  }

export default Saved;