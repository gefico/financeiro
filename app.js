const express = require('express')
const app = express()
const handlebars = require('express-handlebars')
const bodyParser = require('body-parser')
const moment  = require('moment')
const Pagamentos = require('./models/Pagamentos')

//configurações
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.engine('handlebars', handlebars({
    defaultLayout: 'main',
    helpers:{
        formatDate: (date) => {
            return moment(date).format('DD/MM/YYYY')
        }
    }
}))
app.set('view engine', 'handlebars')

app.get('/pagamentos',function(req,res){
    Pagamentos.findAll({order:[['id', 'DESC']]}).then(function(pagamentos){
         res.render('pagamentos',{pagamentos:pagamentos})
    })
   
})
app.get('/cad-pagamentos',function(req,res){
    res.render('cadpagamentos')
})

app.post('/add-pagamentos',function(req,res){
    
    Pagamentos.create({
        descricao: req.body.descricao,
        valor: req.body.valor
    }).then(function(){
        res.render("pagamentos")
    }).catch(function(erro){
        res.send('Erro ao cadastrar pagamento: ' + erro)
    })
})

app.get('/del-pagamento/:id', (req,res)=>{
    Pagamentos.destroy({
        where:{'id': req.params.id}
    }).then(()=>{
        //res.send("REGISTRO EXCLUIDO COM SUCESSO")
        res.redirect('/pagamentos')

    }).catch((erro)=>{
        res.send("ERRO NA EXCLUSÃO DO REGISTRO ")
         })
})



app.listen(8081, function(){
    console.log('Servidor on line porta:8081')
})