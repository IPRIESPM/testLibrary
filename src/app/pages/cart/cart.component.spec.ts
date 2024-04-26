import { ComponentFixture, TestBed } from "@angular/core/testing";
import { CartComponent } from "./cart.component";
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from "@angular/core";
import { BookService } from "src/app/services/book.service";
import { Book } from "src/app/models/book.model";
import { By } from "@angular/platform-browser";

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

describe('CartComponent', () => {

  let cartComponent:CartComponent;
  let fixture:ComponentFixture<CartComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [CartComponent],
      providers: [BookService],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    }).compileComponents();
  });

  let bookService: BookService;

  beforeEach(() => {
    fixture = TestBed.createComponent(CartComponent);
    cartComponent = fixture.componentInstance;
    fixture.detectChanges();
    bookService = TestBed.inject(BookService);
    spyOn(bookService, 'getBooksFromCart').and.callFake(() => listBook);
  });

  it('should create', () => {
    expect(cartComponent).toBeTruthy();
  });

  it('getTotalPrice return amount', () => {
    const totalPrice = cartComponent.getTotalPrice(listBook);
    expect(totalPrice).toBeGreaterThan(0);
    expect(totalPrice).not.toBe(0);
    expect(totalPrice).not.toBeNull();
  });

  it('onInputNumberChange Increments correctly', () => {
    const action = 'plus';
    const book = listBook[0];

    const spy = spyOn(bookService, 'updateAmountBook').and.callFake(() => null);
    const spy2 = spyOn(cartComponent, 'getTotalPrice').and.callFake(() => null);

    const newBook = { ...book};

    expect(newBook.amount).toBe(2);

    cartComponent.onInputNumberChange(action, newBook);

    expect(newBook.amount).toBe(3);

    expect(spy).toHaveBeenCalled();
    expect(spy2).toHaveBeenCalled();
  });

  it('onInputNumberChange Decrements correctly', () => {
    const action = 'minus';
    const book = listBook[0];
    const newBook = { ...book};

    const spy = spyOn(bookService, 'updateAmountBook').and.callFake(() => null);
    const spy2 = spyOn(cartComponent, 'getTotalPrice').and.callFake(() => null);

    expect(newBook.amount).toBe(2);

    cartComponent.onInputNumberChange(action, newBook);

    expect(newBook.amount).toBe(1);

    expect(spy).toHaveBeenCalled();
    expect(spy2).toHaveBeenCalled();
  });

  it('onClearBooks works correctly', () => {
    const spy = spyOn((cartComponent as any), '_clearListCartBook').and.callThrough();

    const spy2 = spyOn(bookService, 'removeBooksFromCart').and.callFake(() => null);

    cartComponent.listCartBook = [...listBook];
    expect(cartComponent.listCartBook.length).toBeGreaterThan(0);
    cartComponent.onClearBooks();
    expect(cartComponent.listCartBook.length).toBe(0);
    expect(spy).toHaveBeenCalled();
    expect(spy2).toHaveBeenCalled();
  });

  it('_clearListCartBook works correctly', () => {
    const spy = spyOn(bookService, 'removeBooksFromCart').and.callFake(() => null);
    cartComponent.listCartBook = [...listBook];
    cartComponent['_clearListCartBook']();
    expect(cartComponent.listCartBook.length).toBe(0);
    expect(spy).toHaveBeenCalled();
  });

  //Prueba de integración

  it('the title "the cart is empty" is not displayed when there is a list', () => {
    cartComponent.listCartBook = [...listBook];
    fixture.detectChanges();
    const title = fixture.debugElement.query(By.css('#titleCartEmpty'));
    expect(title).toBeFalsy();
  });

  it('the title "the cart is empty" is displayed when the list is empty', () => {
    cartComponent.listCartBook = [];
    fixture.detectChanges();
    const title = fixture.debugElement.query(By.css('#titleCartEmpty'));
    expect(title).toBeTruthy();
    if(title){
      const element:HTMLElement = title.nativeElement;
      expect(element.textContent).toContain('The cart is empty');
    }
  });

});
