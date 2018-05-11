import {Component, OnInit} from '@angular/core';
import {OrderService} from '../../service/order.service';
import {UserService} from '../../service/user.service';
import {User} from '../../model/user';
import {Order} from '../../model/order';
import {Client} from '../../model/client';

@Component({
  moduleId: module.id,
  templateUrl: './client.order.component.html',
  styleUrls: ['./client.order.component.css'],
  providers: [OrderService]
})
export class ClientOrderComponent implements OnInit {
  currentClient: Client;
  currentUser: User = new User();
  orders: Order[] = [];
  allPrice = 0;

  constructor(private orderService: OrderService,
              private userService: UserService) {
  }

  ngOnInit() {
    this.userService.getAllUsers().subscribe(
      (data: User[]) => {
        const json = localStorage.getItem('currentUser');
        const user = json ? JSON.parse(json) : null;
        this.currentUser = data.find(value => value.username === user.username);
        this.currentClient = Object.assign(new Client(), this.currentUser.client);
        this.orderService.getAllOrders(this.currentClient).subscribe(
          (value: Order[]) => {
            this.orders = value.map(x => Object.assign(new Order(), x));
            for (let item = 0; item < this.orders.length; item++) {
              this.allPrice += this.orders[item].tour.price;
            }
          }
        );
      }
    );
  }

  timestampToDateString(ts: number): string {
    return new Date(ts).toLocaleDateString();
  }

  removeOrder(order: Order): void {
    const index = this.orders.indexOf(order);
    if (index > -1) {
      this.orders.splice(index, 1);
    }
    this.orderService.deleteOrder(order).subscribe();
  }
}
