import User from "./usermodel.js";
import Note from "./model.js";
import db from "../config/database.js";

User.hasMany(Note, {foreignKey: 'user_id', onDelete: 'CASCADE',   constraints: true});
Note.belongsTo(User, {foreignKey: 'user_id', onDelete: 'CASCADE',   constraints: true});


export { db,User, Note };