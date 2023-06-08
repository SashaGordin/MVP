import React from 'react';

function Service(service) {
  const {
    name, imageURL,
  } = service;
  return (
    <div className="contractor_card">
      <img className="ps_card_img" src={imageURL} alt="bro" />
      <div className="overlay">
        <div>{name}</div>
      </div>
    </div>
  );
}

export default Service;
