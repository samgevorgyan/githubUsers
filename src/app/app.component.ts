import {Component, OnInit} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {Subscription} from 'rxjs';
import {slideInAnimation} from './app.animation';
import {SharedService} from './services/shared.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    slideInAnimation

  ]
})
export class AppComponent implements OnInit {
  title = 'githupUsers';
  public colorTheme = '';
  themeSubscription: Subscription;

  constructor(private shared: SharedService) {

  }

  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData.animation;
  }

  ngOnInit(): void {
    this.themeSubscription = this.shared.getMessage('subjectForTheme').subscribe(color => {
      console.log('messagemessage', color);
      switch (color) {

        case 'green': {
          this.colorTheme = 'green';
          break;
        }
        case 'pink': {
          this.colorTheme = 'pink';
          break;
        }
        default:  {
          this.colorTheme = '';
        }

      }

    });
  }
}
