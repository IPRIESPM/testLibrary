import { ComponentFixture, TestBed } from "@angular/core/testing";
import { NavComponent } from "./nav.component";
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from "@angular/core";
import { RouterTestingModule } from "@angular/router/testing";

class ComponentTestRoute{}

describe("NavComponent", () => {
  let component: NavComponent;
  let fixture: ComponentFixture<NavComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([
          { path: "home", component:ComponentTestRoute },
          { path: "cart", component:ComponentTestRoute },
        ])
      ],
      declarations: [NavComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    }).compileComponents();

  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should navigate", () => {
    const navigateSpy = spyOn((<any>component).router, "navigate");
    component.navTo("home");
    expect(navigateSpy).toHaveBeenCalledWith(["/home"]);

    component.navTo("cart");
    expect(navigateSpy).toHaveBeenCalledWith(["/cart"]);
  });

});
