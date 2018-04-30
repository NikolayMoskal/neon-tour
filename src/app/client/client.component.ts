import {Component, OnInit} from '@angular/core';
import {Client} from '../model/client';
import {ClientService} from '../service/client.service';

@Component({
  moduleId: module.id,
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css'],
  providers: [ClientService]
})
export class ClientComponent implements OnInit {
  user: Client;

  constructor(private httpService: ClientService) {
  }

  ngOnInit() {
    this.httpService.getData().subscribe(
      (data: Client) => this.user = data
    );
  }
}
