import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularMaterialModule } from 'src/app/shared/angular-material/angular-material.module';

@Component({
  selector: 'app-small-side-bar',
  standalone: true,
  imports: [CommonModule, AngularMaterialModule],
  templateUrl: './small-side-bar.component.html',
  styleUrls: ['./small-side-bar.component.scss'],
})
export class SmallSideBarComponent {}
