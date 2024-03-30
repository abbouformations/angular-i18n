import { Component, Input } from '@angular/core';
import { EmpService } from '../../services/emp.service';
import { Router } from '@angular/router';

@Component({
  selector: '[employee-detail]',
  templateUrl: './emp-detail.component.html',
  styleUrl: './emp-detail.component.css',
})
export class EmpDetailComponent {
  @Input()
  employee: any;
  message: string = '';
  constructor(private empService: EmpService, private router: Router) {}
  deleteEmployee(id: number) {
    this.empService.delete(id).subscribe({
      next: (data) => {
        this.message = data;
        window.location.reload();
      },
      error: (err) => {},
    });
  }
}
