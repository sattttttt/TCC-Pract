import { Sequelize } from "sequelize";


const db = new Sequelize("tcc_sat","root", "", {
    host: "localhost",
    dialect: "mysql",
    define: {
        timestamps: false
    }
});

export default db;