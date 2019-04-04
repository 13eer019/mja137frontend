import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import { from } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit {
  title = 'mja';
 constructor(private router: Router) {
 }
 ngOnInit() {
 // this.router.navigateByUrl('/loginPage');
 }
}
