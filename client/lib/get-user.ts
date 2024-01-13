

const BASE_URL = process.env.BASE_URL

export const getCurrentProfile = async () => {

    const token = localStorage.getItem('token')
    const userId = localStorage.getItem('userId')

    const profile = fetch(`${BASE_URL}/api/profiles/${userId}`)

}
