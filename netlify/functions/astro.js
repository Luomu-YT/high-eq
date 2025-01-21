// netlify/edge-functions/astro.js
export default async (request) => {

    const value = `; ${document.cookie}`
    const parts = value.split(`; 'highEQ'=`)
    let openId = null
    if (parts.length === 2)
        openId = parts.pop()?.split(';').shift() || null

    if (!openId)
        console.log(openId)
        localStorage.setItem('openId', openId)
        window.location.href = '/oauth/password'
};

