const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/connection');

// User class inherits from Model
class User extends Model {
	// instance method to check login pw against hashed pw in db
	isCorrectPassword(inputPassword) {
		return bcrypt.compare(inputPassword, this.password);
	}
}

// initialise User model
User.init(
	{
		id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true,
		},
		username: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		password: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				len: [8],
			},
		},
	},
	{
		// hooks to hash password before creating or updating a user
		hooks: {
			beforeCreate: async (newUserData) => {
				newUserData.password = await bcrypt.hash(newUserData.password, 10);
				return newUserData;
			},
			beforeUpdate: async (updatedUserData) => {
				updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10);
				return updatedUserData;
			},
		},
		sequelize,
		timestamps: false,
		freezeTableName: true,
		underscored: true,
		modelName: 'user',
	}
);

// export User model
module.exports = User;