import {Client} from './client';

export class User {
  id: number;
  username: string;
  password: string;
  enabled: boolean;
  client: Client;
}
