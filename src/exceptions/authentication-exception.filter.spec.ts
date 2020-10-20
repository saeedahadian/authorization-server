import { AuthenticationExceptionFilter } from './authentication-exception.filter';

describe('AuthenticationExceptionFilter', () => {
  it('should be defined', () => {
    expect(new AuthenticationExceptionFilter()).toBeDefined();
  });
});
