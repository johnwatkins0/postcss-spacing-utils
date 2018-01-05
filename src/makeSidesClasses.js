import { dimensions } from './dimensions';

export const makeSidesClasses = (opts, spacerType) =>
    Object.keys(dimensions)
        .map(abbreviation =>
            opts.spacers
                .map(
                    (size, i) =>
                        `.${spacerType.slice(0, 1)}${abbreviation}-${i} {
	${spacerType}-${dimensions[abbreviation]}: ${size} !important;
}
`
                )
                .join('')
        )
        .join('');
