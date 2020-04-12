const bd = require('./bd')

const Pagamentos = bd.sequelize.define('pagamentos',{
    descricao: {
        type: bd.Sequelize.STRING,
    },
    valor: {
        type: bd.Sequelize.DOUBLE
    }
})
module.exports = Pagamentos