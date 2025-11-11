import { useState } from 'react'
import './sign-in-form.styles.scss'
import FormInput from '../form-input/form-input.component'
import { 
  signInAuthUserWithEmailAndPassword,
  
 } from "../../utils/firebase/firebase.utils"
import Button from '../button/button.component'

import {
  signInWithGooglePopup, 
  createUserDocumentFromAuth,
  
} from '../../utils/firebase/firebase.utils';

// Create a form field object
const defaultFormFields = {
  email: '',
  password: '',
}

const SignInForm = () => {
   // create state for formfield to save default form 
  const [formFields, setFormFields] = useState(defaultFormFields)
  // detrcture the value of formfield 
  const {email,password} = formFields

  // handle change for form 
const handleChange = (event) => {
  // initialize name and value and tie into the name and value in the input
  const {name, value} = event.target
  // set formfield use ({...formFields,[name]:value})
  setFormFields({...formFields,[name]:value})
}

// handle reset form feild
const resetFormFields = () => {
  setFormFields(defaultFormFields)
}

// Handle with Google Sign In
 const signInWithGoogle = async () => {
    const {user} = await signInWithGooglePopup();
    await createUserDocumentFromAuth(user)
  }

// handle formsubmit
const handleSubmit = async (event) => {
  event.preventDefault()
  try {
    const response = await signInAuthUserWithEmailAndPassword(email, password)
    console.log(response)
    resetFormFields(defaultFormFields)
  } catch(error) {
    if(error.code === 'auth/invalid-credential') {
      alert('Invaid Credentail')
    }
  }}

  return(
    <div className='sign-up-container'>
      <h2>I already have an account</h2>
      <span>Sign in with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label='email'
          type="email"required
          onChange={handleChange}
          name='email'
          value={email}
        />
          <FormInput
          label='password'
          type="password"required
          onChange={handleChange}
          name='password'
          value={password}
        />
        <div className="buttons-container">
          <Button type="submit">Sign In</Button>
          <Button type='button' buttonType='google' onClick={signInWithGoogle}>
            Google sign in
          </Button>
        </div>
      </form>
    </div>
  )
}

export default SignInForm