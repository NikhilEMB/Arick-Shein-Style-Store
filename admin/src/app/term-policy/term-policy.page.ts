import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-term-policy',
  templateUrl: './term-policy.page.html',
  styleUrls: ['./term-policy.page.scss'],
})
export class TermPolicyPage implements OnInit {
  segment = 'privacy';
  constructor() { }

  ngOnInit() {
  }

}
