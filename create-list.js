require('dotenv').config();
const axios = require('axios');

const apiKey = process.env.MAILCHIMP_API_KEY;
const listId = process.env.MAILCHIMP_LIST_ID;

async function createList() {
  try {
    const response = await axios.post(
      `https://us12.api.mailchimp.com/3.0/lists`,
      {
        name: 'New List',
        contact: {
          company: 'Your Company',
          address1: '123 Main Street',
          city: 'City',
          state: 'State',
          zip: '12345',
          country: 'Country'
        },
        permission_reminder: 'You signed up for updates from our website.',
        campaign_defaults: {
          from_name: 'Your Name',
          from_email: 'yourname@example.com',
          subject: 'New List',
          language: 'en'
        },
        email_type_option: false
      },
      {
        headers: {
          Authorization: `apikey ${apiKey}`
        }
      }
    );

    console.log('List created successfully:', response.data);
  } catch (error) {
    console.error('Error creating list:', error.response.data);
  }
}

createList();
