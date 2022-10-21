import { Navigate } from 'react-router-dom'
import { useRecoilState } from 'recoil'

import { authStore } from 'store/auth'

export default function Login() {
    const [auth, setAuth] = useRecoilState(authStore)

    const handleClick = () => {
        setAuth({
            isAuthed: true,
        })
        localStorage.setItem('isAuthed', '1')
    }

    if (auth.isAuthed) {
        return <Navigate to='/' />
    }

    return (
        <div>
            <button onClick={handleClick}>登录</button>
        </div>
    )
}
