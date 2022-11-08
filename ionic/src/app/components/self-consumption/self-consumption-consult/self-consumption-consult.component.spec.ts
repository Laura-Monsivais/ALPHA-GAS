import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SelfConsumptionConsultComponent } from './self-consumption-consult.component';

describe('SelfConsumptionConsultComponent', () => {
  let component: SelfConsumptionConsultComponent;
  let fixture: ComponentFixture<SelfConsumptionConsultComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SelfConsumptionConsultComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SelfConsumptionConsultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
