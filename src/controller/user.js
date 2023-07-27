import bcrypt from "bcrypt";
// import User from "../../services/User.js";
import UserServices from "../services/user";


const { 
    updateUser, 
    findById, 
    checkUsername, 
    getUsers, 
    findUser, 
    deleteUser, 
    createUser 
} = UserServices;

export default class UserController {
    static async createNewUser (req, res) {
        try {
            const { username, email, password } =req.body;
            if(!username || !email || !password) {
                return res.status(400).json({success: false, error: "One or more parameters are missing"})
            };
            const checkEmail = await findUser(email);
            const usernameExist = await checkUsername(username);
            if(usernameExist || checkEmail) {
                return res.status(409).json({ status: 409, 
                error: "Sorry, email or username already taken by another user."
                });
            };
            const hash = await bcrypt.hash(password, 10);
            const userDetails = { username, email, password: hash };
            const newUser = await createUser(userDetails);
            if(newUser) {
                return res.status(201).json({
                    success: true,
                    message: "New User Created Successfully",
                    data: newUser
                });
            };
        } catch (error) {
            return res.status(500).json({
                success: false,
                error: "Server Error"
            });
        }
    };

//...

static async getOneUserById (req, res) {
    try {
        const { _id } = req.params;
        const getUser = await findById(_id);
    if(getUser) {
        return res.status(200).json({
            success: true,
            message: "User retrieved!",
            data: getUser
        })
    }
    return res.status(404).json({
        success: false,
        error: "User not found!"
    });
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: "Server Error"
        })
    }
};
//...

static async getAllUsers (req, res) {
    try {
        const users = await getUsers();
        if(users) {
            return res.status(200).json({ 
                success: true, 
                message: "All Users Retrieved Successfully", 
                count: users.length,
                data: users 
            });
        };
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: "Server Error"
        });
    };
};
//...

static async updateUser (req, res) {
    try {
        const { _id } = req.params;
        const { address, phoneNumber, lastName, firstName } = req.body;
        const updateDetails = { address, phoneNumber, lastName, firstName }
        const updateUserDetails = await updateUser(_id, updateDetails);
        if(updateUserDetails) {
            return res.status(200).json({
                success: true,
                message: "User Details Updated",
                data: updateUserDetails
            });
        }
        return res.status(404).json({
            success: false,
            error: "User Not Found!"
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: "Server Error"
        });
    };
};
//...

static async deleteUser (req, res) {
    try {
        const { _id } = req.params;
        const removeUser = await deleteUser(_id);
        if(removeUser) {
            return res.status(200).json({
                success: true,
                message: "User Account deleted"
            });
        };
        return res.status(404).json({
            success: false,
            error: "User Not Found!"
        }); 
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: "Server Error"
        });
    };
};
//...

}




