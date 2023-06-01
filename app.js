const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const mailchimp = require("@mailchimp/mailchimp_marketing");
const client = require("@mailchimp/mailchimp_marketing");
const debug = require('debug')('myapp');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')));

mailchimp.setConfig({
    apiKey: "2da7ddd71707dfc2c6fbdc0b767684d8-us12",
    server: "us12",
});

const run = async () => {
    const response = await client.lists.getAllLists('8d0cce172a');
    console.log(response);
}

app.post('/test', async (req, res) => {
    run();

    // const { firstName, lastName, email } = req.body;

    // // Make sure fields are filled
    // if (!firstName || !lastName || !email) {
    //     res.redirect('/fail.html');
    //     return;
    // }

    // // Construct req data
    // const data = {
    //     members: [
    //         {
    //             email_address: email,
    //             status: 'subscribed',
    //             merge_fields: {
    //                 FNAME: firstName,
    //                 LNAME: lastName
    //             }
    //         }
    //     ]
    // };

    // const postData = JSON.stringify(data);

    // fetch('https://usX.api.mailchimp.com/3.0/lists/8d0cce172a', {
    //     method: 'POST',
    //     headers: {
    //         Authorization: 'auth 2da7ddd71707dfc2c6fbdc0b767684d8-us12'
    //     },
    //     body: postData
    // })
    // .then(res.statusCode === 200 ?
    //     res.redirect('/success.html') :
    //     res.redirect('/fail.html'))
    // .catch(err => console.log(err))
})

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server started on ${PORT}`));