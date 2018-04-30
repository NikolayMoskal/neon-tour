import {Component, OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';

@Component({
  moduleId: module.id,
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  constructor(private titleService: Title) {
  }

  ngOnInit() {
    this.titleService.setTitle('Администрирование');
  }
}
