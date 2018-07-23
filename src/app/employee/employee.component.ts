import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { ToastrService } from 'ngx-toastr';
import { EmployeeService } from '../shared/employee.service';

@Component({
  selector: 'employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  constructor(private employeeService: EmployeeService,
    private toastr: ToastrService) { }

  ngOnInit() {
   this.resetForm();
  }

// on submit form
  onSubmit(employeeForm: NgForm){
    if(employeeForm.value.$key == null)
  this.employeeService.insertEmployee(employeeForm.value);
  else
  this.employeeService.updateEmployee(employeeForm.value);
  this.resetForm(employeeForm);
  // 'toastr' used for notification after from submission
  this.toastr.success('Submitted Successfully', 'Employee Register');

  }

  // resetting form
  resetForm(employeeForm? : NgForm){
  if(employeeForm != null)
  employeeForm.reset();
  this.employeeService.selectedEmployee = {
  $key: null,
  name: '',
  position: '',
  office: '',
  salary: 0
}
}



}
