import express from 'express'; 
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import User from '../models/user.js';

const router = express.Router(); 

// Registration Route
router.post('/register', async(req, res)=>{
    const {email, username, password} = req.body; 

    try{
        const user = new User({username, email, password}); 
        await user.save(); 
        res.status(201).send('User Registered');
    } catch(error){
        res.status(400).send(error.message); 
    }
})

// Login Route
router.post('/login', async (req, res)=>{
    const {username, password} = req.body; 

    try{
        const user = await User.findOne({username}); 
        if(!user || !await bcrypt.compare(password, user.password)){
            return res.status(401).send('Invalid Credentials');
        }
        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET); 
        res.send({token});
    } catch(error){
        res.status(400).send(error.message);
    }
})

export default router; 