import React, { useState, useEffect } from 'react';
import SearchBar from './SearchBar';
import ServicesList from './ServicesList';

function Home() {
  // const [address, setAddress] = useState('');
  const [showPrompt, setShowPrompt] = useState(false);

  useEffect(() => {
    const isPromptShown = localStorage.getItem('promptShown');

    if (!isPromptShown) {
      setShowPrompt(true);
      localStorage.setItem('promptShown', 'true');
    }
  }, []);

  if (showPrompt) {
    const userInput = prompt('Please enter your zipcode:');
    if (userInput) {
      localStorage.setItem('zipcode', userInput);
    }
    setShowPrompt(false);
  }

  const storedZip = localStorage.getItem('zipcode');

  return (
    <div>
      <div className="main_info">
        <div className="top_level_home">
          <div className="title_home">
            <div>
              Find the right
              {' '}
              <em>contractor</em>
            </div>
            <div>
              for you, right away
            </div>
          </div>
          <SearchBar zip={storedZip} />
          <div className="popular_services">
            <div className="popular_services_title">
              Popular services
            </div>
            <ServicesList />
          </div>
          {/* <CardList /> */}
        </div>
      </div>
    </div>
  );
}

export default Home;
