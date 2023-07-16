import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { DataStorageService } from './PerfilUsuarios/data-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  currentRoute: string = ''; // Valor inicial asignado

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private dataStorageService: DataStorageService) {}

  ngOnInit() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.currentRoute = this.getCurrentRoute(this.activatedRoute);
      }
    });
  }

  private getCurrentRoute(route: ActivatedRoute): string {
    while (route.firstChild) {
      route = route.firstChild;
    }
    return route.snapshot.routeConfig?.path ?? '';
  }
}