import { User } from "../users/users.interface";

export interface Annonce {
    id: number;
    title: string;
    description: string;
    categorie: string;
    dateCreation: Date;
    date: Date;
    image: string;
    user: User;
  }