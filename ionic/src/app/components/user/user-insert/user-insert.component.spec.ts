import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { UserInsertComponent } from './user-insert.component';

describe('UserInsertComponent', () => {
  let component: UserInsertComponent;
  let fixture: ComponentFixture<UserInsertComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserInsertComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(UserInsertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
