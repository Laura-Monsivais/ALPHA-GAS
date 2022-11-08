import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RouteDoStepFirstComponent } from './route-do-step-first.component';

describe('RouteDoStepFirstComponent', () => {
  let component: RouteDoStepFirstComponent;
  let fixture: ComponentFixture<RouteDoStepFirstComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ RouteDoStepFirstComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RouteDoStepFirstComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
