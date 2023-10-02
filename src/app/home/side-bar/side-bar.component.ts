import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularMaterialModule } from 'src/app/shared/angular-material/angular-material.module';

@Component({
  selector: 'app-side-bar',
  standalone: true,
  imports: [CommonModule, AngularMaterialModule],
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss'],
})
export class SideBarComponent {}
