const NodeGeocoder = require('node-geocoder');
const Contractor = require('../db');
require('dotenv').config();

const options = {
  provider: 'google',
  apiKey: process.env.GOOGLE_API_KEY,
};

const geocoder = NodeGeocoder(options);

const addContractor = (info, callback) => {
  console.log(info);
  const {
    firstName, lastName, addressLine1, addressLine2, city, state, zip,
    displayName, profilePic, skills, description, pricing,
  } = info;
  const address = `${addressLine1} ${addressLine2} ${city}, ${state} ${zip}`;
  geocoder.geocode(address)
    .then(((response) => {
      if (response.length > 0) {
        const { latitude, longitude } = response[0];
        console.log(latitude, longitude);
        const contractorData = {
          firstName,
          lastName,
          addressLine1,
          addressLine2,
          city,
          state,
          zip,
          displayName,
          description,
          profilePic,
          pricing,
          skills,
          location: {
            type: 'Point',
            coordinates: [longitude, latitude],
          },
        };
        const data = new Contractor(contractorData);
        data.save()
          .then(() => {
            console.log('saved');
            callback(null);
          })
          .catch((err) => {
            console.log('error');
            callback(err);
          });
      }
    }))
    .catch((err) => {
      callback(err);
    });
};

const getContractors = (zip, searchTerm, callback) => {
  geocoder.geocode(zip)
    .then((response) => {
      if (response.length > 0) {
        const { latitude, longitude } = response[0];
        const query = {
          $and: [
            { skills: { $in: [searchTerm] } },
            {
              location: {
                $nearSphere: {
                  $geometry: {
                    type: 'Point',
                    coordinates: [longitude, latitude],
                  },
                },
              },
            },
          ],
        };
        // Contractor.find({
        //   location: {
        //     $nearSphere: {
        //       $geometry: {
        //         type: 'Point',
        //         coordinates: [longitude, latitude],
        //       },
        //     },
        //   },
        // })
        Contractor.find(query)
          .limit(4)
          .exec()
          .then((results) => {
            console.log(results);
            callback(null, results);
          })
          .catch((err) => {
            callback(err, null);
          });
        // .toArray((err, contractors) => {
        //   if (err) {
        //     callback(err, null);
        //   } else if (contractors.length > 0) {
        //     console.log(contractors);
        //   // callback(null, contractors);
        //   } else {
        //     console.log('No places found');
        //   }
        // });
      }
    });
};

module.exports = { addContractor, getContractors };
