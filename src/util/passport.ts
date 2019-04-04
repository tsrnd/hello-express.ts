import usersModel from '@models/user';
import { Strategy as LocalStrategy } from 'passport-local';

class Passport {
    private passport: any;

    constructor(passport: any) {
        this.passport = passport;
    }

    public config() {
        this.passport.serializeUser(function (user: any, done) {
            done(null, user._id);
        });

        this.passport.deserializeUser(function (id, done) {
            usersModel.findById(id, function (err, user) {
                done(err, user);
            });
        });

        // Setting up Passport Strategies for Login and SignUp/Registration
        this.passport.use('login', new LocalStrategy({
            usernameField: 'email',
            passReqToCallback: true
        },
            function (req, email, password, done) {
                // check in mongo if a user with email exists or not
                usersModel.findOne({ 'email': email, 'password': password },
                    function (err: any, user: any) {
                        if (err)
                            return done(err);
                        if (!user) {
                            return done(null, false);
                        }
                        return done(null, user);
                    }
                );

            })
        );

        // this.passport.use('signup', new LocalStrategy({
        //     usernameField: 'email',
        //     passReqToCallback: true
        // },
        //     function (req, email, password, done) {
        //         var findOrCreateUser = function () {
        //             usersModel.findOne({ 'email': email }, function (err, user) {
        //                 if (err) {
        //                     return done(err);
        //                 }
        //                 if (user) {
        //                     return done(null, false);
        //                 } else {
        //                     var newUser = {
        //                         email: email,
        //                         password: password
        //                     }

        //                     model.create(newUser, function (err) {
        //                         if (err) {
        //                             throw err;
        //                         }
        //                         return done(null, newUser);
        //                     });
        //                 }
        //             });
        //         };
        //         // Delay the execution of findOrCreateUser and execute the method
        //         // in the next tick of the event loop
        //         process.nextTick(findOrCreateUser);
        //     })
        // );
    }
}

export default Passport;
