import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SelfConsumptionInsertComponent } from './self-consumption-insert.component';

describe('SelfConsumptionInsertComponent', () => {
  let component: SelfConsumptionInsertComponent;
  let fixture: ComponentFixture<SelfConsumptionInsertComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SelfConsumptionInsertComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SelfConsumptionInsertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
