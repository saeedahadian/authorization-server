import { JwtAuthExceptionFilter } from './jwt-auth-exception.filter';

describe('JwtAuthExceptionFilter', () => {
  it('should be defined', () => {
    expect(new JwtAuthExceptionFilter()).toBeDefined();
  });
});
