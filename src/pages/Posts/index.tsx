import { Button, Loader, Table } from '@mantine/core'
import { useQuery } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { postService } from 'service/post'

type IProps = {}

export default function Posts({}: IProps) {
    const navigate = useNavigate()
    const { isLoading, data } = useQuery(['post', 'list'], postService.list)

    const handleClickRow = (id: string) => {
        navigate(`/post/${id}`)
    }

    if (isLoading) {
        return (
            <div className='grid h-full place-items-center'>
                <Loader variant='dots' />
            </div>
        )
    }

    const rows = (data || []).map(element => (
        <tr
            key={element.id}
            className='hover:!bg-blue-100 cursor-pointer'
            onClick={() => handleClickRow(element.id)}
        >
            <td>{element.text}</td>
            <td>{element.status}</td>
            <td className='flex space-x-4'>
                <Button
                    variant='subtle'
                    classNames={{
                        root: '!p-0',
                    }}
                >
                    编辑
                </Button>
                <Button
                    variant='subtle'
                    classNames={{
                        root: '!p-0',
                    }}
                >
                    删除
                </Button>
            </td>
        </tr>
    ))

    return (
        <Table striped>
            <thead>
                <tr>
                    <th>post</th>
                    <th>status</th>
                    <th>action</th>
                </tr>
            </thead>
            <tbody>{rows}</tbody>
        </Table>
    )
}
