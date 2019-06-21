import React, { useState, useContext } from 'react';
import ContactContext from '../../context/contact/contactContext'
import contactContext from '../../context/contact/contactContext';

const ContactForm = () => {
  const contactContext = useContext(ContactContext)

  const [contact, setContact] = useState({
    name: '',
    email: '',
    phone: '',
    type: 'personal'
  });

  const { name, email, phone, type } = contact;
  const onChange = e => setContact({ ...contact, [e.target.name]: e.target.value});

  const onSubmit = e => {
      e.preventDefault();
      contactContext.addContact(contact);
      setContact({
        name: '',
        email: '',
        phone: '',
        type: 'personal'
      })
  }

  return (
    <form onSubmit={onSubmit}>
      <h2 className='text-primary'>Add Contact</h2>
      <input
        type='text'
        placeholder='Name'
        value={name}
        name='name'
        onChange={onChange}
      />
      <input
        type='email'
        placeholder='Email'
        value={email}
        name='email'
        onChange={onChange}
      />
      <input
        type='text'
        placeholder='Phone'
        value={phone}
        name='phone'
        onChange={onChange}
      />
      <h4>Contact Type: </h4>
      <input
        type='radio'
        name='type'
        value='personal'
        checked={type === 'personal'}
        onChange={onChange}
      />{' '}Personal{' '}
      <input
        type='radio'
        name='type'
        value='professional'
        checked={type === 'professional'}
        onChange={onChange}
      />{' '}Professional
      <div>
        <input
          type='submit'
          value='Add Contact'
          className='btn btn-primary btn-block'
        
        />
      </div>
    </form>
  );
};

export default ContactForm;
