// jshint esversion: 6

const express = require("express");               //package express
const bodyParser = require("body-parser");        //pagckage body-parser
const request = require("request");               //package request (após npm install request)

const app = express();                            //calling express as app

app.use(bodyParser.urlencoded({extended: true})); //using bodyParser

app.get("/", function(req, res){                  //Estabelecendo a rota / no servidor
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req, res) {                //retornando após o clique no submit

    var coin = req.body.crypto;
    var currency = req.body.currency;
    var amount = req.body.amount;

    var options = {
      url: "https://apiv2.bitcoinaverage.com/convert/global",
      method: "GET",
      qs: {
        from: coin,
        to: currency,
        amount: amount
      }
    }

    request(options, function(error, response, body){  //fazendo o request
      //console.log(response.statusCode); //Retorna o status da requisição
      var data = JSON.parse(body);        //parseando a resposta (JSON) do servidor
      var price = data.price;              //Pegando o valor last do resultado
      console.log(price)

      var currentDate = data.time;
      console.log(currentDate);

      res.write("<p> A data atual da consulta é " + currentDate + "</p>"); //Primeiro retorn: data atual da consulta)

      res.write("<h1> O preço de " + amount + " of " + coin + " é " + price + " " + currency + "</h1>"); // segundo retorno: valor atual da criptomoeda.

      res.send();                 //Mortrando o valor
    });
});


app.listen(3000, function() {                     //Setando o servidor express na porta 3000
    console.log("Server is running on port 3000");
});
