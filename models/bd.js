const express = require('express')
const app = express()
const mysql = require('mysql')
const { Sequelize } = require('sequelize');

// conexao com o banco
const sequelize = new Sequelize('sistemadecadastro', 'root', '', {
    host: 'localhost',
    dialect: 'mysql' 
  });

module.exports = {
  Sequelize: Sequelize,
  sequelize: sequelize
}

//Pagamentos.sync({force: true})
