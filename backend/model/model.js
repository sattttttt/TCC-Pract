import { Sequelize } from "sequelize";
import db from "../config/database.js";


const Note = db.define('notes', {
    notesTitle: {
        type: Sequelize.STRING,
        allowNull: false
    },
    notesContent: {
        type: Sequelize.STRING,
        allowNull: false
    }
}, {
    freezeTableName: true,
    timestamps:true

}

);

db.sync().then(() => {
    console.log('table created');
}).catch((err) => {
    console.log(err);
});

export default Note;