import {Client} from './client';
import {Tour} from './tour';

export class Order {
  id: number;
  date: Date;
  notes: string;
  stateOrder: boolean;
  tour: Tour = new Tour();
  client?: Client;
}
