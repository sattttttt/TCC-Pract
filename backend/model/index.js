import User from "./usermodel.js";
import Note from "./model.js";
import db from "../config/database.js";

User.hasMany(Note, {foreignKey: 'user_id', onDelete: 'CASCADE'});
Note.belongsTo(User, {foreignKey: 'user_id', onDelete: 'CASCADE'});


export { db,User, Note };