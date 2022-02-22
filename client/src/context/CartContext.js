import React, { createContext, useContext, useState } from 'react'
import { node } from 'prop-types'
import localStorageUserServices from '../services/localStorageUserServices'
import localStorageGuestServices from '../services/localStorageGuestServices'
import axios from '../config/axios'

const { getUserID, getRole } = localStorageUserServices
const { getGuestID } = localStorageGuestServices

const CartContext = createContext({})

export function useCartContext() {
    return useContext(CartContext)
}

const initailCart = {
   id: '',
   total: '',
   Food: []
}

export function CartProvider({ children }) {
    const [cart, setCart] = useState(initailCart)

    const fetchCartData = async () => {
        await axios.get('/cart')
            .then(res => {
                console.log(res.data)
                const data = [...res.data]
                //item.CartId have id like UserId
                if (getRole() === 'user') {
                    const filterDataByUserId = data.find(item => item.id === getUserID())
                    setCart(filterDataByUserId)
                    console.log(filterDataByUserId)
                } else {
                    const filterDataByGuestId = data.find(item => item.id === getGuestID())
                    setCart(filterDataByGuestId)
                    console.log(filterDataByGuestId)
                }
            })
    }


    const cartStore = {
        cart,
        cartAction: {
            fetchCartData,
        }
    }

    return (
        <CartContext.Provider value={cartStore}>{children}</CartContext.Provider>
    )
}

CartProvider.propTypes = {
    children: node.isRequired,
}
