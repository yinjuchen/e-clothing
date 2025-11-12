// step 1
import { createContext, useState,useEffect } from "react"
import { onAuthStateChangedListener, createUserDocumentFromAuth } from "../utils/firebase/firebase.utils"

// as the actual value you want to access
export const UserContext = createContext({
  setCurrentUser: () => null,
  currentUser: null,

})

// create a provider 
export const UserProvider = ({children}) => {
  const [currentUser, setCurrentUser] = useState(null)
  const value = {currentUser, setCurrentUser}

  // when user sign out, we want to store null
  // when user sign in, we want to store object

  useEffect(()=> {
    const unsubscribe = onAuthStateChangedListener((user)=>{
      if(user) {
        createUserDocumentFromAuth(user)
      }
      setCurrentUser(user)
      console.log(user)
    })
    return unsubscribe
  },[])
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}


