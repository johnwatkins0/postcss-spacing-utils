export const makeAllSidesClasses = (opts, spacerType) =>
    opts.spacers
        .map(
            (size, i) =>
                `.${spacerType.slice(0, 1)}-${i} {
	${spacerType}: ${size};
}
`
        )
        .join('');
