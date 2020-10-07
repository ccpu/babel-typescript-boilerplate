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

    const parsedFile = path.parse(filePath);

    const pathToSnap = path.resolve(
      process.cwd(),
      '__tests__',
      '__snapshots__',
      parsedFile.dir,
      parsedFile.name + '.shot',
    );

    it(`transforms ${filePath}`, () => {
      const result = transform(path.join(__dirname, filePath), {
        comments: false,
        value: 'foo',
      });

      expect(result).toMatchSpecificSnapshot(pathToSnap);
    });
  });
});
