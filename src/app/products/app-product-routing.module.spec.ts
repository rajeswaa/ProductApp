import { AppProductRoutingModule } from './app-product-routing.module';

describe('AppProductRoutingModule', () => {
  let appProductRoutingModule: AppProductRoutingModule;

  beforeEach(() => {
    appProductRoutingModule = new AppProductRoutingModule();
  });

  it('should create an instance', () => {
    expect(appProductRoutingModule).toBeTruthy();
  });
});
