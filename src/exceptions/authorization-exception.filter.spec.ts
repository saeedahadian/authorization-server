import { AuthorizationExceptionFilter } from './authorization-exception.filter';

describe('AuthorizationExceptionFilter', () => {
  it('should be defined', () => {
    expect(new AuthorizationExceptionFilter()).toBeDefined();
  });
});
