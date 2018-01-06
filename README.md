# postcss-spacing-utils

Generates spacing utility classes from user settings.

## Install

```
npm install --dev postcss-spacing-utils
```

OR

```
yarn add --dev postcss-spacing-utils
```

## Usage

The plugin requires a single configuration variable, `spacers`, an array of CSS sizes from which to generate spacing utils.

Add your settings to your postcss configuration, e.g.:

```Javascript
module.exports = {
  plugins: {
    'postcss-spacing-utils': {
      // Your options, or empty to use the defaults.
    },
  },
};
```

### Defaults

Leave your settings empty to use the following defaults.

```Javascript
{
    spacers: [
        '0',
        '.375rem',
        '.75rem',
        '1.5rem',
        '2.25rem',
        '3rem',
        '4.5rem',
        '6rem',
    ],
}
```

### Generated CSS classes

The generated classes are identical to those generated by Bootstrap 4. See [Bootstrap's documentation](https://getbootstrap.com/docs/4.0/utilities/spacing/) for details.
