import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {Subscription} from 'rxjs';
import {SharedService} from '../../services/shared.service';



@Component({
  selector: 'app-search-user-result',
  templateUrl: './search-user-result.component.html',
  styleUrls: ['./search-user-result.component.scss']
})
export class SearchUserResultComponent implements OnInit, OnDestroy {


  displayedColumns: string[] = [ 'avatar', 'login' ];
  dataSource: MatTableDataSource<any>;
  resultSubscription: Subscription;
  searchResult;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private shared: SharedService) {

  }

  ngOnInit() {
    this.resultSubscription = this.shared.getMessage().subscribe(usersFromServer => {
      console.log('messagemessage', usersFromServer);
      this.setDataSource(usersFromServer);
    });

  }
  setDataSource(usersFromServer) {
    this.searchResult = {...usersFromServer};
    this.dataSource = new MatTableDataSource(this.searchResult.items);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  ngOnDestroy() {
    this.resultSubscription.unsubscribe();
  }

}

