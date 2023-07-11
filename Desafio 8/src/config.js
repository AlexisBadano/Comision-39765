import dotenv from 'dotenv';

dotenv.config();

export default {
    app:{
        PORT: process.env.PORT
    },
    mongo:{
        URL: process.env.MONGO
    },
    admin: {
        USER: process.env.ADMIN,
        PASS: process.env.PASS
    }
}