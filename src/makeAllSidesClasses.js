/**
 * Make spacer utils that apply margin or padding to all sides of an element.
 * @param {Object} opts The plugin options.
 * @param {string} spacerType margin or padding.
 * @return {string} The generated CSS.
 */
export const makeAllSidesClasses = (opts, spacerType) =>
    opts.spacers
        .map(
            (size, i) =>
                `.${spacerType.slice(0, 1)}-${i} {
	${spacerType}: ${size} !important;
}

`,
        )
        .join('');
