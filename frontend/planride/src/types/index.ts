import { LocalDate } from "js-joda";

export interface Location {
    id: string;
    countryCode: string;
    name: string;
}
export interface TransportationRequest
{
    id: string;
    departureLocationId: string;
    departureDate: LocalDate;
    adults: number;
    children?: number | undefined;
    pets?: number | undefined;
}

export interface TransportationRequestDetail extends TransportationRequest
{
    contactName: string;
    contactMobile: string;
    contactEmail: string;
}