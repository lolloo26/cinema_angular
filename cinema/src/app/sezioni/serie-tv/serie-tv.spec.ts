import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SerieTv } from './serie-tv';

describe('SerieTv', () => {
  let component: SerieTv;
  let fixture: ComponentFixture<SerieTv>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SerieTv],
    }).compileComponents();

    fixture = TestBed.createComponent(SerieTv);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
