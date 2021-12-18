export const loggedInCheck = async () => {
    const response = await fetch('http://192.168.1.32:5000/logged', {
        method: 'GET',
        credentials: "same-origin",
        credentials: 'include',
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },   
    })

    if (response.ok) {
        const result = await response.json()
        return result
    }

    const errMessage = await response.text()
    throw new Error(errMessage)
}

export const getUserInfo = async () => {
    const response = await fetch('http://192.168.1.32:5000/userInfo', {
        method: 'GET',
        credentials: "same-origin",
        credentials: 'include',
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }, 
    })

    if (response.ok) {
        const result = await response.json()
        return result
    }

    const errMessage = await response.text()
    throw new Error(errMessage)
}
  
export const registerUser = async (firstName, lastName, city, birthDate, id_num, phone_num) => {
    const response = await fetch('http://192.168.1.32:5000/userInfo', {
        method: 'POST',
        credentials: "same-origin",
        credentials: 'include',
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }, 
        body: JSON.stringify({ firstName, lastName, city, birthDate, id_num, phone_num })
    })

    if (response.ok) {
        const result = await response.json()
        return result
    }

    const errMessage = await response.text()
    throw new Error(errMessage)
}
  
export const AuthReq = async (email, password, route) => {
    const response = await fetch('http://192.168.1.32:5000/' + route, {
        method: 'POST',
        credentials: "same-origin",
        credentials: 'include',
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }, 
        body: JSON.stringify({ email, password }),
        
    })

    if (response.ok) {
        const result = await response.json()
        return result
    }

    const errMessage = await response.text()
    throw new Error(errMessage)
}

export const logoutUser = async () => {
    const response = await fetch('http://192.168.1.32:5000/logout', {
        method: 'POST',
        credentials: "same-origin",
        credentials: 'include',
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }, 
    })

    if (response.ok) {
        const result = await response.json()
        return result
    }

    const errMessage = await response.text()
    throw new Error(errMessage)
}