import { Request, Response } from 'passport';
import * as underscore from 'underscore';

const nonSecurePaths = ['/', '/login', '/users/add'];

var Authenticated = function (req: Request, res: Response, next: () => any) {
    if (underscore.contains(nonSecurePaths, req.path)) return next();
    // if user is authenticated in the session, call the next() to call the next request handler 
    // Passport adds this method to request object. A middleware is allowed to add properties to
    // request and response objects
    if (req.isAuthenticated()) {
        return next();
    }
    // if the user is not authenticated then redirect him to the login page
    res.redirect('/login');
}

export default Authenticated;
