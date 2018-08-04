import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [ './dashboard.component.css' ]
})
export class DashboardComponent implements OnInit {
  heroes: Hero[] = [];
  time : Observable<string>;

  constructor(private heroService: HeroService) {
    this.time = new Observable<string>(
      observer => {setInterval(() => observer.next(new Date().toString()), 1000);return {unsubscribe(){}};}
    );
 }

  ngOnInit() {
    this.getHeroes();
  }

  getHeroes(): void {
    this.heroService.getHeroes()
      //Fetch top four
      .subscribe(heroes => this.heroes = heroes.slice(0, 4));
  }
}
