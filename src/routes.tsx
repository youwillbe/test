import { createBrowserRouter } from 'react-router-dom'

import App from 'App'

import Posts from 'pages/Posts'
import Login from 'pages/Login'
import Todo from 'pages/Todo'
import Home from 'pages/Home'
import Post from 'pages/Post'

export const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {
                index: true,
                element: <Home />,
            },
            {
                path: 'posts',
                element: <Posts />,
            },
            {
                path: 'todo',
                element: <Todo />,
            },
            {
                path: 'post/:postId',
                element: <Post />,
            },
        ],
    },
    {
        path: 'login',
        element: <Login></Login>,
    },
])
