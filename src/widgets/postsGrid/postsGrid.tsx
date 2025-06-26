'use client'


import s from './postsGrid.module.scss'
import {Post, PostType} from "@/src/widgets/post/post";

type Props = {
    posts: PostType[]
}


export const PostsGrid = ({posts}: Props) => {
    if (posts.length === 0) {
        return null
    }
    return (
        <div className = {s.container}>
            <div>
                <div className = {s.postsContainer}>
                    {posts?.map(post => (
                        post.id && <Post key = {post.id} post = {post}/>
                    ))}
                </div>
            </div>


        </div>
    )
}
