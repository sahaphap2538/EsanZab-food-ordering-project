
const setTableNo = (tableNo) => {
    localStorage.setItem('TABLE_NO', tableNo)
}

const getTableNo = () => {
    return localStorage.getItem('TABLE_NO')
}

const removeTableNo = () => {
    localStorage.removeItem('TABLE_NO')
}

const localStorageTableNo = {
    setTableNo,
    getTableNo,
    removeTableNo
}


export default localStorageTableNo