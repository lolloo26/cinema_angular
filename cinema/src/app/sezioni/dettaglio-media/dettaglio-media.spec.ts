import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DettaglioMedia } from './dettaglio-media';

describe('DettaglioMedia', () => {
  let component: DettaglioMedia;
  let fixture: ComponentFixture<DettaglioMedia>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DettaglioMedia],
    }).compileComponents();

    fixture = TestBed.createComponent(DettaglioMedia);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
