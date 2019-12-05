import { QuerystocksModule } from './querystocks.module';

describe('QuerystocksModule', () => {
  let querystocksModule: QuerystocksModule;

  beforeEach(() => {
    querystocksModule = new QuerystocksModule();
  });

  it('should create an instance', () => {
    expect(querystocksModule).toBeTruthy();
  });
});
