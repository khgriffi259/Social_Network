import { auth } from './fbconfig';

class Auth {
    constructor(){
        this.currentUserID = null;
    }
    
    subscribeToUserStatus(callback){
        auth.onAuthStateChanged(user => {
            if (user){
                this.currentUserID = user.uid;
                callback(user);
            } else {
                console.log('user is logged out');
                this.currentUserID = null;
                callback(user);
            }
        })    
    }

    async signUp(email, password){
        const cred = await auth.createUserWithEmailAndPassword(email, password);
        return cred;
    }

    signIn(email, password){
        return auth.signInWithEmailAndPassword(email, password).then(cred => {
            console.log(cred);
            return cred;
          })
    }

    signOut() {
        auth.signOut();
    }
}
 
export default Auth

