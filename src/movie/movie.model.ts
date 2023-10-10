import { Prisma } from "@prisma/client";


export class Movie implements Prisma.MovieCreateInput{
     id: number;
     title: string;
     year: string;
     image: string;
}