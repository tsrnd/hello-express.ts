import chaiHttp = require("chai-http");
import * as chai from "chai";

chai.use(chaiHttp);
chai.should();
import "mocha";

import { hello } from "./hello";


describe("Test function in UserController", () => {
    it("Should return status 200 if GET /users", (done) => {
        chai.request("localhost:8081")
            .get("/users")
            .then((resp) => {
                chai.expect(resp).to.have.status(200);
                done();
            }).catch(err => {
                if (err) done(err);
            });
    });
});

describe("Hello function", () => {

    it("should return hello world", () => {
      const result = hello();
      chai.expect(result).to.equal("Hello world!");
    });
});
