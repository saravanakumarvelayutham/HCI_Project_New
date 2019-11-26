import { Component, OnInit, Inject, ViewChild, NgZone } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Event } from '../model/event';
import RRule from 'rrule';
import { ObjectID } from 'bson';
import { EventService } from '../service/event.service';
import { RandomColor } from 'angular-randomcolor';
import { MapsAPILoader } from '@agm/core';
import { LocationService } from '../service/location.service';
import { } from 'googlemaps';
import {Location, Appearance} from '@angular-material-extensions/google-maps-autocomplete';
import PlaceResult = google.maps.places.PlaceResult;

@Component({
  selector: 'app-addeventdialog',
  templateUrl: './addeventdialog.component.html',
  styleUrls: ['./addeventdialog.component.css']
})
export class AddeventdialogComponent implements OnInit {
  
  public appearance = Appearance;
  public eventForm : FormGroup;
  public eventData: any; 
  public repeatTypes = [
    {value : RRule.SECONDLY, viewValue: 'Second'},
    {value : RRule.MINUTELY, viewValue: 'Minute'},
    {value : RRule.HOURLY, viewValue: 'Hour'},
    {value : RRule.DAILY, viewValue: 'Day'},
    {value : RRule.WEEKLY, viewValue: 'Week'},
    {value : RRule.MONTHLY, viewValue: 'Month'},
    {value : RRule.YEARLY, viewValue: 'Year'}
  ];
  public repeatDays = [
    {value : RRule.MO, viewValue: 'Monday'},
    {value : RRule.TU, viewValue: 'Tuesday'},
    {value : RRule.WE, viewValue: 'Wednesday'},
    {value : RRule.TH, viewValue: 'Thursday'},
    {value : RRule.FR, viewValue: 'Friday'},
    {value : RRule.SA, viewValue: 'Saturday'},
    {value : RRule.SU, viewValue: 'Sunday'}
  ]
  public zoom: number;
  public latitude: number;
  public longitude: number;
  public selectedAddress: any;
  addressControl = new FormControl();

  constructor(
    public dialogRef: MatDialogRef<AddeventdialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any,private builder: FormBuilder,
    private eventSerive: EventService,  private mapsAPILoader: MapsAPILoader, private ngZone: NgZone,
    private locationService: LocationService) {

      this.locationService.getCurrentLocation().subscribe(result => {
        this.latitude = result.latitude;
        this.longitude = result.longitude;
      })
      const defaultDate = this.toDatetimeLocal(new Date())
      var endDate = new Date()
      endDate.setDate(endDate.getDate() + 1)
      this.eventData = {
        startDate : defaultDate,
        title: '',
        notes : '',
        recurring: false,
        repeatEvery: 1,
        repeatType : this.repeatTypes[3],
        repeatDays : this.repeatDays.slice(0,5),
        endDate : this.toDatetimeLocal(endDate),
        location : {
          latitude : this.latitude,
          longitude : this.longitude
        },
        address: ''
      };      
      this.eventForm = builder.group({
        title: this.eventData.title,
        startDate : this.eventData.startDate,
        notes : this.eventData.notes,
        recurring : this.eventData.recurring,
        repeatEvery : this.eventData.repeatEvery,
        repeatType: this.eventData.repeatType,
        repeatDays : this.eventData.repeatDays,
        endDate : this.eventData.endDate,
        addressControl : this.eventData.address
      })
    }

  add(): void {
    var newEvent = new Event();
    newEvent.id = new ObjectID();
    newEvent.title = this.eventData.title;
    let rule: RRule;
    if(this.eventData.recurring) {
      rule = new RRule({
        freq: this.eventData.repeatEvery.value,
        interval: this.eventData.repeatEvery,
        dtstart: new Date(this.eventData.startDate),
        until: new Date(this.eventData.endDate),
        byweekday: this.eventData.repeatDays.map(repeateDay => repeateDay.value)
      })
    } else {
      rule = new RRule({
        freq: this.eventData.repeatEvery.value,
        interval: 1,
        count: 1,
        dtstart: new Date(this.eventData.startDate),
        until: new Date(this.eventData.endDate)
      })
    }
    newEvent.rrule = rule.toString()
    newEvent.startDate = this.eventData.startDate;
    newEvent.endDate = this.eventData.endDate;
    newEvent.color = RandomColor.generateColor();
    newEvent.location = {
      latitude : this.latitude,
      longitude: this.longitude,
      address: this.selectedAddress
    }
    this.eventSerive.addEvent(newEvent).subscribe(result=> {
      this.data.events = this.data.events.concat(newEvent);
    });
    this.dialogRef.close();
  }

  ngOnInit() {    
    this.zoom = 10;
    this.locationService.getCurrentLocation();
  }

  onLocationSelected(location: Location) {
    this.latitude = location.latitude;
    this.longitude = location.longitude;
  }

  onAutocompleteSelected(result: PlaceResult) {
    this.selectedAddress = result['formatted_address'];
  }

  cancel():void {
    this.dialogRef.close();
  }

  toDatetimeLocal(date: Date) {
      const ten = function (i) {
        return (i < 10 ? '0' : '') + i;
      },
      YYYY = date.getFullYear(),
      MM = ten(date.getMonth() + 1),
      DD = ten(date.getDate()),
      HH = ten(date.getHours()),
      II = ten(date.getMinutes()),
      SS = ten(date.getSeconds())
    ;
    return YYYY + '-' + MM + '-' + DD + 'T' +
             HH + ':' + II + ':' + SS;
  };
}
