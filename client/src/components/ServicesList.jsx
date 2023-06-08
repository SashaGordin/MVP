import React from 'react';
import Service from './Service';

function ServicesList() {
  const services = [
    {
      name: 'Roofing',
      imageURL: 'https://media.angi.com/s3fs-public/Men-working-on-roof.jpg',
    },
    {
      name: 'Plumbing',
      imageURL: 'https://www.2sonsplumbing.com/images/Plumbers-Kenmore-WA.jpg',
    },
    {
      name: 'HVAC',
      imageURL: 'https://thumbor.forbes.com/thumbor/fit-in/x/https://www.forbes.com/home-improvement/wp-content/uploads/2022/07/featured-image-hvac-contractor.jpeg',
    },
    {
      name: 'Landscaping',
      imageURL: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQiYJDtIDBNIwbL6XPA8EposH9Jk2gW8umqCA&usqp=CAU',
    },
  ];
  return (
    <div className="ps_wrapper">
      {services.map((service) => (
        // eslint-disable-next-line react/jsx-props-no-spreading, no-underscore-dangle
        <Service {...service} />
      ))}
    </div>
  );
}

export default ServicesList;
