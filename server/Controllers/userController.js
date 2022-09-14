const userModel = require('../Models/userModel')
const exerciseUserController = require('./exerciseUserController')
// const {getFirstLetter} = require('./letterController')
const letterController = require('./letterController')

const mongoose = require('mongoose')

const getUser = async (req, res) => {
    try {
        let userd = await userModel.findOne().and([ {userFirstName: req.params.name}, {password: req.params.pass}] )
        // let userd = await userModel.findOne({$and:[ {userFirstName: req.params.name}, {password: req.params.pass}] })
        console.log("getUser:  "+userd);
        console.log("type   " + typeof (userd.userBirthDate));
        console.log(userd.userBirthDate instanceof Date);
        if(userd != null){

            let r = await exerciseUserController.getState(userd._id)
            console.log("userd._id:  "+userd._id);
            console.log("getState    "+r);
            res.json({ user: userd, status: r })
        }
        else{
            res.send("x")
        }

        
    }
    catch (err) {
        res.send("x")
    }
}

const deleteUser = (req, res) => {

    let p = req.params.password

    userModel.findOneAndDelete({ password: p }).then(() => {
        res.send("delete")
    }).catch((err) => {
        //לא תופס את השגיאה
        res.send(err + ":(")
    })


} 
const createUser = async (req, res) => {
    try {
        let user = await req.body;
        console.log(user)
        let userd = await userModel.findOne({ userFirstName: user.userFirstName, password: user.password })
        console.log(userd)
        let firstLetter
        if (userd == null) {
            let newUser = await new userModel(user)
            await newUser.save()
            firstLetter = await letterController.getFirstLetter()
            console.log("newUser : "+newUser);
            res.json({ ok: firstLetter, u: newUser })
        }
        else {
            res.json({ no: "" })
        }
    }
    catch (err) {
        res.send(err)
    }
}

const check1 = (req, res) => {
    userModel.findOne({ name: req.params.name }).then((response) => {
        res.json({ user: response })

    }).catch()
}




module.exports = { getUser, deleteUser, createUser }

