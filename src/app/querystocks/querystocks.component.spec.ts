import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuerystocksComponent } from './querystocks.component';

describe('QuerystocksComponent', () => {
  let component: QuerystocksComponent;
  let fixture: ComponentFixture<QuerystocksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuerystocksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuerystocksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
