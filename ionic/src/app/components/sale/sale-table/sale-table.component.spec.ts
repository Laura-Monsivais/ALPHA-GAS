import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SaleTableComponent } from './sale-table.component';

describe('SaleTableComponent', () => {
  let component: SaleTableComponent;
  let fixture: ComponentFixture<SaleTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SaleTableComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SaleTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
