import { Sequelize } from "sequelize";


const db = new Sequelize("tcc_sat","root", "", {
    host: "34.42.87.253",
    dialect: "mysql",
    define: {
        timestamps: false
    }
});

export default db;