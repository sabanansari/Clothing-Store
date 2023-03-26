/*import {auth,signInWithGooglePopup,createUserDocumentFromAuth,signInWithGoogleRedirect} from '../../utils/firebase/firebase.utils';
import { useEffect } from 'react';
import  {getRedirectResult} from 'firebase/auth'; */
import SignUpForm from '../../components/sign-up-form/sign-up-form.component';
import SignInForm from '../../components/sign-in-form/sign-in-form.component';
import './authentication.styles.scss';


const Authentication = ()=>{

   /* const logGoogleRedirectUser = async()=>{
            const response = await getRedirectResult(auth);
            if(response){
            const userDocRef = await createUserDocumentFromAuth(response.user);
            }
    } 

    useEffect(()=>{
        logGoogleRedirectUser();
    },[]); */

    return(
        <div className='authentication-container'>
            <SignInForm />
            {/*<button onClick={logGoogleUser}>Sign in with Google Popup</button>
            <button onClick={signInWithGoogleRedirect}>Sign in with Google Redirect</button> */}
            <SignUpForm />
        </div>
    );
}

export default Authentication;