/* tslint:disable */
/* eslint-disable */
/**
 * PlanRide.Api
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: 1.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { exists, mapValues } from '../runtime';
/**
 * 
 * @export
 * @interface TransportationOfferDetailsViewModel
 */
export interface TransportationOfferDetailsViewModel {
    /**
     * 
     * @type {string}
     * @memberof TransportationOfferDetailsViewModel
     */
    id: string;
    /**
     * 
     * @type {string}
     * @memberof TransportationOfferDetailsViewModel
     */
    userId: string;
    /**
     * 
     * @type {string}
     * @memberof TransportationOfferDetailsViewModel
     */
    userName: string;
    /**
     * 
     * @type {string}
     * @memberof TransportationOfferDetailsViewModel
     */
    departureCountryCode: string;
    /**
     * 
     * @type {number}
     * @memberof TransportationOfferDetailsViewModel
     */
    departureCityId: number;
    /**
     * 
     * @type {string}
     * @memberof TransportationOfferDetailsViewModel
     */
    departureCityName: string;
    /**
     * 
     * @type {string}
     * @memberof TransportationOfferDetailsViewModel
     */
    destinationCountryCode: string;
    /**
     * 
     * @type {number}
     * @memberof TransportationOfferDetailsViewModel
     */
    destinationCityId: number;
    /**
     * 
     * @type {string}
     * @memberof TransportationOfferDetailsViewModel
     */
    destinationCityName: string;
    /**
     * 
     * @type {number}
     * @memberof TransportationOfferDetailsViewModel
     */
    numberOfSeats: number;
    /**
     * ISO-8601 date string
     * @type {Date}
     * @memberof TransportationOfferDetailsViewModel
     */
    departureDate: Date;
    /**
     * ISO-8601 time string (HH:mm)
     * @type {string}
     * @memberof TransportationOfferDetailsViewModel
     */
    departureTime: string;
    /**
     * 
     * @type {string}
     * @memberof TransportationOfferDetailsViewModel
     */
    firstName: string;
    /**
     * 
     * @type {string}
     * @memberof TransportationOfferDetailsViewModel
     */
    lastName: string;
    /**
     * 
     * @type {string}
     * @memberof TransportationOfferDetailsViewModel
     */
    email: string;
    /**
     * 
     * @type {string}
     * @memberof TransportationOfferDetailsViewModel
     */
    mobile: string;
    /**
     * 
     * @type {string}
     * @memberof TransportationOfferDetailsViewModel
     */
    comments?: string | null;
    /**
     * 
     * @type {Date}
     * @memberof TransportationOfferDetailsViewModel
     */
    dateCreated: Date;
}

export function TransportationOfferDetailsViewModelFromJSON(json: any): TransportationOfferDetailsViewModel {
    return TransportationOfferDetailsViewModelFromJSONTyped(json, false);
}

export function TransportationOfferDetailsViewModelFromJSONTyped(json: any, ignoreDiscriminator: boolean): TransportationOfferDetailsViewModel {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'id': json['id'],
        'userId': json['userId'],
        'userName': json['userName'],
        'departureCountryCode': json['departureCountryCode'],
        'departureCityId': json['departureCityId'],
        'departureCityName': json['departureCityName'],
        'destinationCountryCode': json['destinationCountryCode'],
        'destinationCityId': json['destinationCityId'],
        'destinationCityName': json['destinationCityName'],
        'numberOfSeats': json['numberOfSeats'],
        'departureDate': (new Date(json['departureDate'])),
        'departureTime': json['departureTime'],
        'firstName': json['firstName'],
        'lastName': json['lastName'],
        'email': json['email'],
        'mobile': json['mobile'],
        'comments': !exists(json, 'comments') ? undefined : json['comments'],
        'dateCreated': (new Date(json['dateCreated'])),
    };
}

export function TransportationOfferDetailsViewModelToJSON(value?: TransportationOfferDetailsViewModel | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'id': value.id,
        'userId': value.userId,
        'userName': value.userName,
        'departureCountryCode': value.departureCountryCode,
        'departureCityId': value.departureCityId,
        'departureCityName': value.departureCityName,
        'destinationCountryCode': value.destinationCountryCode,
        'destinationCityId': value.destinationCityId,
        'destinationCityName': value.destinationCityName,
        'numberOfSeats': value.numberOfSeats,
        'departureDate': (value.departureDate.toISOString().substr(0,10)),
        'departureTime': value.departureTime,
        'firstName': value.firstName,
        'lastName': value.lastName,
        'email': value.email,
        'mobile': value.mobile,
        'comments': value.comments,
        'dateCreated': (value.dateCreated.toISOString()),
    };
}

