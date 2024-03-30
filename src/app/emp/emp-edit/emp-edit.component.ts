import { Component, OnInit } from '@angular/core';
import { Emp } from '../../model/emp';
import { EmpService } from '../../services/emp.service';
import { ActivatedRoute, Route, Router } from '@angular/router';

@Component({
  selector: 'app-emp-edit',
  templateUrl: './emp-edit.component.html',
  styleUrl: './emp-edit.component.css',
})
export class EmpEditComponent implements OnInit {
  id: string = '';
  employee = new Emp(0, '', 0, '');
  submitted = false;
  message: string = '';
  result: string = '';

  constructor(
    private empService: EmpService,
    private route: ActivatedRoute,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.id = <string>this.route.snapshot.paramMap.get('id');
    this.empService.getById(this.id).subscribe({
      next: (data) => {
        this.employee = data;
      },
      error: (err) => {
        this.message = JSON.parse(err.error).message;
      },
    });
  }

  saveEmployee(): void {
    this.empService.update(this.id, this.employee).subscribe({
      next: (data) => {
        console.log('data', data);
        this.submitted = true;
        this.result = data;
        this.router.navigate([
          { outlets: { primary: 'navbar', contenu: 'employees' } },
        ]);
      },

      error: (error) => {
        this.message = error.message;
        console.log(error);
      },

      complete: () => console.log('completed'),
    });
  }
}
