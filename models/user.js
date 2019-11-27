module.exports = (sequelize, DataTypes) => {
    var User = sequelize.define('User', {
        user_name: DataTypes.STRING,
        email: DataTypes.STRING,
        password_encrypted: DataTypes.STRING,
        password_salt: DataTypes.STRING
    }, {
        tableName: "users"
    });
    
    User.associate = function (models) {
        // associations can be defined here
    };

    User.findUsers = function () {
        try {
            return User.findAll({
                attributes: ['user_name', 'email']
            });
        } catch (err) {
            return { error: err };
        }
    };
    
    User.findUserByName = function (name) {
        try {
            return User.findAll({
                where: {
                    user_name: name
                },
                attributes: ['user_name', 'email', 'password_encrypted', 'password_salt']
            });
        } catch (err) {
            return { error: err };
        } 
    };
    return User;
};