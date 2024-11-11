import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllproductsviewComponent } from './allproductsview.component';

describe('AllproductsviewComponent', () => {
  let component: AllproductsviewComponent;
  let fixture: ComponentFixture<AllproductsviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AllproductsviewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllproductsviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
