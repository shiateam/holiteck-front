import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlashmemoryComponent } from './flashmemory.component';

describe('FlashmemoryComponent', () => {
  let component: FlashmemoryComponent;
  let fixture: ComponentFixture<FlashmemoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlashmemoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlashmemoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
