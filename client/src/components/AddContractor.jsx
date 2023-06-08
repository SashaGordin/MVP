import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import axios from 'axios';

const initialValues = {
  firstName: '',
  lastName: '',
  description: '',
  addressLine1: '',
  addressLine2: '',
  city: '',
  state: '',
  zip: '',
  displayName: '',
  pricing: '',
  profilePic: [],
  skills: [],
};

function AddContractor() {
  const [image, setImage] = useState('');
  const [imageURL, setImageURL] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [skills, setSkills] = useState([]);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const addSkill = (skill) => {
    setSkills((prevSkills) => [...prevSkills, skill]);
    initialValues.skills.push(skill);
    console.log(initialValues.profilePic);
    console.log(initialValues.firstName);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
    }
    if (e.key === 'Enter' && inputValue.trim() !== '') {
      addSkill(inputValue.trim());
      setInputValue('');
    }
  };

  const removeSkill = (index) => {
    setSkills((prevSkills) => prevSkills.filter((_, i) => i !== index));
    initialValues.skills = initialValues.skills.filter((_, i) => i !== index);
  };

  const onImageChange = (event) => {
    setImage(...event.target.files);
  };

  useEffect(() => {
    if (image.length < 1) return;
    const reader = new FileReader();
    console.log(image);
    reader.readAsDataURL(image);
    reader.onloadend = function () {
      const base64data = reader.result;
      axios.post('https://api.cloudinary.com/v1_1/daakpfwlp/upload', {
        file: base64data,
        upload_preset: 'RFPFEC',
        cloud_name: 'daakpfwlp',
      })
        .then((res) => {
          initialValues.profilePic.push('' + res.data.secure_url);
        })
        .catch((err) => {
          console.log(err);
        });
      setImageURL(URL.createObjectURL(image));
    };
  }, [image]);

  const formik = useFormik({
    initialValues,
    onSubmit: (values, { setSubmitting }) => {
      setSubmitting(false);
      axios.post('/contractors', values)
        .then(() => {
          console.log('posted');
        })
        .catch((err) => {
          console.log(err);
        });
    },
    validate: (values) => {
      const errors = {};
      if (!values.firstName) {
        errors.firstName = 'Required';
      }
      if (!values.lastName) {
        errors.lastName = 'Required';
      }
      return errors;
    },
  });

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
    }
  };

  return (
    <div>
      <div className="contractor_form">
        <form onSubmit={formik.handleSubmit}>
          <div className="form_item">
            <label className="form_label">
              Full Name
            </label>
            <div>
              <input type="text" {...formik.getFieldProps('firstName')} onKeyDown={handleKeyDown} />
              {formik.errors.firstName && <div>{formik.errors.firstName}</div>}
              <input type="text" {...formik.getFieldProps('lastName')} onKeyDown={handleKeyDown} />
              {formik.errors.lastName && <div>{formik.errors.lastName}</div>}
            </div>
          </div>
          <div className="form_item">
            <label className="form_label">
              Description
            </label>
            <div>
              <input type="text" {...formik.getFieldProps('description')} onKeyDown={handleKeyDown} />
            </div>
          </div>
          <div className="form_item">
            <label className="form_label">
              Display Name
            </label>
            <div>
              <input type="text" {...formik.getFieldProps('displayName')} onKeyDown={handleKeyDown} />
            </div>
          </div>
          <div className="form_item">
            <label className="form_label">
              Address
            </label>
            <div className="address_form">
              <input type="text" {...formik.getFieldProps('addressLine1')} onKeyDown={handleKeyDown} />
              <input type="text" {...formik.getFieldProps('addressLine2')} onKeyDown={handleKeyDown} />
              <div className="bottom_three">
                <input type="text" {...formik.getFieldProps('city')} onKeyDown={handleKeyDown} />
                <input type="text" {...formik.getFieldProps('state')} onKeyDown={handleKeyDown} />
                <input type="text" {...formik.getFieldProps('zip')} onKeyDown={handleKeyDown} />
              </div>
            </div>
          </div>
          <div className="form_item">
            <label htmlFor="file_input" className="custom_file_upload">
              <label className="form_label">
                Profile Pic
              </label>
              <input id="file_input" type="file" onChange={onImageChange} onKeyDown={handleKeyDown} />
              {image ? (<img className="photo" alt="profile asd" src={imageURL} />) : <span className="upload_icon" />}
            </label>
          </div>
          <div className="form_item">
            <label className="form_label">
              Skills
            </label>
            <div className="skills_input">
              <div className="skill_search">
                <input type="text" value={inputValue} onChange={handleInputChange} onKeyPress={handleKeyPress} placeholder="Add a skill" className="input_field" />
              </div>
              <div className="skill_container">
                {skills.map((skill, index) => (
                  <span key={index} className="skill">
                    {skill}
                    <button type="button" className="remove_button" onClick={() => removeSkill(index)}>
                      &times;
                    </button>
                  </span>
                ))}
              </div>
            </div>
          </div>
          <div className="form_item">
            <label className="form_label">
              Hourly Compensation
            </label>
            <div>
              <input type="text" {...formik.getFieldProps('pricing')} onKeyDown={handleKeyDown} />
            </div>
          </div>
          <button type="submit">Submit Form</button>
        </form>
      </div>
    </div>
  );
}

export default AddContractor;
