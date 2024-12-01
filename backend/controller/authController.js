import { Doctor } from "../model/doctor.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken'

export const Login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(401).json({
                success: false,
                message: 'something is missing,Please cheack!'
            });
        }
        const user = await Doctor.findOne({ email });
        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'Incorrect email or password!'
            });
        }
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            res.status(401).json({
                success: false,
                message: 'Incorrect email or password!'
            });
        }
        const token = jwt.sign({
            userId: user._id
        },
            process.env.SECRET_KEY,
            {
                expiresIn: '1d'
            }
        );
        if (user.name === 'Host') {
            return res.cookie('token', token, { httpOnly: true, sameSite: 'strict', maxAge: 1 * 24 * 60 * 60 * 1000 }).json({
                success: true,
                message: `Welcome Master`,
                type: 'Admin',
                user
            });
        } else {
            return res.cookie('token', token, { httpOnly: true, sameSite: 'strict', maxAge: 1 * 24 * 60 * 60 * 1000 }).json({
                success: true,
                message: `Welcome Dr. ${user.name}`,
                type: 'User',
                user
            });
        }
    } catch (error) {
        console.log("error while Login", error);
        return res.status(500).json({
            success: false,
            message: error
        })
    }
}

export const logout = async (req, res) => {
    try {
        return res.status(200).cookie('token', "", { maxAge: 0 }).json({
            success: true,
            message: 'Logged out Successfully'
        })
    } catch (error) {
        console.log("error while logout", error);
        return res.status(500).json({
            success: false,
            message: 'logOut failed'
        })
    }
}