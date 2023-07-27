import chai from "chai";
import chaiHttp from "chai-http";
import server from "../server";
import {dropDB,connectDB} from "../config/db";


import {
    user,
    user2,
    user3,
    user4,
    profile
} from "./usertestdata";
import { connect } from "mongoose";

chai.should();
chai.use(chaiHttp);

describe("Should handle correct user's behaviour",  function () {
  before(function () {  
           connectDB();
           dropDB("first-crud-project");
        });
      describe("/user/signup should create a user", function ()  {
          it("it should create a user with complete details successfully", function () {
            chai
              .request(server)
              .post("/user/signup")
              .set("Accept", "application/json")
              .send(user)
              .end((err, res) => {
                res.should.have.status(201);
                res.body.should.be.a("object");
                res.body.should.have.property("success").eql(true);    
                res.body.should.have.property("message").eql("New User Created Successfully");
              }) 
          });
          it("it should not create a user with an already taken username", function () {
            chai
            .request(server)
            .post("/user/signup")
            .set("Accept", "application/json")
            .send(user4)
            .end((err, res) => {
                res.should.have.status(409);
              });
        });
        it("it should not create a user with an already registered email", function () {
            chai
              .request(server)
              .post("/user/signup")
              .set("Accept", "application/json")
              .send(user2)
              .end((err, res) => {
                res.should.have.status(409);
              });
        });
        describe("/users should get all registered users", function () {
          it("it should get all registered users", () => {
              chai
              .request(server)
              .get("/users")
              .end((err, res) => {
                  res.should.have.status(200);
                  res.body.should.be.a("object");
                  res.body.should.have.property("message").eql("All Users Retrieved Successfully");
              });
          });
        });
        describe("Handle single user  operations", function () {
          let _id;
          before ( function () {
              chai
              .request(server)
              .post("/user/signup")
              .set("Accept", "application/json")
              .send(user3)
              .end((err, res) => {
                  if (err) throw err;
                  _id = res.body.data._id;
              });
          });
          it("it should update a user's profile", function () {
            chai
              .request(server)
              .patch(`/user/profile/${_id}`)
              .set("Accept", "application/json")
              .send(profile)
              .end((err, res) => {
                res.should.have.status(200);
                res.body.should.have.property("message").eql("User Details Updated");
            });
        });
        it("it should get a single user by ID", function () {
            chai
            .request(server)
            .get(`/user/${_id}`)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a("object");
                res.body.should.have.property("message").eql("User retrieved!");
            });
        });
        it("it should delete a user's account", function () {
            chai
              .request(server)
              .delete(`/user/delete/${_id}`)
              .set("Accept", "application/json")
              .end((err, res) => {
                res.should.have.status(200);
                res.body.should.have.property("message").eql("User Account deleted");
            });
        });
    });
      });
  });
  
  export default "./usertest";






































// import chai from "chai";
// import chaiHttp from "chai-http";
// import server from "../server";
// import {dropDB} from "../config/db";

// import {
//     user,
//     user2,
//     user3,
//     user4,
//     profile
// } from "./usertestdata";

// chai.should();
// chai.use(chaiHttp);


// describe("Should handle correct user's behaviour", async () => {
//     before(async () => {  
//             await dropDB("CI_lesson_test");
//           });
//           after(async()=>{
//             await connectDB("CI_lesson_test");
//           });
//         describe("/user/signup should create a user", () => {
//             it("it should create a user with complete details successfully", (done) => {
//               chai
//                 .request(server)
//                 .post("/user/signup")
//                 .set("Accept", "application/json")
//                 .send(user)
//                 .end((err, res) => {
//                   res.should.have.status(201);
//                   res.body.should.be.a("object");
//                   res.body.should.have.property("success").eql(true);    
//                   res.body.should.have.property("message").eql("New User Created Successfully");
//                   done();
//                 });
//             });
//     });
        
//     });




    ///
    