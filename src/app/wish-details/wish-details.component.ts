import { Component, Input, OnInit } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Duty } from '../_models/duty';
import { BaseWish } from '../_models/wish';
import { WishService } from '../_services/wish.service';

@Component({
  selector: 'app-wish-details',
  templateUrl: './wish-details.component.html',
  styleUrls: ['./wish-details.component.css']
})
export class WishDetailsComponent implements OnInit {
  @Input() duty: Duty;
  displayedColumns: string[] = ['target-icon', 'type-target', 'status', 'reason', 'edit'];
  wishes: Observable<BaseWish[]>;

  constructor(private wishService: WishService) {
    // Intentionally empty
  }

  ngOnInit(): void {
    // Join Observables from DutyWishes and DateWishes
    this.wishes = forkJoin([
      this.wishService.getDutyWishesForDuty(this.duty.dutyId),
      this.wishService.getDateWishesForDate(this.duty.start)
    ]).pipe(map(([dutyWishes, dateWishes]) => dutyWishes.concat(dateWishes)));
  }
}
