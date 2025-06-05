import { Sequelize } from "sequelize";
import db from "../config/database.js";


const User = db.define('user', {
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    },
    refresh_token: {
        type: Sequelize .TEXT,
        allowNull: true
    }
}, {
    freezeTableName: true,
    timestamps:true

}
);
export default User;