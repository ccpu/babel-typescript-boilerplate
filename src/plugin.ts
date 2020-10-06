import * as babel from '@babel/core';
import { PluginOptions } from './typings';
import { PluginObj, PluginPass } from '@babel/core';

export default function ({
  types: t,
}: typeof babel): PluginObj<PluginPass & { opts: PluginOptions }> {
  return {
    name: 'css inline',
    visitor: {
      Program: {
        enter: (path, state) => {
          const options = state.opts;

          let replacePath;

          path.traverse({
            VariableDeclaration(path) {
              replacePath = path;
            },
          });

          const decl = replacePath.node.declarations[0];
          const id = decl.id;

          replacePath.replaceWith(
            t.variableDeclaration(replacePath.node.kind, [
              t.variableDeclarator(id, t.stringLiteral(options.value)),
            ]),
          );
        },
      },
    },
  };
}
