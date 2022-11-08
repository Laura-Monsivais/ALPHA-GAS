import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RouteFormComponent } from './route-form.component';

describe('RouteFormComponent', () => {
  let component: RouteFormComponent;
  let fixture: ComponentFixture<RouteFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RouteFormComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RouteFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
