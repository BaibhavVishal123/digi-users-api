const models = require('../models');

const encryption = require("../security");


class User{

    // register a user
    //payload = { "userName": userName, "password": password, "email": email };
    async provision(payload) {
        var protectedPasswordJson= await encryption.create(payload.password);
        try {
            let userData = await models.User.build({
                user_name: payload.userName, // user data = stored normally to retreive further
                password_encrypted: protectedPasswordJson.passwordData.passwordHash,
                email: payload.email,
                password_salt: protectedPasswordJson.passwordData.salt
            });
            await userData.save();
        } catch (err) { 
            if (err.name == "SequelizeUniqueConstraintError") {
                console.log(err)
                return { "sucess": false, "err": "Enter a unique Name " };
            } else {
                return { "sucess": false, "err": err };   
            }
        }
        return { "success": true }; 
    }
    
    // this payload contains plain password
    // verify with actual password and name
    async login(payload) {
        var userSequlizedList = await models.User.findUserByName(payload.userName);
        console.log("User sql list", JSON.stringify(userSequlizedList));
        var user = userSequlizedList[0];
        if (!user) {
            console.log("No user Found");
            return { "success": false };
        }
        var protectedPasswordJson = await encryption.verify(payload.password, user.password_salt);
        if ((protectedPasswordJson.passwordData.passwordHash === user.password_encrypted)) {
            // login
            return { "success": true, "password": protectedPasswordJson.passwordData.salt };
        } else {
            // fail
            return { "success": false };
        }
    }

    // verify with SALT and name
    async verify(name, saltedPassword) {
        var userSequlizedList = await models.User.findUserByName(name);
        var user = userSequlizedList[0];
        console.log("validating if user present");
        if (!user) {
            console.log("No user Found");
            return { "success": false };
        }
        console.log("validating if user salt is correct");
        if (user.password_salt !== saltedPassword) {
            console.log("Wrong SaltedPassword Entered");
            return { "success": false };
        }
        console.log("salt verification done, returning response");
        return { "success": true, "passwordHash": user.password_encrypted };
    }

    async listUsers(name, saltedPassword) {
        var proceed = await this.verify(name, saltedPassword);
        console.log("USER VERIFICATION WITH SALT DONE", proceed);
        if (proceed.success) {
            const users = await models.User.findUsers();
            console.log("USERS List returned from DB: ", users);
            users.forEach(async (element) => {
                console.log(element);
            });
            return { "success": true, "users": users };
        }
        else {
            // fail
            console.log("AND IT FAILED");
            return { "success": false };
        }
    }
}

module.exports = new User();