import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewSiteFormComponent } from './new-site-form.component';

describe('NewSiteFormComponent', () => {
  let component: NewSiteFormComponent;
  let fixture: ComponentFixture<NewSiteFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewSiteFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewSiteFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
