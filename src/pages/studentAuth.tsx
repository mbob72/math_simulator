import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Button from "@mui/material/Button";

// a mock function to check if the user is authenticated
const checkAuth = () => {
    // you can implement your own authentication logic here
    const isAuthenticated = false // replace with your actual authentication check
    return isAuthenticated
}

const StudentAuthPage = () => {
    const router = useRouter()
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [password, setPassword] = useState('')
    const [errorMsg, setErrorMsg] = useState('')

    useEffect(() => {
        const isAuthenticated = checkAuth()
        setIsAuthenticated(isAuthenticated)
        if (isAuthenticated) {
            router.push('/lesson')
        }
    }, [router])

    const handleSubmit = (e) => {
        e.preventDefault()
        // you can implement your own password validation logic here
        const validPassword = '123456' // replace with your actual valid password
        if (password === validPassword) {
            router.push('/lesson')
        } else {
            setErrorMsg('Invalid password. Please try again.')
        }
    }

    return (
        <div>
            {!isAuthenticated && (
                <form onSubmit={handleSubmit}>
                    <label>
                        Password:
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </label>
                    <Button type="submit" onClick={handleSubmit}>Submit</Button>
                    {errorMsg && <p>{errorMsg}</p>}
                </form>
            )}
        </div>
    )
}

export default StudentAuthPage
