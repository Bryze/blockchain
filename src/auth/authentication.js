/**
 * Created by Aseem on 11-07-2018.
 */
import Credentials from '../firebase/credentials';
import * as firebaseui from 'firebaseui';
let EventHandler = require('eventhandler');

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

    constructor() {
        super();
        this.user = null;
        this.eventHandler = new EventHandler();
    }

    createFirebaseLogin(redirectUrl, div, serviceUrl = '') {
        let config = {
            signInSuccessUrl: redirectUrl,
            credentialHelper: 'none',
            signInOptions: [
                this.getFirebaseObject().auth.EmailAuthProvider.PROVIDER_ID,
            ],
            tosUrl: serviceUrl
        };
        let ui = new firebaseui.auth.AuthUI(this.getFirebaseObject().auth());
        ui.start(div, config);
    }

    setUser(user) {
        if(!this.user) {
            this.user = user;
        }
        return this;
    }

    getUser() {
        return this.user;
    }

    resetUser() {
        this.user = null;
        return this;
    }

    raiseEvent(eventName,data) {
        this.eventHandler.emit(eventName,data);
        return this;
    }

    subscribeEvent(eventName,callback) {
        this.eventHandler.on(eventName, function(response) {
            callback(response);
        });
    }
}

window.Authentication = Authentication;