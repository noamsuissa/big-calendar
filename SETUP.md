# Setup Guide for npm Package

## Before Publishing

1. **Update package.json**:
   - Set your package name (e.g., `@your-org/big-calendar` or `big-calendar`)
   - Add author information
   - Update repository URL
   - Set correct version (start with 0.1.0)

2. **Configure Tailwind CSS**:
   Consumers need to configure Tailwind to include big-calendar styles. Add to their `tailwind.config.js`:
   ```js
   content: [
     "./src/**/*.{js,jsx,ts,tsx}",
     "./node_modules/big-calendar/dist/**/*.{js,jsx}",
   ]
   ```

3. **Test the Build**:
   ```bash
   npm run build
   ```
   
   Verify `dist/` folder contains:
   - `big-calendar.mjs`
   - `big-calendar.cjs`
   - `style.css`

4. **Test Locally**:
   ```bash
   npm pack
   # Creates big-calendar-0.1.0.tgz
   
   # In another project:
   npm install /path/to/big-calendar-0.1.0.tgz
   ```

## Consumer Setup

### 1. Install

```bash
npm install big-calendar
```

### 2. Configure Tailwind CSS

Add to `tailwind.config.js`:

```js
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/big-calendar/dist/**/*.{js,jsx}",
  ],
  // ... rest of config
}
```

### 3. Import Styles

```jsx
import 'big-calendar/styles';
// or
import 'big-calendar/dist/style.css';
```

### 4. Use the Calendar

```jsx
import { CalendarProvider, ClientContainer } from 'big-calendar';
import 'big-calendar/styles';

function App() {
  return (
    <CalendarProvider useMocks={true}>
      <ClientContainer view="month" />
    </CalendarProvider>
  );
}
```

## Build Configuration

The package uses Vite in library mode. The build:
- Creates ES modules (`.mjs`) and CommonJS (`.cjs`) formats
- Bundles CSS into `style.css`
- Externalizes React and all dependencies
- Generates source maps

## File Structure After Build

```
dist/
├── big-calendar.mjs      # ES module
├── big-calendar.cjs      # CommonJS
├── style.css             # All styles
└── big-calendar.mjs.map  # Source map
```

## Publishing Checklist

- [ ] Update package name in package.json
- [ ] Add author information
- [ ] Update repository URL
- [ ] Set correct version
- [ ] Run `npm run build` successfully
- [ ] Test local install with `npm pack`
- [ ] Verify LICENSE file exists
- [ ] Check README.md is npm-friendly
- [ ] Ensure .npmignore excludes source files
- [ ] Login to npm: `npm login`
- [ ] Publish: `npm publish --access public`
