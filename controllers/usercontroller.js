const User = require('../models/User');
const bcrypt = require('bcrypt');
const generateTokenAndSetCookie = require('../services/generateToken');

module.exports.register = async (req, res) => {
    try {
        if (req.body) {
            const { email, name, password, cPass } = req.body;

            if (!email || !name || !password || !cPass) return res.status(400), json({ message: "required field Missing" })

            const user = await User.findOne({ email });
            if (user) return res.status(400).json({ message: "User already exist" });
            if (password !== cPass) return res.status(400), json({ message: "Password & confirm Password are not match" });

            const hassedpassword = await bcrypt.hash(password, 10);

            const newUser = new User({
                name: name,
                email: email,
                password: hassedpassword,
                isActive: true,
                currentDate: new Date().toLocaleString(),
                updateDate: new Date().toLocaleString()
            });
            await newUser.save();
            return res.status(201).json({ success: true, data: newUser, message: 'User created successfully' });

        } else {
            return res.status(400), json({ message: "Error accuired on form submit" })
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "internal server error" });
    }
}

module.exports.login = async (req, res) => {
    try {
        if (req.body) {
            const { email, password } = req.body;
            if (!email || !password) return res.status(400), json({ message: "required field Missing" })

            let user = await User.findOne({ email });
            if (!user) return res.status(400).json({ message: "User not found" });

            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(400).json({ message: 'Invalid password' });
            }
            // Generate a token and set it as a cookie
            const token = generateTokenAndSetCookie(user._id, res);
            if (!token) return res.status(400).json({ message: 'oken generation failed"' });

            return res.status(200).json({ token: token });
        } else {
            return res.status(400), json({ message: "Error accuired on form submit" })
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "internal server error" });
    }
}