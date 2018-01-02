import postcss from 'postcss';
import cssbeautify from 'cssbeautify';

import optsDefaults from '../optsDefaults';
import { makeSpecialClasses } from './makeSpecialClasses';
import { makeSidesClasses } from './makeSidesClasses';
import { makeAllSidesClasses } from './makeAllSidesClasses';
import { makeAxisClasses } from './makeAxisClasses';

const makeRules = (opts = {}) =>
    new Promise(resolve => {
        const css = `
${makeSpecialClasses()}
${makeAllSidesClasses(opts, 'margin')}
${makeSidesClasses(opts, 'margin')}
${makeAxisClasses(opts, 'margin')}
${makeAllSidesClasses(opts, 'padding')}
${makeSidesClasses(opts, 'padding')}
${makeAxisClasses(opts, 'padding')}
`;

        resolve(
            cssbeautify(css, {
                indent: '  ',
                autosemicolon: true
            })
        );
    });

const spacingUtils = (opts = optsDefaults) => (root, result) =>
    new Promise((resolve, reject) => {
        if (root.source.input.css.indexOf('@spacing-utils') === -1) {
            result.warn('@spacing-utils at rule not found');
            resolve();
            return;
        }

        root.walkAtRules('spacing-utils', async rule => {
            try {
                const css = await makeRules(opts);
                rule.before(css);
                rule.remove();
                resolve();
            } catch (error) {
                reject(error);
            }
        });
    });

module.exports = postcss.plugin('spacing-utils', spacingUtils);
