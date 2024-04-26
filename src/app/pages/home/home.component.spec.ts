import { ComponentFixture, TestBed } from "@angular/core/testing";
import { HomeComponent } from "./home.component";
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from "@angular/core";
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BookService } from "src/app/services/book.service";
import { Book } from "src/app/models/book.model";
import { of } from "rxjs";

const listBook: Book[] = [
  {
    name: "Book 1",
    author: "Author 1",
    isbn: "123456",
    price: 100,
    amount: 2,
  },
  {
    name: "Book 2",
    author: "Author 2",
    isbn: "1234567",
    price: 200,
    amount: 3,
  },
  {
    name: "Book 3",
    author: "Author 3",
    isbn: "12345678",
    price: 300,
    amount: 4,
  },
];
const bookServiceMock = {
  getBooks: () => of(listBook)
};

describe('HomeComponent', () => {
  let homeComponent: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;


  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [HomeComponent],
      providers: [
        {
          provide: BookService,
          useValue: bookServiceMock
        }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA,NO_ERRORS_SCHEMA]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    homeComponent = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(homeComponent).toBeTruthy();
  });

  it('getBooks from the subscription', () => {
    const bookService = fixture.debugElement.injector.get(BookService);
    const listBook:Book[] = [];
    const spy = spyOn(bookService, 'getBooks').and.returnValue(of(listBook));
    homeComponent.getBooks();
    expect(spy).toHaveBeenCalled();
    expect(homeComponent.listBook).toEqual(listBook);
  });
});
