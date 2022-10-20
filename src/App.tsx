import clsx from 'clsx'
import { Outlet, NavLink, Navigate } from 'react-router-dom'
import { useRecoilState } from 'recoil'

import { authStore } from 'store/auth'

const commonClasses = 'px-4 text-lg h-full flex justify-center items-center'
const activeClasses = 'text-blue-300'
const unactiveClasses = ''

function getClasses(isActive: boolean) {
    return clsx(commonClasses, {
        [activeClasses]: isActive,
        [unactiveClasses]: !isActive,
    })
}

export default function App() {
    const [auth, setAuth] = useRecoilState(authStore)

    const handleLogout = () => {
        setAuth({
            isAuthed: false,
        })
        localStorage.setItem('isAuthed', '0')
    }

    if (!auth.isAuthed) {
        return <Navigate to='login' />
    }

    return (
        <div className='relative pt-[68px] h-screen'>
            <div
                className={clsx(
                    'h-[68px] absolute border-b',
                    'w-full top-0',
                    'flex justify-between items-center'
                )}
            >
                <div className={clsx('space-x-2 flex items-center h-full')}>
                    <NavLink
                        to='/'
                        end
                        className={({ isActive }) => getClasses(isActive)}
                    >
                        home
                    </NavLink>
                    <NavLink
                        to='posts'
                        className={({ isActive }) => getClasses(isActive)}
                    >
                        posts
                    </NavLink>
                    <NavLink
                        to='todo'
                        className={({ isActive }) => getClasses(isActive)}
                    >
                        todo
                    </NavLink>
                </div>
                <div className='px-4 cursor-pointer' onClick={handleLogout}>
                    logout
                </div>
            </div>
            <div className='h-full'>
                <Outlet />
            </div>
        </div>
    )
}
