import { AppCustomerRoutingModule } from './app-customer-routing.module';

describe('AppCustomerRoutingModule', () => {
  let appCustomerRoutingModule: AppCustomerRoutingModule;

  beforeEach(() => {
    appCustomerRoutingModule = new AppCustomerRoutingModule();
  });

  it('should create an instance', () => {
    expect(appCustomerRoutingModule).toBeTruthy();
  });
});
