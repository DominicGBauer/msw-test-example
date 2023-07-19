# Guide

This is an example React Native app using RTK query with MSW and Jest where there is an issue with the sad path causing jest to error on test completion:

```js
    thrown: Object {
      "data": null,
      "status": 500,
    }

      at _getError (../../node_modules/jest-circus/build/utils.js:431:18)
          at Array.map (<anonymous>)
```

## Quick Start

* Run `yarn`
* Run `npm test`
* Look at `Example.tsx` for more info

## Explanation

* We are using `RTK Query` to handle API calls found in `Example.apiSlice.ts`
* Look at tests found in `Example.test`
* `Example.msw` contains MSW's
* `Example.tsx` has notes on using try catch vs not resulting in the test either failing or passing
