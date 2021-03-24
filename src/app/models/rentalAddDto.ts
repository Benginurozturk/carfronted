
export class RentalAddDto {
    carId!: string;
    customerId!: number;
    rentStartDate!: Date;
    rentEndDate!: Date;
    returnDate?: Date;
}
