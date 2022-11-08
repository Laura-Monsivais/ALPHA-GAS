import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BuyDoStepSecondComponent } from './buy-do-step-second.component';

describe('BuyDoStepSecondComponent', () => {
  let component: BuyDoStepSecondComponent;
  let fixture: ComponentFixture<BuyDoStepSecondComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ BuyDoStepSecondComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BuyDoStepSecondComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
