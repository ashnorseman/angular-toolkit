import { SanitisePipe } from './sanitise.pipe';

describe('SanitisePipe', () => {
  it('create an instance', () => {
    const pipe = new SanitisePipe();
    expect(pipe).toBeTruthy();
  });
});
