import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BuyDoStepThirdComponent } from './buy-do-step-third.component';

describe('BuyDoStepThirdComponent', () => {
  let component: BuyDoStepThirdComponent;
  let fixture: ComponentFixture<BuyDoStepThirdComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ BuyDoStepThirdComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BuyDoStepThirdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
