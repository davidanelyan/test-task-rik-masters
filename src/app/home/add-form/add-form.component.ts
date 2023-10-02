import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  ValidatorFn,
  Validators,
} from '@angular/forms';

import { AngularMaterialModule } from 'src/app/shared/angular-material/angular-material.module';
import { UserService } from 'src/app/shared/services/user.service';
import { FinallyUser } from 'src/app/shared/interfaces/user.interface';

@Component({
  selector: 'app-add-form',
  standalone: true,
  imports: [CommonModule, AngularMaterialModule, ReactiveFormsModule],
  templateUrl: './add-form.component.html',
  styleUrls: ['./add-form.component.scss'],
})
export class AddFormComponent {
  public additionForm: FormGroup;
  public selectedRole: string;

  constructor(private fb: FormBuilder, private userService: UserService) {
    this.additionForm = fb.group({
      name: fb.control(null, [Validators.required, this.loginValidator()]),
      phone: fb.control(null, [
        Validators.required,
        this.phoneNumberValidator(),
      ]),
      email: fb.control(null, [Validators.required, Validators.email]),
      role: fb.control(false),
    });
  }

  public onSubmit(): void {
    const addedUser: FinallyUser = {
      name: this.additionForm.value.name,
      email: this.additionForm.value.email,
      phone: this.additionForm.value.phone,
      create_at: +new Date(),
      update_at: +new Date(),
      role: this.additionForm.value.role,
      isEcp: true,
      status: 'ACTIVE',
    };
    this.userService.setAddedUser(addedUser);
  }

  public onClearForm(): void {
    this.additionForm.reset();
  }

  private phoneNumberValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: boolean } | null => {
      if (!control.value) {
        return null;
      }

      const phoneNumberPattern = /^[0-9]+$/;

      if (!phoneNumberPattern.test(control.value)) {
        return { invalidPhoneNumber: true };
      }

      return null;
    };
  }

  private loginValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: boolean } | null => {
      if (!control.value) {
        return null;
      }

      const loginPatern = /^[a-zA-Z0-9_]+$/;

      if (!loginPatern.test(control.value)) {
        return { invalidLogin: true };
      }

      return null;
    };
  }
}
