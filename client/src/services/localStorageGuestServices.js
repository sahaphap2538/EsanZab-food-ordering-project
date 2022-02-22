
const setGuestID = (id) => {
    localStorage.setItem('GUEST_ID', id)
}

const getGuestID = () => {
    return Number(localStorage.getItem('GUEST_ID'))
}

const removeGuestID = () => {
    localStorage.removeItem('GUEST_ID')
}

const localStorageGuestServices = {
    setGuestID,
    getGuestID,
    removeGuestID
}


export default localStorageGuestServices