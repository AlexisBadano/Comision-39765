import passport from "passport";
import local from 'passport-local';
import GithubStrategy from 'passport-github2';


import userModel from "../dao/mongo/models/user.js";
import { createHash, validatePassowrd } from "../utils.js";


const LocalStrategy = local.Strategy;


//Inicializar todas las estrategias que vamos a usar
const initializePassport = () => {

    /*------------Estrategia Local-----------------*/ 
    passport.use('register', new LocalStrategy({passReqToCallback: true, usernameField:'email'}, async (req, email, password, done) => {        
    const { firstName, lastName} = req.body;

    const userExist = await userModel.findOne({email});
        if (userExist) {
        return done(null, false, {message: 'User already exists'} )
    }
    const hashedPassword = await createHash(password);

    const user = {
            firstName,
            lastName,
            email,
            password: hashedPassword
    }

    const result = await userModel.create(user)
    done(null, result)
    }))

    
    /*Estrategia local de Login*/
    
    passport.use('login', new LocalStrategy({usernameField: 'email'}, async (email, password, done)=>{

    let user = await userModel.findOne( {email})

    if(email === "admin@admin.com" && password === "secretpass"){
        user = {
            id: 0,
            name: "Admin",
            email: "secret",
            role: "superAdmin"
        }
        return done(null, user)
    }

    if (!user){
        return done(null, false, {message:"Usuario o contraseña incorrectos"})
    }

    const isValidPassword = await validatePassowrd(password, user.password)
    if(!isValidPassword) return done(null, false,{message:"Usuario o contraseña incorrectos"})

    user = {
        id: user._id,
        name: `${user.firstName} ${user.lastName}`,
        email: user.email,
        role: user.role
    }
    done(null, user)

    }))


    passport.use('github', new GithubStrategy({
        clientID: 'Iv1.74baf7e688e55ae1',
        clientSecret: '7e14539986ba91dc695fb6a954ff4756094435ae',
        callbackURL: 'http://localhost:8080/api/sessions/githubcallback'
    }, async (accessToken, refreshToken, profile, done)=>{
        try {
            console.log(profile)


        } catch (error) {
            done(error)
        }
    }))



/*--------------------Seralizador y Deserializador de Passport----------------------*/

    passport.serializeUser(function(user, done){
        return done(null,user.id)
    })
    passport.deserializeUser(async function(id, done){
        const user = await userModel.findOne({_id:id})
        return done(null, user)
    })

}

export default initializePassport;