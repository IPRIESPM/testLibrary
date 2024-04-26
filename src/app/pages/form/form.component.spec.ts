import { ComponentFixture, TestBed } from "@angular/core/testing";
import { FormComponent } from "./form.component";
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

fdescribe('FormComponent', () => {

  let component: FormComponent;
  let fixture: ComponentFixture<FormComponent>;


  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule,ReactiveFormsModule],
      declarations: [FormComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("name field is required", () => {
    const field = component.form.get('name');
    field.setValue('');
    expect(field.valid).toBeFalsy();
  });

  it("name field is correct with less then 5 characters", () => {
    const field = component.form.get('name');
    field.setValue('123456');
    expect(field.valid).toBeFalsy();
  });

  it("email field is required", () => {
    const field = component.form.get('email');
    field.setValue('');
    expect(field.valid).toBeFalsy();
  });

  it("email must be valid", () => {
    const field = component.form.get('email');
    field.setValue('test@');
    expect(field.valid).toBeFalse();
    field.setValue('email@email.com');
    expect(field.valid).toBeTrue();
  });

  it("form is valid", () => {
    component.form.get('name').setValue('12345');
    component.form.get('email').setValue('email@email.com');
    expect(component.form.valid).toBeTrue();
  });

});
