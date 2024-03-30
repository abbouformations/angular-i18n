import { Component, OnInit, ViewChild } from '@angular/core';
import { EmpService } from '../../services/emp.service';
import { TokenStorageService } from '../../services/token-storage.service';
import { Emp } from '../../model/emp';

import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-emp-list',
  templateUrl: './emp-list.component.html',
  styleUrl: './emp-list.component.css',
})
export class EmpListComponent implements OnInit {
  employees?: any;
  errormessage?: string;
  currentEmployee: Emp = new Emp(0, '', 0, '');
  currentIndex = -1;
  name = '';
  isAdmin: boolean = false;

  loading: boolean = true;
  dataSource = new MatTableDataSource<any>();

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  constructor(
    private empService: EmpService,
    private tokenStorageService: TokenStorageService
  ) {}

  ngOnInit(): void {
    this.empService.getIntervals('0', '5').subscribe({
      next: (data) => {
        if (this.tokenStorageService.hasRole('ADMIN')) {
          this.isAdmin = true;
        }
        this.loading = false;
        this.employees = data.employees;
        this.employees.length = data.size;
        this.dataSource = new MatTableDataSource<any>(this.employees);
        this.dataSource.paginator = this.paginator;
      },

      error: (err) => {
        this.errormessage = JSON.parse(err.error).message;
      },

      complete: () => console.log('completed'),
    });
  }

  getNextData(currentSize: number, page: string, size: string) {
    this.empService.getIntervals(page, size).subscribe((response: any) => {
      this.loading = false;
      this.employees.length = currentSize;
      this.employees.push(...response.employees);
      this.employees.length = response.size;
      this.dataSource = new MatTableDataSource<any>(this.employees);
      this.dataSource._updateChangeSubscription();
      this.dataSource.paginator = this.paginator;
    });
  }

  pageChanged(event: PageEvent) {
    this.loading = true;
    let pageIndex = event.pageIndex;
    let pageSize = event.pageSize;
    let previousSize = pageSize * pageIndex;
    this.getNextData(previousSize, pageIndex.toString(), pageSize.toString());
  }
}
