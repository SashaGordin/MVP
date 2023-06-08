import React from 'react';

function Service(service) {
  const {
    name, imageURL,
  } = service;
  console.log(imageURL);
  return (
    <div className="contractor_card">
      <img className="card_img" src={imageURL} alt="bro" />
    </div>
  );
}

export default Service;
