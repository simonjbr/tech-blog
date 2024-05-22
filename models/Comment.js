const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

// Comment class inherits from Model
class Comment extends Model { }

// initialize Comment model
Comment.init(
	{
		id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true,
		},
		content: {
			type: DataTypes.TEXT,
			allowNull: false,
		},
		date_created: {
			type: DataTypes.DATE,
			allowNull: false,
			defaultValue: DataTypes.NOW,
		},
		user_id: {
			type: DataTypes.INTEGER,
			references: {
				model: 'user',
				key: 'id',
			},
		},
		blog_id: {
			type: DataTypes.INTEGER,
			references: {
				model: 'blog',
				key: 'id',
			},
		},
	},
	{
		sequelize,
		timestamps: false,
		freezeTableName: true,
		underscored: true,
		modelName: 'comment',
	}
);

// export Comment model
module.exports = Comment;