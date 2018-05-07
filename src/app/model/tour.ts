import {Hotel} from './hotel';

export class Tour {
  id: number;
  name: string;
  startDate: Date;
  endDate: Date;
  price: number;
  description: string;
  hotel: Hotel;
}
