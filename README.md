## Teste WebScraper yagobelo

## Description

Acessar esse site e pegar todos notebooks Lenovo ordenando do mais barato para o mais caro. Pegar TODOS os dados disponíveis dos produtos.

Não utilizar nada de navegador como selenium ou puppeteer. Usar somente libs que interceptam dados de requisições e respostas (request /response) como Axios, Fetch etc.

É interessante que o robô possa ser consumido por outros serviços. Recomendamos a criação de uma pequena REST Ful API JSON para deixar mais otimizado.

https://webscraper.io/test-sites/e-commerce/static/computers/laptops

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Routes

🚩GetAll - body: "link": "https://webscraper.io/test-sites/e-commerce/static/computers/laptops"

```bash
localhost:3000/scrapers
```
