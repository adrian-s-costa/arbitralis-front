<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://res.cloudinary.com/dmo7nzytn/image/upload/v1687912863/308830962_436245725278167_5731677229795523086_n_n9g23c.png" width="250" alt="Arbitralis Logo" /></a>
</p>

# Descrição
Este repositório contém o front-end da API CRUD de clima/tempo desenvolvida para a empresa Arbtralis como teste técnico. O front-end permite que os usuários interajam com a API e obtenham informações atualizadas sobre as condições climáticas de diferentes localidades do globo.

## Funcionalidades
Consultar o clima de qualquer cidade 🌎 <br/>
Visualizar informações detalhadas sobre temperatura, umidade, e outros dados meteorológicos 🌦️ <br/>
##  Tecnologias Utilizadas
- React
- Tailwind CSS

## Rodando localmente
1. Clone o repositório
2. Dentro do diretório onde o repositório foi clonado, instale as dependências
```bash
~$ npm i
```
3. Edite o atributo `api_url` no arquivo `src > config.json` e coloque a URL raiz de onde sua API estiver rodando
```bash
{
  "api_url": "http://localhost:3003"
}
```
4. Execute o comando `npm run start`
```bash
~$ npm run start
```
Pronto! O navegador abrirá e exibirá a landing page do projeto 😊

# Licença
Este projeto está licenciado sob a licença MIT. Consulte o arquivo LICENSE para obter mais informações.
