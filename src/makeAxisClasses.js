export const makeAxisClasses = (opts, spacerType) =>
    opts.spacers
        .map(
            (size, i) =>
                `.${spacerType.slice(0, 1)}x-${i} {
	${spacerType}-right: ${size} !important;
	${spacerType}-left: ${size} !important;
}
`
        )
        .join('') +
    opts.spacers
        .map(
            (size, i) =>
                `.${spacerType.slice(0, 1)}y-${i} {
			${spacerType}-top: ${size} !important;
			${spacerType}-bottom: ${size} !important;
		}
		`
        )
        .join('');
