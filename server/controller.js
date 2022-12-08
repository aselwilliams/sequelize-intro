const Sequelize = require('sequelize');
require('dotenv').config();
const {CONNECTION_URI} = process.env;

const sequelize = new Sequelize(CONNECTION_URI, {
    dialect:'postgres',
    dialectOptions: {
        ssl: {
            rejectUnauthorized: false
        }
    }
})
let userID = 4;
let clientID = 3;

module.exports = {
    getUserInfo: (req, res)=> {
        sequelize.query(`SELECT * from cc_clients AS c
        JOIN cc_users AS u
        ON c.user_id = u.user_id
        WHERE u.user_id = ${userID};`
        )
        .then(dbRes=> {
            console.log(dbRes[0])
            res.status(200).send(dbRes[0])
        })
        .catch(err => console.log(err))
    },
    updateUserInfo: (req, res)=> {
        console.log(req.body)
        let {
            firstName,
            lastName,
            phoneNumber,
            email,
            address,
            city,
            state,
            zipCode,
        } = req.body

        sequelize.query(`
        UPDATE cc_users set 
            first_name = '${firstName}',
            last_name ='${lastName}',
            email ='${email}',
            phone_number = ${phoneNumber}
            where user_id = ${userID};
         UPDATE cc_clients SET
            address = '${address}',
            city = '${city}',
            state='${state}',
            zip_code =${zipCode}
            where user_id = ${userID}`
         )
         .then(()=>res.sendStatus(200))
         .catch(err=>console.log(err))

    },
    getUserAppt: (req, res)=> {
        sequelize.query(`
        SELECT * FROM cc_appointments
        WHERE client_id = ${clientID}
        ORDER BY date DESC;`
        )
        .then(dbRes=> {
            res.status(200).send(dbRes[0])
        })
        .catch(err=>colsole.log(err))
    }
}