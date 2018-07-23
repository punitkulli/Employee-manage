import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../shared/employee.service';
import { Employee } from '../shared/employee.model';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {
  // in order to fetch list of employee from db 'Employee[]' is used
employeeList : Employee[];
  constructor(private employeeService: EmployeeService,
  private toastr: ToastrService) { }

  ngOnInit() {
  var x = this.employeeService.getData();
  x.snapshotChanges().subscribe(item => {
    this.employeeList = [];// blank array for employee list
    item.forEach(element =>{
      var y = element.payload.toJSON();
      y["$key"] = element.key;
      this.employeeList.push(y as Employee);
    });
  });
  }

  onEdit(emp: Employee){
    this.employeeService.selectedEmployee = Object.assign( {},emp );
  }
  
  onDelete(key:string){
    if (confirm('Are you sure to delete this record ?') == true) {
      this.employeeService.deleteEmployee(key);
      this.toastr.warning("Deleted Successfully", "Employee register");
    }
  }



}
 