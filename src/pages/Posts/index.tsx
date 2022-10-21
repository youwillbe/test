import { Button, Loader, Table, Drawer } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { isNil } from 'ramda'
import { MouseEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Pagination } from '@mantine/core'

import { Post, postService } from 'service/post'

import UpsertForm from './UpsertForm'

export default function Posts() {
    const queryClient = useQueryClient()

    const [opened, handlers] = useDisclosure(false)

    const navigate = useNavigate()

    const [query, setQuery] = useState({
        page: 1,
        pageSize: 10,
    })

    const [current, setCurrent] = useState<(Post & { id: number }) | null>(null)

    const { isLoading, data } = useQuery(['post', 'page', query], () =>
        postService.page(query)
    )

    const deleteMutation = useMutation(postService.delete, {
        onSuccess: () => {
            if (data?.data.length === 1 && query.page > 1) {
                setQuery(q => ({ ...q, page: q.page - 1 }))
            }
            queryClient.invalidateQueries(['post', 'page'])
        },
    })

    const handleClickRow = (id: number) => {
        navigate(`/post/${id}`)
    }

    const handleDelete = (e: MouseEvent, id: number) => {
        e.stopPropagation()
        deleteMutation.mutate(id)
    }

    const handleEdit = (e: MouseEvent, post: Post & { id: number }) => {
        e.stopPropagation()
        setCurrent(post)
        handlers.open()
    }

    const handleClickNew = () => {
        setCurrent(null)
        handlers.open()
    }

    const handleChangePage = (page: number) => {
        setQuery(q => ({ ...q, page }))
    }

    if (isLoading) {
        return (
            <div className='grid h-full place-items-center'>
                <Loader variant='dots' />
            </div>
        )
    }

    const rows = (data?.data || []).map(element => (
        <tr
            key={element.id}
            className='hover:!bg-blue-100 cursor-pointer'
            onClick={() => handleClickRow(element.id)}
        >
            <td>{element.attributes.title}</td>
            <td>{element.attributes.content}</td>
            <td className='flex space-x-4'>
                <Button
                    variant='subtle'
                    classNames={{
                        root: '!p-0',
                    }}
                    onClick={(e: MouseEvent) =>
                        handleEdit(e, {
                            id: element.id,
                            title: element.attributes.title,
                            content: element.attributes.content,
                        })
                    }
                >
                    编辑
                </Button>
                <Button
                    variant='subtle'
                    classNames={{
                        root: '!p-0',
                    }}
                    onClick={(e: MouseEvent) => handleDelete(e, element.id)}
                >
                    删除
                </Button>
            </td>
        </tr>
    ))

    return (
        <div className='p-2 space-y-2'>
            <div className='flex justify-end'>
                <Button onClick={handleClickNew}>添加</Button>
            </div>
            <Table striped withBorder>
                <thead>
                    <tr>
                        <th>标题</th>
                        <th>内容</th>
                        <th>操作</th>
                    </tr>
                </thead>
                <tbody>{rows}</tbody>
            </Table>
            <Pagination
                total={data?.meta.pagination.pageCount ?? 0}
                page={query.page}
                onChange={handleChangePage}
            />
            <Drawer
                title={isNil(current) ? '新增文章' : '修改文章'}
                opened={opened}
                onClose={handlers.close}
                position='right'
                size='lg'
                classNames={{
                    drawer: 'relative !pt-[55px]',
                    header: 'absolute w-full top-0 h-[55px] border-b px-4 !mb-0',
                }}
            >
                <UpsertForm onClose={handlers.close} current={current} />
            </Drawer>
        </div>
    )
}
