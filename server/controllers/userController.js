import userModel from "../models/userModel.js"


const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await userModel.findOne({ email, password });
        if (!user) {
            return res.status(404).send('User not found');
        }

        res.status(200).json({
            success: true,
            data: user
        });

    } catch (error) {
        console.log(error)
        res.statu(400).json({
            success: false,
            data: error
        })
    }
}

const registerController = async (req, res) => {
    try {
        const newUser = new userModel(req.body);
        await newUser.save();
        res.status(201).json({
            success: true,
            data: newUser
        })
    } catch (error) {
        console.log(error)
        res.statu(400).json({
            success: false,
            data: error
        })
    }
}

export {
    loginController,
    registerController
}