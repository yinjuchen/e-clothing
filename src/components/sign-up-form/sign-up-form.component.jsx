import { useState } from "react"
import { 
  createAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth
 } from "../../utils/firebase/firebase.utils"

import FormInput from "../form-input/form-input.component"
import './sign-up-form.styles.scss'
import Button from "../button/button.component"

// Create a form field object
const defaultFormFields = {
  displayName: '',
  email: '',
  password: '',
  confirmPassword: ''
}

const SignUpForm = () => {
  // create state for formfield to save default form 
  const [formFields, setFormFields] = useState(defaultFormFields)
  // detrcture the value of formfield 
  const {displayName, email,password, confirmPassword} = formFields

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

// handle formsubmit
const handleSubmit = async (event) => {
  event.preventDefault()
    if(password !== confirmPassword)  {
      alert('password is incorrect') 
      return
    }
 
  try {
  
    const {user} = await createAuthUserWithEmailAndPassword(email, password)
    await createUserDocumentFromAuth(user, {displayName})
    resetFormFields(defaultFormFields)

  } catch(error) {
    if(error.code === 'auth/email-already-in-use') {
      alert('Cannot create user, email already in use')
    } else {
      console.log('error', error.code)
    }
  }
}

  return(
    <div className="sign-up-container">
      <h2>Don't have an account</h2>
      <span>Sign up with your email an password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label='displayName'
          type="text" required 
          onChange={handleChange} 
          name='displayName'
          value={displayName}
        />

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

        <FormInput
          label='confirmPassword'
          type="password" required
          onChange={handleChange}
          name='confirmPassword'
          value={confirmPassword}
        />
        <Button type="submit">Sign Up</Button>
      </form>
    </div>

  )
}

export default SignUpForm