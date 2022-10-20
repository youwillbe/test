import { atom } from 'recoil'

export const authStore = atom({
    key: 'authStore',
    default: {
        isAuthed: localStorage.getItem('isAuthed') === '1',
    },
})
