import { Component } from '@angular/core';
//import { NavController } from 'ionic-angular';
import { Http, Request, RequestMethod } from '@angular/http';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

    http: Http;
    mailgunUrl: string;
    mailgunApiKey: string;
    requestHeaders: any;
 
    constructor(http: Http) {
        this.http = http;
        this.mailgunUrl = "sandbox51ff7dfdb59f45d99cf09d2190236adf.mailgun.org";
        this.mailgunApiKey = window.btoa("api:key-dbc5dd1a7a7c6756d0ae1a0a2e4f7fd2");
    }
 
    send(email: string, nome: string, mensagem: string) {

        this.requestHeaders = new Headers();
        this.requestHeaders.append("Authorization", "Basic" + this.mailgunApiKey);
        this.requestHeaders.append("Content-Type", "application/x-www-form-urlencoded");
        this.http.request(new Request({
            method: RequestMethod.Post,
            url: "https://api.mailgun.net/v3/" + this.mailgunUrl + "/messages",
            body: "to=email@exemple.com&from=" + email + "&subject=" + nome + "&text=" + mensagem,
            headers: this.requestHeaders
        }))
        .subscribe(success => {
            console.log("SUCCESS -> " + JSON.stringify(success));
        }, error => {
            console.log("ERROR -> " + JSON.stringify(error));
        });

    }

}
