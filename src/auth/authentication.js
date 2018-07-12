/**
 * Created by Aseem on 11-07-2018.
 */
import Credentials from '../firebase/credentials';
import * as firebaseui from 'firebaseui';

let Authentication = (function () {
    let instance = null;

    return {
        getInstance() {
            if (!instance) {
                instance = new Auth();
            }
            return instance;
        }
    }
})();

class Auth extends Credentials {

    createFirebaseLogin(redirectUrl, div, serviceUrl = '') {
        let config = {
            signInSuccessUrl: redirectUrl,
            signInOptions: [
                this.getFirebaseObject().auth.EmailAuthProvider.PROVIDER_ID,
            ],
            tosUrl: serviceUrl
        };
        let ui = new firebaseui.auth.AuthUI(this.getFirebaseObject().auth());
        ui.start(div, config);
    }
}

window.Authentication = Authentication;