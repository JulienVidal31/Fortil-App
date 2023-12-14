import { User } from "../users/users.interface";

// export interface Reservation {
//     date: Date;
// }

export class Reservation {
    date!: Date;
}

export interface Reservations {
    id: number;
    date: string;
    user: User
}