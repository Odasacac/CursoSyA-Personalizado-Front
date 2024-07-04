import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MostrarmensajesComponent } from './mostrarmensajes.component';

describe('MostrarmensajesComponent', () => {
  let component: MostrarmensajesComponent;
  let fixture: ComponentFixture<MostrarmensajesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MostrarmensajesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MostrarmensajesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
