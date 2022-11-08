import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RolManualComponent } from './rol-manual.component';

describe('RolManualComponent', () => {
  let component: RolManualComponent;
  let fixture: ComponentFixture<RolManualComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RolManualComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RolManualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
