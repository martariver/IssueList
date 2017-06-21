import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class SearchUsersService {
  private getUserDetails = "https://api.github.com/users/";
  private getRepo = "'https://api.github.com/repos/'";
  private getUserRepo = "'https://api.github.com/users/'";

  constructor(private http: Http) { }

  //MÉTODOS QUE UTILIZAN LA API DE GITHUB

  //método para obtener la información del usuario
  getDetailsByUserName(user: string) {
    if (user) {
      let url = this.getUserDetails + user;
      return this.http.get(url)
        .map((res: Response) => res.json())
        .catch(this.handleError);
    }
  }

    //método para obtener las issues a partir del usuario y el repositorio
    getIssuesByUserRepository(user: string, repository: string) {
      let url = this.getRepo + user + '/' + repository + '/issues';
      return this.http.get(url)
      .map(data => data.json())
      .catch(error => this.handleError(error));
  }

    //método para obtener los repositorios de un usuario
    getUserRepositories(user: string) {
    let url = this.getUserRepo + user + '/repos';  
    return this.http.get(url)
      .map(data => data.json())
      .catch(error => this.handleError(error))
  }

  private handleError(error: any) {
    return Observable.throw(error);
  }

}
