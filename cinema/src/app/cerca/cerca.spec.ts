import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Cerca } from './cerca';

describe('Cerca', () => {
  let component: Cerca;
  let fixture: ComponentFixture<Cerca>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Cerca],
    }).compileComponents();

    fixture = TestBed.createComponent(Cerca);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
