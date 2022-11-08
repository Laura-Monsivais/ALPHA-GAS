import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BuyDoStepFirstComponent } from './buy-do-step-first.component';

describe('BuyDoStepFirstComponent', () => {
  let component: BuyDoStepFirstComponent;
  let fixture: ComponentFixture<BuyDoStepFirstComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ BuyDoStepFirstComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BuyDoStepFirstComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
