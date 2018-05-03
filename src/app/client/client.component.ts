import {Component, OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';

@Component({
  moduleId: module.id,
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {
  constructor(private title: Title) {
  }

  ngOnInit() {
    this.title.setTitle('Личный кабинет - Neon Tour');
  }
}
