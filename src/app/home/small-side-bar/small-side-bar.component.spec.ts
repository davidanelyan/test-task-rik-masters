import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SmallSideBarComponent } from './small-side-bar.component';

describe('SmallSideBarComponent', () => {
  let component: SmallSideBarComponent;
  let fixture: ComponentFixture<SmallSideBarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SmallSideBarComponent]
    });
    fixture = TestBed.createComponent(SmallSideBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
