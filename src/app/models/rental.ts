export interface Rental{
    id?: number,
    carID:number,
    customerID: number;
    rentStartDate: Date,
    rentEndDate: Date,
    returnDate?: Date,
}

