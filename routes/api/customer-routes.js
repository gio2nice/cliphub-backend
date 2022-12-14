const express = require('express');
const { Customer } = require('../../models');
const router = express.Router();
const app = express();
const bcrypt = require('bcrypt');

// find all customers
router.get('/', (req, res) => {


    Customer.findAll()
        .then(data => {
            res.status(200).json(data)
        }).catch(err => {
            console.log(err)
            res.status(500).json({ err, msg: 'error occured' })
        })

})

// create a customer
router.post('/', async (req, res) => {
    // if(!req.session.loggedIn){
    //     res.status(403).json({msg:"must login first!"})
    // }
    try {
        const newCustomer = await Customer.create({
            ...req.body,
        });

        res.status(200).json(newCustomer);
    } catch (err) {
        res.status(400).json(err);
    }
});

//find one customer
router.get("/:id", (req, res) => {
    // if(!req.session.loggedIn){
    //     res.status(403).json({msg:"must login first!"})
    // }
    Customer.findOne({
        where: {
            id: req.params.id
        }
    }).then(data => {
        res.json(data)
    }).catch(err => {
        res.status(500).json({ msg: "this man does not exist", err })
    })
})

//delete a customer
router.delete('/:id', async (req, res) => {
    // if(!req.session.loggedIn){
    //     res.status(403).json({msg:"must login first!"})
    // }
    try {
        const customerData = await Customer.destroy({
            where: {
                id: req.params.id
                // customerId: req.session.customerId,
            },
        });

        if (!customerData) {
            res.status(404).json({ message: "No client found with this id" })
            return;
        }

        res.status(200).json(customerData);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Update profile
// router.put('/:id', (req, res) => {
//     Customer.update({
//         name: req.body.customer_name,
//         password: req.body.customer_password,
//         phone_number: req.body.customer_phone_number
//     }).then(data => {
//         res.json(data)
//     }).catch(err => {
//         res.status(500).json({ msg: "sheesh, it ain't work", err })
//     })
// })
router.put('/update/:id',(req,res)=>{
    const promise = Customer.findByIdAndUpdate(req.body.name, req.body.password, req.body.phone_number);
    promise.then((data)=>{
      res.json(data);
    }).catch((err)=>{
      res.json(err);
    })
  })

//log in
router.post("/login", (req, res) => [
    Customer.findOne({
        where: {
            email: req.body.email
        }
    }).then(foundCustomer => {
        console.log(foundCustomer)
        if (!foundCustomer) {
            return res.status(401).json({ msg: "invalid login credentials!" })
        }
        if (!bcrypt.compareSync(req.body.password, foundCustomer.password)) {
            return res.status(401).json({ msg: "invalid login credentials!" })
        }
        req.session.save(() => {
            req.session.id = foundCustomer.id;
            req.session.loggedIn = true;

            res.json({ barber: foundCustomer, message: "You are now logged in!" });
        });

    }).catch(err => {
        console.log(err)
        res.status(500).json({ msg: "an error occurred", err })
    })
])

//log out
// router.post('/logout', (req, res) => {
//     if (req.session.loggedIn) {
//         req.session.destroy(() => {
//             req.status(404).end();
//         });
//     } else {
//         res.status(404).end();
//     }
// });

router.post('/logout', (req, res) => {
    if (req.session.loggedIn) {
        req.session.destroy(() => {
            res.status(200).json({ msg: 'logged out!' });
        });
    } else {
        res.status(401).json({ msg: "you must be logged in!" });
    }
});

// module.exports
module.exports = router;
