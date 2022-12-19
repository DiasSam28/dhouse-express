const express = require ('express');
const multer = require ('multer');

const router = express.Router();

const { Produto, Usuario } = require('../models')

const upload = multer({
    dest: 'public/uploads/'
  })
  
// router.get('/produtos', function (req, res){
//     res.render('admin/produtos-admin', {title: 'Admin'})
// })

router.get('/produtos', async function(req, res) {

   const produtos = await Produto.findAll()

  res.render('admin/produtos-admin')
})

function validaCadastroProduto(req, res, next) {
  if(!req.body.nome || !req.body.descricao || !req.body.valor) {
    res.render('erro-validacao', { mensagemErro: 'Preencha todos os campos' })
    return
  }
  if(req.body.nome.length <= 3) {
    res.render('erro-validacao', { mensagemErro: 'O tamanho do nome deve ser maior do que 3 caracteres' })
    return
  }
  if(req.body.descricao.length <= 10) {
    res.render('erro-validacao', { mensagemErro: 'O tamanho da descrição deve ser maior do que 3 caracteres' })
    return
  }
  if(isNaN(req.body.valor)) {
    res.render('erro-validacao', { mensagemErro: 'O preço não é um número válido' })
    return
  }
  next()
}
router.post('/produtos', upload.single('imagemProduto'), validaCadastroProduto, async function(req, res) {
  req.body.imagem = req.file.filename

  
  await Produto.create(req.body)

  res.redirect('produtos')
})


module.exports = router;