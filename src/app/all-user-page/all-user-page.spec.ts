import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllUserPage } from './all-user-page';

describe('AllUserPage', () => {
  let component: AllUserPage;
  let fixture: ComponentFixture<AllUserPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AllUserPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllUserPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
