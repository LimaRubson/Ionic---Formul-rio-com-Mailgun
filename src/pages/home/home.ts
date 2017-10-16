import { Component } from '@angular/core';
//import { NavController } from 'ionic-angular';
import { Http, Request, RequestMethod } from '@angular/http';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
    //Variável que recebe requisição  http
    http: any;
    //Variável que recebe o endereço do serviço
    mailgunUrl: string;
    //Varável que recebe a chave do serviço
    mailgunApiKey: string;
    //Requisição de cabeçalhos
    requestHeaders: any;
 
    constructor(http: Http) {
        this.http = http;
        this.mailgunUrl = "sandbox51ff7dfdb59f45d99cf09d2190236adf.mailgun.org";
        this.mailgunApiKey = window.btoa("api:key-dbc5dd1a7a7c6756d0ae1a0a2e4f7fd2");
    }

    //Método que recebe as informações e enviar para o serviço
    send(email: string, nome: string, mensagem: string) {
        //A variável 'requestHeaders' recebe uma nova instância 'new Headers()'
        this.requestHeaders = new Headers();
        //Variável que recebe um novo valor a um cabeçalho existente de um objeto Headers ou adiciona o cabeçalho se ele ainda não existir
        this.requestHeaders.append("Authorization", "Basic" + this.mailgunApiKey);
        //Variável que recebe um novo valor a um cabeçalho existente de um objeto Headers ou adiciona o cabeçalho se ele ainda não existir
        this.requestHeaders.append("Content-Type", "application/x-www-form-urlencoded");
        //Variável que recebe uma nova instância de requisição http
        this.http.request(new Request({
            method: RequestMethod.Post,
            url: "https://api.mailgun.net/v3/" + this.mailgunUrl + "/messages",
            body: "to=email@exemple.com&from=" + email + "&subject=" + nome + "&text=" + mensagem,
            headers: this.requestHeaders
        }))
        //Recebe o resultado da requisição http
        .subscribe(success => {
            console.log("SUCCESS -> " + JSON.stringify(success));
        }, error => {
            console.log("ERROR -> " + JSON.stringify(error));
        });

    }

}
