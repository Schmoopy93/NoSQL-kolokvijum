import { Component, OnInit } from '@angular/core';
import { User } from './user';
import { UserService } from '../user.service';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  currentUser = null;
  message = '';
  data: User[] = [];
  users: User[];

  displayedColumns: string[] = ['email','fullname'];
  isLoadingResults = true;
  blob: Blob;
  title = 'read-excel-in-angular8';  
  storeData: any;  
  csvData: any;  
  jsonData: any;  
  textData: any;  
  htmlData: any;  
  fileUploaded: File;  
  worksheet: any;  
  user: any = [];
  path: string;
  constructor(private userService: UserService, private authService: AuthService, private router: Router) { }
  
  ngOnInit() {
    this.userService
      .getUsers()
      .subscribe((data: User[]) => {
        this.users = data;
    });
    this.userService.getUsers().subscribe(res => {
      this.user = res;
    });
  }
  getUsers(): void {
    this.userService.getUsers()
      .subscribe(products => {
        this.data = products;
        console.log(this.data);
        this.isLoadingResults = false;
      }, err => {
        console.log(err);
        this.isLoadingResults = false;
      });
  }
  removeAllUsers() {
    this.userService.deleteAll()
      .subscribe(
        response => {
          console.log(response);
          this.getUsers();
        },
        error => {
          console.log(error);
        });
  }

  deleteUser(id) {
    this.userService.deleteUser(id).subscribe(res => {
      console.log('Deleted');
      this.router.navigate(['/users']).then(() => window.location.reload());
      this.ngOnInit();
    });
  }

  downloadAllUsersXsls(){

    this.userService.getAllXsls().subscribe((data) => {

      this.blob = new Blob([data], {type: 'application/xlsx'});
    
      var downloadURL = window.URL.createObjectURL(data);
      var link = document.createElement('a');
      link.href = downloadURL;

      
      link.download = "users.xlsx";
      link.click();
    
    });
    
  }

  import() {
    this.userService.importUsers(this.path).subscribe(res => {
      setTimeout(() => {
        console.log(res);
        if(res == 'Imported') {
          this.ngOnInit();
        }
      }, 500);
    });
  }


  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['login']);
  }

}