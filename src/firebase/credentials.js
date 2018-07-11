/**
 * Created by Aseem on 11-07-2018.
 */
import firebase from "firebase";

class Credentials {

    constructor() {
        this.config = {
            apiKey: "AIzaSyDM3I2ySt7myGRUozOUCxo4XgM1iEXaujQ",
            authDomain: "blockchain-a7800.firebaseapp.com",
            databaseURL: "https://blockchain-a7800.firebaseio.com",
            projectId: "blockchain-a7800",
            storageBucket: "",
            messagingSenderId: "954385847236"
        };
        firebase.initializeApp(this.config);
    }

    getFirebaseObject = () => {
        return firebase;
    }
}

export default Credentials;