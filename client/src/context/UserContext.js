import React, { createContext, useContext, useState } from 'react'
import { node } from 'prop-types'
import localStorageServices from '../services/localStorageServices'

const { getRole } = localStorageServices

const UserContext = createContext({})

export function useUserContext() {
    return useContext(UserContext)
}


const initailUser = {
    role: getRole() 
}

export function UserProvider ( { children }) {
    const [user, setUser] = useState(initailUser)

    function setRole(role) {
        setUser( preUser => ({...preUser, role: role}))
    }

    const userStore = {
        user,
        userAction: {
            setRole,
        }
    }

    return (
        <UserContext.Provider value={userStore}>{children}</UserContext.Provider>
    )
}

UserProvider.propTypes = {
    children: node.isRequired,
}
