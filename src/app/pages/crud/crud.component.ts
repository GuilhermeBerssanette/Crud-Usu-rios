import {Component, ViewChild} from '@angular/core';
import { UsersService } from '../../services/users.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { User } from '../../interfaces/user';
import { MatDialog } from '@angular/material/dialog';
import { ModalViewUserComponent } from './modal-view-user/modal-view-user.component';

@Component({
  selector: 'app-crud',
  templateUrl: './crud.component.html',
  styleUrl: './crud.component.scss',
})
export class CrudComponent {

  displayedColumns: string[] = ['id', 'name', 'email', 'role', 'benefits', 'action'];
  dataSource: any;
  listusers: User[] = [];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor (
    private userService: UsersService,
    public dialog: MatDialog,

  ) {
    this.dataSource = new MatTableDataSource<any>(this.listusers);
  }

  ngOnInit () {
    this.getListUsers();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  getListUsers() {
    this.userService.getAllUsers().subscribe({
      next: (response: any) => {
        console.log('lista de usuários firebase', response);
        this.listusers = response;

        this.dataSource = new MatTableDataSource<any>(this.listusers);
        this.dataSource.sort = this.sort;
      },
      error: (err) => {
        console.error(err);
      }
    });
    //subscribe é uma inscrição que faz a conexão do Front com o Back
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  //Logica Modal
  openModalViewUser(user: User) {
    this.dialog.open(ModalViewUserComponent, {
      width: '700px',
      height: '330px',
      data: user
    })
  }

}
