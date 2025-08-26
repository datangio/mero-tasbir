# @repo/prettier-config

Shared Prettier configuration for the mero-tasbir monorepo.

## Usage

In your package's `package.json`, add:

```json
{
  "prettier": "@repo/prettier-config"
}
```

Or create a `.prettierrc.js` file:

```js
module.exports = "@repo/prettier-config";
```

## Configuration

This configuration includes:

- Semi-colons enabled
- Trailing commas for ES5 compatibility
- Double quotes
- 80 character line width
- 2 space indentation
- Tailwind CSS class sorting plugin
