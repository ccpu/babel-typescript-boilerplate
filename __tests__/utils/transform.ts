// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { transformFileSync, TransformOptions } from '@babel/core';
import plugin from '../../src/plugin';
import { PluginOptions } from '../../src/typings';

export function transform(
  filePath: string,
  pluginOptions: Partial<PluginOptions> = {},
  transformOptions: TransformOptions = { plugins: [] },
): string {
  if (transformOptions.plugins) {
    transformOptions.plugins = transformOptions.plugins.map((plg) => {
      if (typeof plg === 'function') return [plg];
      return plg;
    });
  }

  if (!transformOptions.plugins) transformOptions.plugins = [];

  transformOptions.plugins.push([plugin, pluginOptions]);

  return (
    transformFileSync(filePath, {
      babelrc: false,
      comments: pluginOptions.comments || false,
      configFile: false,
      filename: filePath,
      generatorOpts: {
        jsescOption: { quotes: 'single' },
      },
      ...transformOptions,
    }).code || ''
  );
}
