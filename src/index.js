import './blockchain/main';
import './auth/authentication';
import * as firebaseui from 'firebaseui';

let uiConfig = {
    signInSuccessUrl: '<url-to-redirect-to-on-success>',
    signInOptions: [
        // Leave the lines as is for the providers you want to offer your users.
        Authentication.getInstance().getFirebaseObject().auth.EmailAuthProvider.PROVIDER_ID,
    ],
    // Terms of service url.
    tosUrl: '<your-tos-url>'
};
console.log(...uiConfig);
// Initialize the FirebaseUI Widget using Firebase.
let ui = new firebaseui.auth.AuthUI(Authentication.getInstance().getFirebaseObject().auth());
// The start method will wait until the DOM is loaded.
ui.start('#firebaseui-auth-container', uiConfig);
