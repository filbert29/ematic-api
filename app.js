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

const createList = async () => {
    try {
        const response = await client.lists.createList({
            name: "name",
            permission_reminder: "permission_reminder",
            email_type_option: true,
            contact: {
                company: "company",
                address1: "address1",
                city: "city",
                country: "country",
                state: "state",
                zip: "12332"
            },
            campaign_defaults: {
                from_name: "from_name",
                from_email: "Beulah_Ryan@hotmail.com",
                subject: "subject",
                language: "language",
            },
        });
        console.log(response);
        res.redirect('/success.html')
    } catch (err) {
        console.log(err.response.body)
    }
}


app.post('/createList', async (req, res) => {
    createList();
})

app.get('/getMembers', async (req, res) => {
    const IdList = await client.lists.getAllLists();

    const response = await client.lists.getListMembersInfo(IdList.lists[0].id);
    console.log(response.members);
    res.json(response.members);
})

app.get('/getIdList', async (req, res) => {
    const response = await client.lists.getAllLists();
    console.log(response.lists[0].id);
})

app.post('/addContact', async (req, res) => {
    const IdList = await client.lists.getAllLists();

    const { firstName, lastName, email } = req.body;

    const data = {
        members: [
            {
                email_address: email,
                status: 'subscribed',
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName
                }
            }
        ]
    };

    console.log(data)

    // try {
    //     const response = await client.lists.batchListMembers(IdList.lists[0].id, data);
    //     console.log(response);
    // } catch (err) {
    //     console.log(err.response.body)
    // }
})

app.post('/changeDataMember', async (req, res) => {
    const IdList = await client.lists.getAllLists();

    const { firstName, lastName, email, idMember } = req.body;

    try {
        const response = await client.lists.updateListMember(IdList.lists[0].id, email, {
            merge_fields: {
                FNAME: firstName,
                LNAME: lastName,
            },
        });
        console.log(response);
    } catch (err) {
        console.log(err.response.body)
    }
})

app.post('/unSubscribe', async (req, res) => {
    const IdList = await client.lists.getAllLists();

    const { email } = req.body;

    try {
        const response = await client.lists.updateListMember(IdList.lists[0].id, email, {
            status: 'unsubscribed',
        });
        console.log(response);
    } catch (err) {
        console.log(err.response.body)
    }
})

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server started on ${PORT}`));