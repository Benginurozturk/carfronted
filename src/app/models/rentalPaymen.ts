import { Rental } from "./rental";

export interface RentalPayment extends Rental{
    totalPrice:number;
}