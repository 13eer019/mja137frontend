import { Component, OnInit, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginPageComponent } from '../login-page/login-page.component';
import { Router, ActivatedRoute } from '@angular/router';
import {FilterPipe} from '../filter/filter.app';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less']
})
export class HomeComponent implements OnInit {
 loader: string;
  resultValid: string;
  warnErrMsg: string;
  name: string;
  status: string;
  data: object ;
  id: string;
  img: HTMLImageElement;
  data1: string;
  checkOpen: boolean;
  thatImage: string;
  searchName: string;
  userData: object;
  userComments: string;
  checkguest: boolean;
 constructor(private http: HttpClient, private route: ActivatedRoute, private router: Router) {
    this.loader = '';
    this.name = '';
    this.status = '';
    this.checkOpen = false;
    this.checkguest = false;
   }

  ngOnInit() {
    this.getDetails();
  }

  logout(): void {
    this.loader = 'LOADING';
    const formData: FormData = new FormData();
    this.http.post('/logout', formData)
      .subscribe(
        (res) => {
          this.loader = '';
          this.router.navigateByUrl('/loginPage');
        },
        (err) => {
          this.loader = '';
          this.resultValid = 'ERROR';
          this.warnErrMsg = 'Please check the Internet Connection and try again later';
        }
      );
  }

  getDetails(): void {
    this.name = this.route.snapshot.paramMap.get('name');
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id === 'guest') {
       this.checkguest = true;
    }
    this.img = <HTMLImageElement>document.getElementById('profile-img');
    this.img.src = this.id + '.png';
    this.loader = 'LOADING';
    const formData: FormData = new FormData();
    this.http.post('/homePage', formData)
      .subscribe(
        (res) => {
          this.loader = '';
          this.data = res;
         if (this.data !== null) {
                for ( let i = 0; i  < Object.keys(this.data).length ; i++) {
                this.data[i].image = this.data[i].id + '.png' ;
            }
            this.status = 'SUCCESS';
          } else {
            this.router.navigateByUrl('/loginPage');
          }
        },
        err => {
          this.loader = '';
          this.resultValid = 'ERROR';
         this.warnErrMsg = 'Please check the Internet Connection and try again later';
        }
      );
  }

  openProfileImage(): void {
    this.thatImage = this.id + '.png';
    this.checkOpen = true;
}

  getUserDetails(userId): void {
    this.loader = 'LOADING';
    const formData: FormData = new FormData();
    formData.append('empId', userId);
    this.http.post('/getDetails', formData)
      .subscribe(
        (res) => {
          if (res !== null) {
            this.loader = '';
            this.userData = res;
            this.resultValid = 'OPENDETAIL';
          } else {
            this.router.navigateByUrl('/loginPage');
          }
          },
        (err) => {
          this.loader = '';
          this.resultValid = 'ERROR';
          this.warnErrMsg = 'Please check the Internet Connection and try again later';
        }
      );
  }

  openImage(img): void {
    this.checkOpen = true;
    this.thatImage = img;
  }

  openWhatsApp(no): void {
    const link = 'https://api.whatsapp.com/send?phone=91' + no;
    window.open(link);
  }

  openInsta(id): void {
    const link = 'https://instagram.com/_u/' + id;
    window.open(link);
  }

  updateComment(): void {
    this.loader = 'LOADING';
    this.resultValid = '';
    const formData: FormData = new FormData();
    formData.append('comment', this.userComments);
    this.http.post('/updateDetails', formData)
      .subscribe(
        (res) => {
          if (res !== null) {
            this.loader = '';
            this.userData = res;
            this.resultValid = 'OPENDETAIL';
          } else {
            this.router.navigateByUrl('/loginPage');
          }
          },
        (err) => {
          this.loader = '';
          this.resultValid = 'ERROR';
          this.warnErrMsg = 'Please check the Internet Connection and try again later';
        }
      );
  }

  }
