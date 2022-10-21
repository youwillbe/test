import { Button, TextInput } from '@mantine/core'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { isNil } from 'ramda'
import { useForm } from 'react-hook-form'

import { Post, postService } from 'service/post'

type IProps = {
    onClose: () => void
    current: (Post & { id: number }) | null
}

export default function UpsertForm({ onClose, current }: IProps) {
    const queryClient = useQueryClient()

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Post>({
        defaultValues: {
            title: current?.title,
            content: current?.content,
        },
    })

    const createMutation = useMutation(postService.create, {
        onSuccess: () => {
            queryClient.invalidateQueries(['post', 'page'])
            onClose()
        },
    })

    const updateMutaion = useMutation(postService.update, {
        onSuccess: () => {
            queryClient.invalidateQueries(['post', 'page'])
            onClose()
        },
    })

    const onSubmit = handleSubmit(formValue => {
        if (isNil(current)) {
            createMutation.mutate(formValue)
        } else {
            updateMutaion.mutate({
                data: formValue,
                id: current.id,
            })
        }
    })
    return (
        <form
            className='flex flex-col h-full'
            noValidate
            autoComplete='off'
            onSubmit={onSubmit}
        >
            <div className='flex-grow p-4 space-y-2'>
                <TextInput
                    label='标题'
                    withAsterisk
                    placeholder='请输入标题'
                    {...register('title', { required: '标题为必填项' })}
                    error={errors.title?.message ?? ''}
                />
                <TextInput
                    label='内容'
                    placeholder='请输入内容'
                    {...register('content')}
                />
            </div>
            <div className='h-[50px] flex items-center justify-end space-x-4 px-4 border-t'>
                <Button variant='light' color='red'>
                    取消
                </Button>
                <Button type='submit'>确认</Button>
            </div>
        </form>
    )
}
