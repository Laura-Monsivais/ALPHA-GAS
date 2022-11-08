import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EnterprisePage } from './enterprise.page';

describe('EnterprisePage', () => {
  let component: EnterprisePage;
  let fixture: ComponentFixture<EnterprisePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnterprisePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EnterprisePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
