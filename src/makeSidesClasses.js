import { dimensions } from './dimensions';

/**
 * Builds spacing utils for each individual side.
 * @param {Object} opts The plugin option.
 * @param {string} spacerType margin or padding.
 * @return {string} The generated CSS.
 */
export const makeSidesClasses = (opts, spacerType) =>
    Object.keys(dimensions)
        .map(abbreviation =>
            opts.spacers
                .map(
                    (size, i) =>
                        `.${spacerType.slice(0, 1)}${abbreviation}-${i} {
	${spacerType}-${dimensions[abbreviation]}: ${size} !important;
}

`,
                )
                .join(''),
        )
        .join('');
