import React from 'react';

function SearchResult(contractor) {
  const {
    displayName, skills, profilePic, description, pricing,
  } = contractor;
  return (
    <div className="contractor_card">
      <div className="card_body">
        <img className="card_img" src={profilePic} alt="bro" />
        <h3 className="card_title">{displayName}</h3>
        <p className="card_description">{description}</p>
        <p className="card_pricing">
          From $
          {pricing}
        </p>
        <button type="button" className="card_btn">Message</button>
      </div>
    </div>
  );
}

export default SearchResult;
