import {initializeApp} from 'firebase/app';
import {getAuth, signInWithRedirect,signInWithPopup,GoogleAuthProvider,createUserWithEmailAndPassword,signInWithEmailAndPassword} from 'firebase/auth';
import {getFirestore,doc,getDoc,setDoc} from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyDWCh4ny2TNRnNdxtlm2xJ-U3Gc4mPVKmo",
    authDomain: "clothing-store-db-42d9d.firebaseapp.com",
    projectId: "clothing-store-db-42d9d",
    storageBucket: "clothing-store-db-42d9d.appspot.com",
    messagingSenderId: "545769569496",
    appId: "1:545769569496:web:81f753de6da6d9534a2bad"
  };
  
  // Initialize Firebase
  const firebaseApp = initializeApp(firebaseConfig);

  const provider = new GoogleAuthProvider();
  provider.setCustomParameters({
    prompt: "select_account"
  });

  export const auth = getAuth();
  export const signInWithGooglePopup = ()=> signInWithPopup(auth,provider);
  export const signInWithGoogleRedirect = ()=> signInWithRedirect(auth,provider);

  export const db = getFirestore();

  export const createUserDocumentFromAuth = async (userAuth, additionalInfo = {displayName:''}) =>{
        if(!userAuth) return;

        const userDocRef = doc(db, 'users', userAuth.uid);

        const userSnapshot = await getDoc(userDocRef);

        if(!userSnapshot.exists()){
            const {displayName, email} = userAuth;
            const createdAt = new Date();

            try{
                await setDoc(userDocRef,{
                    displayName,email,createdAt,...additionalInfo
                });
            }catch(error){
                if(error.code == 'auth/email-already-in-use'){
                    alert('Cannot create user, email already in use!');
                }
                console.log('error creating the user', error.message);
            }
        }

        return userDocRef;

  }

  export const createAuthUserWithEmailAndPassword = async (email,password) => {
    if(!email || !password) return;

    return await createUserWithEmailAndPassword(auth,email,password);
  }

  export const signInAuthUserWithEmailAndPassword = async (email,password) => {
    if(!email || !password) return;

    return await signInWithEmailAndPassword(auth,email,password);
  }