const { Produto } = require('./models')

const Inserir = [
  {
    "imagem": "7b475d624a8f8260effa5697dcc88915",
    "nome": "Guardei no Armário",
    "descricao": "Autoconhecimento",
    "valor": 30
  }
  
]

async function app() {
  for(const p of Inserir){
    await Produto.create(p)
  }
}

app()