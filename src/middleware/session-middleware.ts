import session, { SessionOptions } from 'express-session'
//this is copy-pasted for alec's 'lightlyburning' session-middleware ts file

const sessionConfig:SessionOptions = {
    secret: 'secret',
    cookie:{
        secure:false
    },
    resave:false,
    saveUninitialized:false
}

export const sessionMiddleware = session(sessionConfig)