import { Component, Inject, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UsersService } from '../../../services/users.service';
import { User } from '../../../interfaces/user';

@Component({
  selector: 'app-modal-form-user',
  templateUrl: './modal-form-user.component.html',
  styleUrl: './modal-form-user.component.scss'
})
export class ModalFormUserComponent {

  planoSaude = [ 
    {
      id: 1,
      descricao: 'Plano Basic',
    },
    {
      id: 2,
      descricao: 'Plano Medium',
    },
    {
      id: 3,
      descricao: 'Plano Plus',
    }
  ];

  planoOdonto = [ 
    {
      id: 1,
      descricao: 'Plano Basic',
    },
    {
      id: 2,
      descricao: 'Plano Medium',
    },
    {
      id: 3,
      descricao: 'Plano Plus',
    }
  ];

  formUser:FormGroup; //Ela terá os campos deste usuário, e servirá para validação dos campos
  editUser: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<ModalFormUserComponent>,
    private userService: UsersService,
    @Inject(MAT_DIALOG_DATA) public data: any, 
    ) {}

  ngOnInit() {
    this.buildForm();
    if(this.data && this.data.name) {
      this.editUser = true;
    }
  }

  saveUser() {
    const objUserForm: User = this.formUser.getRawValue();

    if(this.data && this.data.name) {

      //editar usuário
      this.userService.update(this.data.firebaseId, objUserForm).then(
        (response: any) => {
          window.alert('Usuário editado com sucesso');
          this.closeModal();
        })
        .catch(
          err => {
            window.alert('Houve um erro ao salvar o usuário');
            console.error(err);
  
          }
        )

    } else{
      //salvar usuário
      this.userService.addUser(objUserForm).then(
        (response: any) => {
          window.alert('Usuário salvo com sucesso');
          this.closeModal();
        })
        .catch(
          err => {
            window.alert('Houve um erro ao salvar o usuário');
            console.error(err);
  
          })
          }
  }

  buildForm() {
    this.formUser = this.formBuilder.group({
      name: [null, [Validators.required, Validators.minLength(3)]],
      email: [null, [Validators.required, Validators.email]],
      sector: [null, [Validators.required, Validators.minLength(2)]],
      role: [null, [Validators.required, Validators.minLength(5)]],
      healthPlan: [''],
      dentalPlan: [''],
    });

    if(this.data && this.data.name) {
      this.fillForm();
    }
  }

  // Preencher formulário para edição
  fillForm() {
    this.formUser.patchValue({
      name: this.data.name,
      email: this.data.email,
      sector: this.data.sector,
      role: this.data.role,
      healthPlan: this.data.healthPlan,
      dentalPlan: this.data.dentalPlan,
    });

  }

  closeModal() { this.dialogRef.close(); }

}

