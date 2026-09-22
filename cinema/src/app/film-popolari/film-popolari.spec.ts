import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FilmPopolari } from './film-popolari';

describe('FilmPopolari', () => {
  let component: FilmPopolari;
  let fixture: ComponentFixture<FilmPopolari>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FilmPopolari],
    }).compileComponents();

    fixture = TestBed.createComponent(FilmPopolari);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
