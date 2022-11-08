import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { UserCoverComponent } from './user-cover.component';

describe('UserCoverComponent', () => {
  let component: UserCoverComponent;
  let fixture: ComponentFixture<UserCoverComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserCoverComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(UserCoverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
