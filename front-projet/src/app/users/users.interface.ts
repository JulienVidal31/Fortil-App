export interface User {
    id: number;
    name: string;
    lastName: string;
    email: string;
    password: string;
    role: string;
  }

  export class UserInit {
    id: number = 1;
    name: string = '';
    lastName: string = '';
    email: string = '';
    password: string = '';
    role: string = '';
  }