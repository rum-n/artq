import React from 'react';
import Feed from '../Feed';

const realimageslist = props => {
  
  return (
    
    <ul className="users-list">
     { console.log(props)}
      {props.items.map(user => (
        
        <Feed showAddToCartButton={true}
          key={user.id}
          likes={user.likes}
          peoplewholiked={user.peoplewholiked}
          status = {user.status}
          id={user.id}
          image={user.url}
          description={user.description}
          address={user.address}
          title={user.title}
          url={user.url}
          author={user.author}
          duration={user.duration}
          dimentions={user.dimentions}
          name={user.title}
          type={user.type}
          price={user.price}
          medium={user.medium}
          susa = {user.susa}
          tusa = {user.tusa}
          scanada = {user.scanada}
          tcanada = {user.tcanada}
          smexico = {user.smexico}
          tmexico = {user.tmexico}
          schina= {user.schina}
          tchina = {user.tchina}
          sindia = {user.sindia}
          tindia = {user.tindia}
          safrica = {user.safrica}
          tafrica = {user.tafrica}
          sasia = {user.sasia}
          tasia = {user.tasia}
          seurope = {user.seurope}
          teurope = {user.teurope}
          saustralia = {user.saustralia}
          taustralia = {user.taustralia}


        />
      ))}
    </ul>
  );
};

export default realimageslist;
