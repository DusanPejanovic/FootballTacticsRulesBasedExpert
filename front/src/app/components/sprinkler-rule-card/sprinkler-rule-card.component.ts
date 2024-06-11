import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {SprinklerRule} from "../../model/Device";

@Component({
  selector: 'app-sprinkler-rule-card',
  templateUrl: './sprinkler-rule-card.component.html',
  styleUrls: ['./sprinkler-rule-card.component.css']
})
export class SprinklerRuleCardComponent implements OnInit{

  @Input() rule?: SprinklerRule;
  @Output() itemDeleted = new EventEmitter<string>();

  fromTime?: string;
  toTime?: string;

  constructor() {

  }
  minutesToTimeString(minutes: number): string {
    if (minutes < 0 || minutes >= 1440) {
      throw new Error("Invalid input: Minutes should be between 0 and 1439");
    }

    let hours = Math.floor(minutes / 60);
    let mins = minutes % 60;
    const amPm = hours >= 12 ? 'PM' : 'AM';

    hours = hours % 12;
    hours = hours ? hours : 12; // Convert hour '0' to '12'

    const formattedHours = hours < 10 ? `0${hours}` : `${hours}`;
    const formattedMinutes = mins < 10 ? `0${mins}` : `${mins}`;

    return `${formattedHours}:${formattedMinutes} ${amPm}`;
  }

  ngOnInit(): void {
    this.fromTime = this.minutesToTimeString(this.rule!.fromMinute);
    this.toTime = this.minutesToTimeString(this.rule!.toMinute);
  }

  deleteItem(){
    this.itemDeleted.emit(this.rule?.id);
  }
}
