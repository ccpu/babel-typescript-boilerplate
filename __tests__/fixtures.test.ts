import path from 'path';
import glob from 'fast-glob';
import { transform } from './utils';

const manualTestFixturesPath = path.resolve('__tests__/fixtures/manual');

describe('should pass fixtures', () => {
  const files = glob.sync('./fixtures/**/*.{ts,tsx}', {
    cwd: __dirname,
    dot: false,
  });

  files.forEach((basePath) => {
    const filePath = String(basePath);

    if (filePath.includes('/manual/')) {
      return;
    }

    const parsedFile = path.parse(filePath);

    const pathToSnap = path.resolve(
      process.cwd(),
      '__tests__',
      '__snapshots__',
      parsedFile.dir,
      parsedFile.name + parsedFile.ext + '.shot',
    );

    it(`transforms ${parsedFile.dir}/${parsedFile.base}`, () => {
      const result = transform(path.join(__dirname, filePath), {
        comments: false,
        value: 'foo',
      });

      expect(result).toMatchSpecificSnapshot(pathToSnap);
    });
  });

  it('should pass manual test', () => {
    const result = transform(
      path.resolve(manualTestFixturesPath, 'variable.ts'),
      {
        comments: false,
        value: 'foo',
      },
    );
    expect(result).toBe(`export const variable = 'foo';`);
  });
});
