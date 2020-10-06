import path from 'path';
import glob from 'fast-glob';
import { transform } from './utils';

describe('should pass fixtures', () => {
  const files = glob.sync('./fixtures/**/*.{ts,tsx}', {
    cwd: __dirname,
    dot: false,
  });

  files.forEach((basePath) => {
    const filePath = String(basePath);

    if (filePath.includes('/special/') || filePath.includes('/typings/')) {
      return;
    }

    it(`transforms ${filePath}`, () => {
      expect(
        transform(path.join(__dirname, filePath), {
          comments: false,
          value: 'foo',
        }),
      ).toMatchSnapshot();
    });
  });
});
