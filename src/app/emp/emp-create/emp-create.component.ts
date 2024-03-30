import { Component } from '@angular/core';
import { Emp } from '../../model/emp';
import { EmpService } from '../../services/emp.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-emp-create',
  templateUrl: './emp-create.component.html',
  styleUrl: './emp-create.component.css',
})
export class EmpCreateComponent {
  employee = new Emp(0, '', 0, '');
  submitted = false;
  message: string = '';
  result: string = '';
  isSaved: boolean = false;

  constructor(
    private empService: EmpService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  createEmployee(): void {
    this.empService.create(this.employee).subscribe({
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

  save(): void {
    this.isSaved = true;
  }
}
