import { BasicAuthExceptionFilter } from './basic-auth-exception.filter';

describe('BasicAuthExceptionFilter', () => {
  it('should be defined', () => {
    expect(new BasicAuthExceptionFilter()).toBeDefined();
  });
});
