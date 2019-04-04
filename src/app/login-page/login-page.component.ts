import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Router} from '@angular/router';


@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.less']
})

export class LoginPageComponent implements OnInit {
  Id: string;
  password: string;
  status: string;
  loader: string;
  name: string;
  resultValid: string;
  warnErrMsg: string;
  title = 'MJA137';
  submitted: boolean ;
  creatorName: string;
  creatorJob: string;
  creatorInsta: string;
  creatorCom: string;
  id: string;
  creatorImage: string;
  isTrue: boolean;
  onFocus: boolean;
  constructor(private http: HttpClient, private router: Router) {
    this.title = this.title;
    this.loader = '';
    this.warnErrMsg = '';
    this.resultValid = '';
    this.submitted = false;
    this.name = '';
    this.isTrue = false;
    this.onFocus = false;
    }
  ngOnInit() {
  }
  loginValidation(): void {
      if (this.status === 'success' && this.name !== 'Shubham Gokul') {
        this.router.navigate(['/home', this.name.toLowerCase(), this.id]);
      } else {
         this.resultValid = 'WARNING';
         if (this.name === 'Shubham Gokul') {
          this.warnErrMsg = 'Admin Logged in !!';
         } else {
          this.warnErrMsg = 'Employee id or Password is Incorrect';
         }
      }
  }
  checkLogin(invalid): void {
  if (!invalid) {
   this.loader = 'LOADING';
   const formData: FormData = new FormData();
   formData.append('userId', this.Id);
   formData.append('password', this.password);
   this.http.post('/login', formData)
      .subscribe(
        (res) => {
          this.loader = '';
          this.status = res['status'];
          this.name = res['name'];
          this.id = res['id'];
          this.loginValidation();
          },
        err => {
          this.loader = '';
          this.resultValid = 'ERROR';
         this.warnErrMsg = 'Please check the Internet Connection and try again later';
        }
      );
    }
  }

  openInsta(link): void {
     window.open(link);
  }

  openCreator(creator): void {
        if (creator === 'creator1') {
            this.creatorName = 'Shubham Srivastava';
            this.creatorJob = '(Backend Developer)';
            this.creatorInsta = 'https://www.instagram.com/great__shubham';
            this.creatorCom = '"This app will update soon with chatting option."';
            this.creatorImage = 'creator1.png';
            } else {
            this.creatorName = 'GokulKrishnan Devaraj';
            this.creatorJob = '(Frontend Developer)';
            this.creatorInsta = 'https://www.instagram.com/gokulkrishnan.d';
            this.creatorCom = '"Aiiyoo!!! Shubham will make me do UI for chat also..Plz help"';
            this.creatorImage = 'creator2.png';
        }
        this.isTrue = true;
  }
}
