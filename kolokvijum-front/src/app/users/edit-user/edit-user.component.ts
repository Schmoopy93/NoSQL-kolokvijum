import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { AuthService } from '../../auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ErrorStateMatcher } from '@angular/material/core';
import { UserService } from 'src/app/user.service';
import { HttpClient } from '@angular/common/http';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {
  user: any = {};
  registerForm: FormGroup;;
  matcher = new MyErrorStateMatcher();
  contact = {}
  fullname = '';
  email = '';
  constructor(private formBuilder: FormBuilder, private router: Router, private authService: AuthService,private route: ActivatedRoute, private us: UserService,private http: HttpClient) { }


  ngOnInit() {
    this.getUser(this.route.snapshot.params['id']);
    this.registerForm = this.formBuilder.group({
      'fullname' : [null, Validators.required],
      'email' : [null, Validators.required]
    });
  }

  getUser(id) {
    this.http.get('/users/'+id).subscribe(data => {
      this.contact = data;
    });
  }

  updateUser(id, data) {
    this.http.put('/users/'+id, data)
      .subscribe(res => {
          let id = res['id'];
          this.router.navigate(['/users', id]);
        }, (err) => {
          console.log(err);
        }
      );
  }

}
