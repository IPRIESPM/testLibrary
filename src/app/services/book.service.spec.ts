import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";
import { BookService } from './book.service';
import { TestBed } from "@angular/core/testing";
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from "@angular/core";
import { Book } from "../models/book.model";
import { environment } from "src/environments/environment.prod";
import Swal from "sweetalert2";


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

const book: Book =   {
  name: "Book 1",
  author: "Author 1",
  isbn: "123456",
  price: 100,
  amount: 2,
};

let storage = {};

describe("BookService", () => {
  let service: BookService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [BookService],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA,
        NO_ERRORS_SCHEMA
      ]
    });

    service = TestBed.inject(BookService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  beforeEach(() => {
    service = TestBed.inject(BookService);
    httpMock = TestBed.inject(HttpTestingController);
    storage = {};
    spyOn(localStorage, 'getItem').and.callFake((key:string) => {
      return storage[key] ?? null;
    });
    spyOn(localStorage, 'setItem').and.callFake((key:string, value:string) => {
     return storage[key] = value;
    });
  });

  afterEach(() => {
    httpMock.verify();
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });

  it('getBooks return the list of books', () => {
    service.getBooks().subscribe((resp:Book[]) => {
      expect(resp).toEqual(listBook);
    });
    const url: string = environment.API_REST_URL + `/book`;
    const req = httpMock.expectOne(url);

    expect(req.request.method).toBe('GET');
    req.flush(listBook);
  });

  it('getBooksFromCart return empty array when LocalStorage is empty', () => {
    const listBookCart = service.getBooksFromCart();
    expect(listBookCart).toEqual([]);
  });

  it('addBookToCart add a book successfully when the list does not exist in the localStorage ', () => {

    const toast ={
      fire: () => null
    } as any;

    const spy = spyOn(Swal, 'mixin').and.callFake(() => {
      return toast;
    });


    let listBook = service.getBooksFromCart();
    expect(listBook).toEqual([]);
    service.addBookToCart(book);
    listBook = service.getBooksFromCart();
    expect(listBook).toEqual([book]);
    service.addBookToCart(book);
    expect(spy).toHaveBeenCalled();
  });

  it('removeBooksFromCart remove the list of books from the localStorage', () => {
    service.addBookToCart(book);
    let listBook = service.getBooksFromCart();
    expect(listBook).toEqual([book]);
    service.removeBooksFromCart();
    listBook = service.getBooksFromCart();
    expect(listBook).toEqual([]);
  });

});
