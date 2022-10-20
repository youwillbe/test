import { atom, selector } from 'recoil'

type Todo = {
    id: string
    text: string
    isFinished: boolean
}

export const todoStore = atom<Todo[]>({
    key: 'todoStore',
    default: [],
})

export const finishedTodosStore = selector({
    key: 'finishedTodosStore',
    get: ({ get }) => {
        return get(todoStore).filter(x => x.isFinished)
    },
})

export const unFinishedTodosStore = selector({
    key: 'unFinishedTodosStore',
    get: ({ get }) => {
        return get(todoStore).filter(x => !x.isFinished)
    },
})
