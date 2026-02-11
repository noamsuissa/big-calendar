# npm Publishing Authentication Guide

## Issue: 403 Forbidden - 2FA Required

The build succeeded! ✅ But publishing failed due to npm authentication requirements.

## Solution Options

### Option 1: Enable 2FA on npm Account (Recommended)

1. **Go to npm website**: https://www.npmjs.com/settings/[your-username]/profile
2. **Enable 2FA**:
   - Click "Enable 2FA"
   - Scan QR code with authenticator app (Google Authenticator, Authy, etc.)
   - Enter verification code
3. **Try publishing again**:
   ```bash
   npm publish --access public
   ```

### Option 2: Use Granular Access Token (Alternative)

1. **Create access token**:
   - Go to: https://www.npmjs.com/settings/[your-username]/tokens
   - Click "Generate New Token"
   - Select "Automation" or "Publish" type
   - Enable "Bypass 2FA" if available
   - Copy the token

2. **Login with token**:
   ```bash
   npm login
   # When prompted for password, paste your token instead
   ```

3. **Or set token directly**:
   ```bash
   npm config set //registry.npmjs.org/:_authToken YOUR_TOKEN_HERE
   ```

4. **Try publishing**:
   ```bash
   npm publish --access public
   ```

### Option 3: Use npm CLI with 2FA

If you have 2FA enabled, npm will prompt you for the OTP:

```bash
npm publish --access public
# Enter OTP when prompted
```

## Verify Authentication

Check if you're logged in:

```bash
npm whoami
```

Should show your npm username.

## Package Name Availability

The error might also occur if the package name `big-calendar` is already taken. Check:

```bash
npm view big-calendar
```

If it shows package info, the name is taken. You'll need to:
- Use a scoped package: `@your-username/big-calendar`
- Choose a different name

Update `package.json`:
```json
{
  "name": "@your-username/big-calendar"
}
```

Then publish:
```bash
npm publish --access public
```

## Build Success ✅

Your build completed successfully:
- ✅ `dist/big-calendar.mjs` (129.8 kB)
- ✅ `dist/big-calendar.cjs` (93.8 kB)
- ✅ `dist/style.css` (43.4 kB)
- ✅ Source maps generated

The package is ready to publish once authentication is resolved!
