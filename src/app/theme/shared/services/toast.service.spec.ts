import { TestBed } from '@angular/core/testing';
import { ToastService } from './toast.service';

describe('ToastService', () => {
  let service: ToastService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ToastService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should emit toast message with default values', (done) => {
    service.toastState$.subscribe(toast => {
      expect(toast.message).toBe('Test success');
      expect(toast.type).toBe('success');
      expect(toast.duration).toBe(3000);
      done();
    });

    service.showToast('Test success');
  });

  it('should emit toast message with custom values', (done) => {
    const customMessage = 'Error occurred';
    const customType = 'error';
    const customDuration = 5000;

    service.toastState$.subscribe(toast => {
      expect(toast.message).toBe(customMessage);
      expect(toast.type).toBe(customType);
      expect(toast.duration).toBe(customDuration);
      done();
    });

    service.showToast(customMessage, customType, customDuration);
  });
});
