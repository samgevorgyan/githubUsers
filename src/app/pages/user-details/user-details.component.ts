import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Observable, Subscription} from 'rxjs';
import {tap} from 'rxjs/operators';
import {HttpService} from '../../services/http.service';
import {SharedService} from '../../services/shared.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit, OnDestroy {
  private routeSub: Subscription;
  public UserInfo$: Observable<any>;
  public UserRepos$: Observable<any>;
  public UserFollowers$: Observable<any>;


  constructor(private shared: SharedService,
              private route: ActivatedRoute,
              private http: HttpService) {
  }

  ngOnInit() {
    this.routeSub = this.route.params.subscribe(params => {
      const userName = params.login;
      this.getUserByLogin(userName);
      this.getUserFollowers(userName);
    });

  }

  getUserByLogin(user) {
    const url = `https://api.github.com/users/${user}`;
    this.UserInfo$ = this.http.getData(url).pipe(
      tap(res => {
        this.getUserRepos(user, res.public_repos);
      }),
    );
  }

  getUserRepos(user, repoCount) {
    const url = `https://api.github.com/users/${user}/repos?per_page=${repoCount}  `;
    this.UserRepos$ = this.http.getData(url);
  }

  getUserFollowers(user) {
    const url = `https://api.github.com/users/${user}/followers`;
    this.UserFollowers$ = this.http.getData(url);
  }

  ngOnDestroy() {
    this.routeSub.unsubscribe();
  }
}
