export const makeAxisClasses = (opts, spacerType) =>
    opts.spacers
        .map(
            (size, i) =>
                `.${spacerType.slice(0, 1)}x-${i} {
	${spacerType}: 0 ${size};
}
`
        )
        .join('') +
    opts.spacers
        .map(
            (size, i) =>
                `.${spacerType.slice(0, 1)}y-${i} {
			${spacerType}: ${size} 0;
		}
		`
        )
        .join('');
