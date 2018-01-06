import postcss from 'postcss';
import stylelint from 'stylelint';

import optsDefaults from '../optsDefaults';
import { specialClasses } from './specialClasses';
import { makeSidesClasses } from './makeSidesClasses';
import { makeAllSidesClasses } from './makeAllSidesClasses';
import { makeAxisClasses } from './makeAxisClasses';
import { validateOpts } from './validateOpts';

const makeRules = opts =>
    new Promise(async resolve => {
        const code = `${specialClasses}
${makeAllSidesClasses(opts, 'margin')}
${makeSidesClasses(opts, 'margin')}
${makeAxisClasses(opts, 'margin')}
${makeAllSidesClasses(opts, 'padding')}
${makeSidesClasses(opts, 'padding')}
${makeAxisClasses(opts, 'padding')}
`;

        const lintResult = await stylelint.lint({ code, fix: true });
        resolve(lintResult.output);
    });

export const spacingUtils = (opts = optsDefaults) => (root, result) =>
    new Promise((resolve, reject) => {
        if (root.source.input.css.indexOf('@spacing-utils') === -1) {
            result.warn('@spacing-utils at rule not found');
            reject('@spacing-utils at rule not found');
            return;
        }

        root.walkAtRules('spacing-utils', async rule => {
            try {
                const validatedOpts = await validateOpts(opts);
                const css = await makeRules(validatedOpts);
                rule.before(css);
                rule.remove();
                resolve();
            } catch (error) {
                reject(error);
            }
        });
    });

const plugin = postcss.plugin('spacing-utils', spacingUtils);

export default plugin;
