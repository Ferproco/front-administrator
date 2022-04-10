import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearAsignarRolesComponent } from './crear-asignar-roles.component';

describe('CrearAsignarRolesComponent', () => {
  let component: CrearAsignarRolesComponent;
  let fixture: ComponentFixture<CrearAsignarRolesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrearAsignarRolesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearAsignarRolesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
