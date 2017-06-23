import { Component, OnInit } from '@angular/core';
import { SearchUsersService } from './search-users.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [SearchUsersService]
})

export class AppComponent {
  opt: 'url';
  repositoryUrl;
  issues;
  user = {};
  userName = null;
  repository = '';
  repositories= null;
  selectedRepo;
  error;
  dataLoaded=false;

  constructor(private searchService: SearchUsersService) {}
  


  //método para obtener el usuario de la url 
    getUserName(): string {
    let userName = this.repositoryUrl.substring(this.repositoryUrl.indexOf('.com') + 5);
    userName = userName.substr(0, userName.indexOf('/'));
    
    return userName;
    
  }

  //método para obtener el repositorio de la url
    getRepository() {
    this.repository = this.repositoryUrl.substring(this.repositoryUrl.indexOf('.com') + 6 + this.getUserName().length);
    this.repository = this.repository.substr(0);

  }
   
//método para obtener los repositorios del usuario obtenido de la url
    getUserRepositoriesByUser() {
    if (this.userName != null){
      this.issues = null;
      this.repository = '';
      this.repositories = null;
      this.error = null;
      this.dataLoaded = true;
      this.searchService.getUserRepositories(this.userName)
        .subscribe(
        data => {
          this.repositories = data; //console.log(this.userName);
        }, 
        err => {
          this.error = err;
        }
        );
    }
  }

//método para obtener el listado de issues a partir de la url
  getIssueListByUrl(): void {
    this.dataLoaded = true;
    this.error = null;
    this.searchService.getDetailsByUserName(this.getUserName())
      .subscribe(
      data =>
        this.user = data
      )
      ;
    this.getRepository();
    this.searchService.getIssuesByUserRepository(this.getUserName(), this.repository)
      .subscribe(
      data => {
        this.error = null;
        this.issues = data;
        this.getRepository(); 
      },
      err => {
        this.error = err;
      }
      );
 

}

getIssueListByUserRepository(): void {
    this.error = null;
    this.issues = null;
    this.dataLoaded = true;
    this.searchService.getDetailsByUserName(this.userName)
      .subscribe(
      data => this.user = data
      );
    this.searchService.getIssuesByUserRepository(this.userName, this.selectedRepo)
      .subscribe(
      data => {
        this.issues = data; console.log(this.issues);
      },
      err => {
        this.error = err;
      }
      );

  }

  

  clean(){
    this.userName = '';
    this.repositoryUrl= '';
    this.dataLoaded= false;
    this.selectedRepo= null;
  }

}

