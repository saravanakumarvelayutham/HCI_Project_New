export class Event {
    id : String ;
    title: String;
    rrule: any;
    color : string;
    startDate : Date;
    endDate : Date;
    address: any;
    location: {
        latitude: number | null,
        longitude : number | null,
        address: string | null
    }
}
