import userModel from "../models/user.js";

export default class UserManager {


    getUser = (params) => {
        return userModel.find(params)
    };
    
    getUserBy = (params) => {
        return userModel.findOne(params);
    };

    addUser = (user) => {
        return userModel.create(user);
    };

    updateUser = (id, user) => {
        return userModel.findByIdAndUpdate(id, {$set:user});
    };

    deleteUser = (id) => {
        return userModel.findByIdAndDelete(id);
    };


};