import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  AbstractControl,
  FormGroup,
  ReactiveFormsModule,
  ValidatorFn,
  FormBuilder,
  Validators,
} from '@angular/forms';

import { AngularMaterialModule } from 'src/app/shared/angular-material/angular-material.module';
import { UserService } from 'src/app/shared/services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { log } from 'console';

@Component({
  selector: 'app-filter-form',
  standalone: true,
  imports: [CommonModule, AngularMaterialModule, ReactiveFormsModule],
  templateUrl: './filter-form.component.html',
  styleUrls: ['./filter-form.component.scss'],
})
export class FilterFormComponent implements OnInit {
  public filterForm: FormGroup;
  public selectedRole: string;
  public selectedStatus: string;

  constructor(
    private fb: FormBuilder,
    private userSerivce: UserService,
    private _snackBar: MatSnackBar
  ) {
    this.filterForm = fb.group(
      {
        name: fb.control(null, [this.loginValidator()]),
        phone: fb.control(null, [this.phoneNumberValidator()]),
        email: fb.control(null, [Validators.email]),
        role: fb.control(null),
        create_at: fb.control(null),
        update_at: fb.control(null),
        status: fb.control(null),
      },
      { validator: this.atLeastOneFieldValidator() }
    );
  }

  public ngOnInit(): void {}

  public onSubmit(): void {
    if (this.filterForm.valid) {
      this.userSerivce.setFilters(this.filterForm.value);
    } else {
      this.openSnackBar('Заполните поле для фильтрации', 'Закрыть');
    }
  }

  public onClearForm(): void {
    this.filterForm.reset();
  }

  public onCancel(): void {
    this.filterForm.reset();
    this.userSerivce.setFilters(this.filterForm.value);
  }

  private phoneNumberValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: boolean } | null => {
      if (!control.value) {
        return null;
      }

      const phoneNumberPattern = /^\+(?:[0-9] ?){6,14}[0-9]$/;

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

  private atLeastOneFieldValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: boolean } | null => {
      if (control instanceof FormGroup) {
        const fields = Object.keys(control.controls);
        const isAtLeastOneFieldFilled = fields.some(
          (field) =>
            control.get(field).value !== null && control.get(field).value !== ''
        );

        return isAtLeastOneFieldFilled
          ? null
          : { atLeastOneFieldRequired: true };
      }

      return null;
    };
  }

  private openSnackBar(message: string, action: string): void {
    this._snackBar.open(message, action, { duration: 3000 });
  }
}
