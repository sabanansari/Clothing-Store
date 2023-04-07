import {initializeApp} from 'firebase/app';
import {getAuth, signInWithRedirect,signInWithPopup,GoogleAuthProvider,
    createUserWithEmailAndPassword,signInWithEmailAndPassword, signOut,onAuthStateChanged} from 'firebase/auth';
import {getFirestore,doc,getDoc,setDoc,collection,writeBatch,query,getDocs} from 'firebase/firestore';

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

  export const addCollectionAndDOcuments = async(collectionKey, objectsToAdd)=>{
    const collectionRef = collection(db,collectionKey);
    const batch = writeBatch(db);

    objectsToAdd.forEach((object)=>{
      const docRef = doc(collectionRef,object.title.toLowerCase());
      batch.set(docRef, object);
    })

    await batch.commit();
    console.log('done');
  }

  export const getCategoriesAndDOcuments = async()=>{
    const collectionRef = collection(db,'categories');
    const q = query(collectionRef);

    const querySnapshot = await getDocs(q);

    return querySnapshot.docs.map(docSnapshot => docSnapshot.data());

    // const categoryMap = querySnapshot.docs.reduce((acc,docSnapshot)=>{
    //   const {title,items} = docSnapshot.data();
    //   acc[title.toLowerCase()] = items;
    //   return acc;
    // },{});

    // return categoryMap;
  }

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

        return userSnapshot;

  }

  export const createAuthUserWithEmailAndPassword = async (email,password) => {
    if(!email || !password) return;

    return await createUserWithEmailAndPassword(auth,email,password);
  }

  export const signInAuthUserWithEmailAndPassword = async (email,password) => {
    if(!email || !password) return;

    return await signInWithEmailAndPassword(auth,email,password);
  }

  export const signOutUser = async()=> await signOut(auth);

  export const onAuthStateChangedListener = (callback)=> onAuthStateChanged(auth,callback);

  export const getCurrentUser = ()=>{
    return new Promise((resolve,reject)=>{
      const unsubscribe = onAuthStateChanged(
        auth,
        (userAuth) => {
          unsubscribe();
          resolve(userAuth);
        },
        reject
      )
    });
  }