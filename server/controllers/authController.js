import User from '../models/userModel.js'
import jwt from 'jsonwebtoken'

const generateToken = (userId) => {
    return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: '1h' });
};

// Login User
export const loginUser = async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
        const token = generateToken(user._id);

        res.cookie('jwt', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production' });

        res.json({ message: 'Login successful' });
    } else {
        res.status(401).json({ message: 'Invalid email or password' });
    }
};

// Logout User
export const logoutUser = (req, res) => {
    res.cookie('jwt', '', { expires: new Date(0) });
    res.json({ message: 'Logged out' });
};