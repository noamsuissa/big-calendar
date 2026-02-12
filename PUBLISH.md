# Publishing to npm

## Prerequisites

1. Create an npm account if you don't have one: https://www.npmjs.com/signup
2. Login to npm: `npm login`

## Build the Package

```bash
npm run build
```

This will create a `dist/` folder with:
- `big-calendar.mjs` (ES module)
- `big-calendar.cjs` (CommonJS)
- `style.css` (Styles)
- `index.d.ts` (TypeScript definitions - if generated)

## Test Locally

Before publishing, test the package locally:

```bash
# In the big-calendar directory
npm pack

# This creates a .tgz file. In another project:
npm install /path/to/big-calendar-0.1.0.tgz
```

## Publish

### First Time Publishing

```bash
npm publish --access public
```

### Update Version and Publish

1. Update version in `package.json`:
   ```json
   "version": "0.1.1"
   ```

2. Build:
   ```bash
   npm run build
   ```

3. Publish:
   ```bash
   npm publish
   ```

## Version Management

- Patch: `npm version patch` (0.1.0 → 0.1.1)
- Minor: `npm version minor` (0.1.0 → 0.2.0)
- Major: `npm version major` (0.1.0 → 1.0.0)

This automatically updates `package.json` and creates a git tag.

## Important Notes

1. **Update repository URL** in `package.json` before publishing
2. **Add author information** in `package.json`
3. **Ensure LICENSE file** exists
4. **Test the build** before publishing
5. **Check `.npmignore`** to ensure only necessary files are included

## Post-Publish Checklist

- [ ] Verify package appears on npmjs.com
- [ ] Test installation: `npm install big-calendar`
- [ ] Update README with npm package name if different
- [ ] Create GitHub release with changelog
