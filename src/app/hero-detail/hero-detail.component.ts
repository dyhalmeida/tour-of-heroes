import { Component, Input, OnInit } from '@angular/core';
import { IHero } from '../interfaces/hero.interface';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrl: './hero-detail.component.css'
})
export class HeroDetailComponent implements OnInit {
  @Input() hero?: IHero

  constructor(
    private location: Location,
    private activatedRoute: ActivatedRoute,
    private heroService: HeroService
  ){}

  ngOnInit(): void {
    this.getHero();
  }

  getHero() {
    const heroId = Number(this.activatedRoute.snapshot.paramMap.get('id'))
    this.heroService
      .getHero(heroId)
      .subscribe((hero) => this.hero = hero)
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    if (this.hero?.id) {
      this.heroService.updateHero(this.hero)
        .subscribe(() => this.goBack())
    }
  }
}
