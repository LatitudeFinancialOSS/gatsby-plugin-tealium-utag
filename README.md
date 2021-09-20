# gatsby-plugin-tealium-utag

This plugin inserts [Tealium's utag](https://docs.tealium.com/platforms/javascript/install/#universal-tag-utag-js) to the `<body>` of Gatsby pages.

## Install

```shell
npm install --save gatsby-plugin-tealium-utag
```

## How to use

```js
// In your gatsby-config.js
module.exports = {
  plugins: [
    {
      resolve: "gatsby-plugin-tealium-utag",
      options: {
        account: "YOUR_TEALIUM_ACCOUNT",
        profile: "YOUR_TEALIUM_PROFILE",
        env: "dev",
        injectUtagSync: true,
        disableInitialTracking: true,
      },
    },
  ],
};
```

## Required Options

### `account`

Your Tealium account name.

### `profile`

Your Tealium profile name.

### `env`

Must be `"dev"`, `"qa"`, or `"prod"`.

## Optional Options

### `injectUtagSync`

Defaults to `false`.

When set to `true`, [`utag.sync.js`](https://community.tealiumiq.com/t5/iQ-Tag-Management/Using-the-utag-sync-js-Script/ta-p/19175#toc-hId-1329434506) will be injected to the `<head>`.

### `disableInitialTracking`

Defaults to `false`.

When set to `true`, [`utag.view()` won't be called automatically on page load.](https://docs.tealium.com/platforms/javascript/settings/#noview) Usually, that's what you want in Single Page Applications.

## Notes

- This plugin just adds the utag script to the page. It's up to you to call [`utag.view()`](https://docs.tealium.com/platforms/javascript/page-tracking/#utag-view) and [`utag.link()`](https://docs.tealium.com/platforms/javascript/event-tracking/#utag-link) in your app.
- `utag.js` loads asynchronously. To know when it finished loading, listen to the `"utag-loaded"` event on the `document`:

```js
document.addEventListener("utag-loaded", () => {
  console.log("utag is ready:", utag);
});
```

## Related

- [tealium-tracker](https://github.com/LatitudeFinancialOSS/tealium-tracker) - Easily integrate with [Tealium](https://tealium.com/)
- [react-event-tracker](https://github.com/LatitudeFinancialOSS/react-event-tracker) - Easily track events in your React application.
