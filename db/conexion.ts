import {Sequelize} from 'sequelize';



const db = new Sequelize('postgresql://isytugmb:9cnAy_-S8JzKg56AM2gvDlsZ77EPbmW_@snuffleupagus.db.elephantsql.com/isytugmb', {
    logging:false
});




export default db;
