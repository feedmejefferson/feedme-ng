// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  baseFoodUrl: "/assets/",
  appetiteUrl: "http://localhost:5000/feedme-stage/us-central1/appetite",
  firebase: {
    apiKey: "AIzaSyCtjvY1oF7VFBpq1rWDt6bjfYKr1_OiHMk",
    authDomain: "feedme-stage.firebaseapp.com",
    databaseURL: "https://feedme-stage.firebaseio.com",
    projectId: "feedme-stage",
    storageBucket: "feedme-stage.appspot.com",
    messagingSenderId: "448474045438"
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
