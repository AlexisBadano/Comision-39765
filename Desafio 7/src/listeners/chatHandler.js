import ChatManager from "../dao/mongo/managers/chatManager.js";

const chatManager = new ChatManager()

const registerChatHandler = (io, socket)=>{

    const saveMessage = async (message)=>{
        await chatManager.createMessage(message);
        const messageLogs = await chatManager.getMessages();
        io.emit("chat:messageLogs", messageLogs)
        }
        const newParticipant = (user)=>{
            socket.broadcast.emit("chat:newConnection", user);
        }

        socket.on("chat:message", saveMessage);
        socket.on("chat:newParticipant", newParticipant)
}

export default registerChatHandler;