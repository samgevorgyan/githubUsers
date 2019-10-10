import {Component, OnInit} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {HttpService} from '../../services/http.service';
import {SharedService} from '../../services/shared.service';

export interface User {
  name: string;

}

@Component({
  selector: 'app-search-users',
  templateUrl: './search-users.component.html',
  styleUrls: ['./search-users.component.scss']
})

export class SearchUsersComponent implements OnInit {
  public options: User[] = [];
  searchForm = this.fb.group({
    search_input: [''],


  });
  public filteredOptions: Observable<User[]>;
  private searchValue: string;
  private requestType = false;

  constructor(private http: HttpService,
              private shared: SharedService,
              private fb: FormBuilder) {
  }

  get get_search_input() {
    return this.searchForm.get('search_input');
  }

  ngOnInit() {
    this.onSearchChanges();
    this.searchValue = this.get_search_input.value;

  }

  displayFn(user?: User): string | undefined {
    return user ? user.name : undefined;
  }

  onSubmit() {
    this.getUsers(true);
  }

  getUsers(byButton?: boolean) {
    if (this.searchValue) {
      const url = `https://api.github.com/search/users?q=${this.searchValue}`;
      this.filteredOptions = this.http.getData(url).pipe(
        map((res: any) => {
          if (this.requestType || byButton) {
            this.shared.sendMessage('subjectForResult', res);
          }
          this.options = [];
          res.items.forEach(key => {
            this.options.push({
              name: key.login,
            });
          });
          console.log('optionsoptions', this.options);
          return this.options;
        }),
      );
    }

  }

  checkForValue(val) {
    if (typeof val === 'string') {
      this.searchValue = val;
      this.requestType = false;
    } else {
      this.searchValue = val.name;
      this.requestType = true;

    }
  }

  onSearchChanges(): void {
    this.get_search_input.valueChanges.pipe(
    ).subscribe((val) => {
      console.log('val', val);
      this.checkForValue(val);
      this.getUsers();
    });
  }

}
