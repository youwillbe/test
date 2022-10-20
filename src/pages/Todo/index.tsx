import { Button, SegmentedControl, TextInput } from '@mantine/core'
import clsx from 'clsx'
import { nanoid } from 'nanoid'
import { filter, prepend } from 'ramda'
import { useState, MouseEvent } from 'react'
import { useForm } from 'react-hook-form'
import { useRecoilState, useRecoilValue } from 'recoil'

import { finishedTodosStore, todoStore, unFinishedTodosStore } from 'store/todo'

type FormValue = {
    todo: string
}

export default function Todo() {
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<FormValue>()

    const [stage, setStage] = useState<'0' | '1' | '2'>('0')

    const [todos, setTodos] = useRecoilState(todoStore)
    const finishedTodos = useRecoilValue(finishedTodosStore)
    const unFinishedTodos = useRecoilValue(unFinishedTodosStore)

    const onSubmit = handleSubmit(formValue => {
        setValue('todo', '')
        setTodos(v =>
            prepend(
                {
                    id: nanoid(),
                    text: formValue.todo,
                    isFinished: false,
                },
                v
            )
        )
    })

    const handleDelete = (e: MouseEvent, id: string) => {
        e.stopPropagation()
        setTodos(v => filter(x => id !== x.id, v))
    }

    const toggleFinish = (id: string) => {
        setTodos(v =>
            v.map(x => (x.id === id ? { ...x, isFinished: !x.isFinished } : x))
        )
    }

    const handleChange = (v: '0' | '1' | '2') => {
        setStage(v)
    }

    return (
        <div className='flex justify-center p-2'>
            <div className='w-[500px] space-y-2'>
                <form noValidate autoComplete='off' onSubmit={onSubmit}>
                    <TextInput
                        placeholder='请输入TODO，按回车确认'
                        {...register('todo', {
                            required: '请输入有效的TODO再提交',
                        })}
                        error={errors.todo?.message ?? ''}
                    />
                </form>
                <SegmentedControl
                    onChange={handleChange}
                    value={stage}
                    data={[
                        { label: '全部', value: '0' },
                        { label: '未完成', value: '1' },
                        { label: '已完成', value: '2' },
                    ]}
                />
                {{ '0': todos, '1': unFinishedTodos, '2': finishedTodos }[
                    stage
                ].map(todo => (
                    <div
                        key={todo.id}
                        className={clsx(
                            'flex items-center justify-between',
                            'py-2 pl-4 pr-2 border rounded cursor-pointer',
                            {
                                'bg-green-100': todo.isFinished,
                            }
                        )}
                        onClick={() => toggleFinish(todo.id)}
                    >
                        <div className='select-none'>{todo.text}</div>
                        <Button
                            variant='subtle'
                            onClick={(e: MouseEvent) =>
                                handleDelete(e, todo.id)
                            }
                        >
                            删除
                        </Button>
                    </div>
                ))}
            </div>
        </div>
    )
}
