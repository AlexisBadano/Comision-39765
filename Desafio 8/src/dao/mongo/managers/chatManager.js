import messageModel from "../models/messages.js";

export default class ChatManager {
    
    getMessages = (params) => {
        return messageModel.find(params).lean();
    };

    createMessage = (message) => {
        return messageModel.create(message)
    };

}