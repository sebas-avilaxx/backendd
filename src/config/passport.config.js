import passport from "passport";
import jwtStrategy from 'passport-jwt';
import { PRIVATE_KEY } from "../util.js";

const JwtStrategy = jwtStrategy.Strategy;
const ExtractJWT = jwtStrategy.ExtractJwt;

const initializePassport = () => {
    
    passport.use('jwt', new JwtStrategy(
        {
            jwtFromRequest: ExtractJWT.fromExtractors([cookieExtractor]), 
            secretOrKey: PRIVATE_KEY
        }, async (jwt_payload, done) => {
            console.log("Entrando a passport Strategy con JWT.");
            try {
                console.log("JWT obtenido del payload");
                console.log(jwt_payload);
                return done(null, jwt_payload.user);
            } catch (error) {
                console.error(error);
                return done(error);
            }
        }
    ));

    passport.serializeUser((user, done) => {
        const SERIALIZED_USER = {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role
        }
        done(null, SERIALIZED_USER);
    });

    passport.deserializeUser(async (id, done) => {
        try {
            let user = await userModel.findById(id);
            done(null, user);
        } catch (error) {
            console.error("Error deserializando el usuario: " + error);
        }
    });
};

/**
 * @param {*} req 
 * @returns
 */
const cookieExtractor = req => {
    let token = null;
    console.log("Entrando a Cookie Extractor");
    if (req && req.cookies) { 
        console.log("Cookies presentes: ");
        console.log(req.cookies);
        token = req.cookies['jwtCookieToken']; 
        console.log("Token obtenido desde Cookie:");
        console.log(token);
    }
    return token;
};

export default initializePassport;