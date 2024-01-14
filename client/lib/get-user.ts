

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL

export const getCurrentProfile = async () => {

   fetch(`${BASE_URL}/api/v1/profile/me`, {
        headers: {
             "Authorization": `Bearer ${localStorage.getItem('token')}`
        }
     }).then((res) => {
        if (res.ok) {
             return res.json();
        } else {
             throw new Error("Unauthorized");
        }
     }).then((data) => {
        return data.user
     }).catch((err) => {
        console.error(err);
     })
}
