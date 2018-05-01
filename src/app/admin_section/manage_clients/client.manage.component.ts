import {Component, OnInit} from '@angular/core';
import {ClientService} from '../../service/client.service';
import {HttpClient} from '@angular/common/http';
import {Client} from '../../model/client';

@Component({
  moduleId: module.id,
  templateUrl: './client.manage.component.html',
  styleUrls: ['./client.manage.component.css'],
  providers: [ClientService]
})
export class ClientManageComponent implements OnInit {
  clients: Client[];
  currentClient: Client;
  birthDate: string;
  isVisibleInfo = false;

  constructor(private http: HttpClient,
              private clientService: ClientService) {
  }

  ngOnInit() {
    this.clientService.getClientList().subscribe(
      (data: Client[]) => {
        this.clients = data;
        for (let index = 0; index < this.clients.length; index++) {
          this.clients[index].birthDate = new Date(+this.clients[index].birthDate);
          const date = this.clients[index].birthDate;
          date.setHours(date.getHours() + -date.getTimezoneOffset() / 60);
          this.clients[index].birthDate = date;
        }
        this.switchClient('0');
      }
    );
  }

  switchClient(id): void {
    this.isVisibleInfo = true;
    this.currentClient = this.clients.find(value => value.id === parseInt(id, 0));
    this.birthDate = this.currentClient.birthDate.toISOString().substring(0, 10);
  }

  deleteClient(): void {
    const index = this.clients.indexOf(this.currentClient);
    if (index > -1) {
      this.clients.splice(index, 1);
    }
    this.clientService.deleteClient(this.currentClient.id).subscribe();
    this.currentClient = null;
  }
}
