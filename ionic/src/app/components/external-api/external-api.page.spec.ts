import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ExternalApiPage } from './external-api.page';

describe('ExternalApiPage', () => {
  let component: ExternalApiPage;
  let fixture: ComponentFixture<ExternalApiPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExternalApiPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ExternalApiPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
