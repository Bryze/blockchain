/**
 * Created by Aseem on 11-07-2018.
 */
import Credentials from '../firebase/credentials';

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

}

window.Authentication = Authentication;