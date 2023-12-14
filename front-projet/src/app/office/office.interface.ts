import { Reservations } from "./reservation.interface";

export interface Office {
    id: number;
    assign: boolean;
    withScreen: boolean;
    reservations: Reservations[]
}