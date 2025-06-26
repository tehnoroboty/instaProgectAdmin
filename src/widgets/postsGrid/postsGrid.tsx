'use client'


import s from './postsGrid.module.scss'
import {Post, PostType} from "@/src/widgets/post/post";

type Props = {
    posts: PostType[]
}


export const PostsGrid = ({posts}: Props) => {
    return (
        <div className = {s.container}>
            <div>
                <div className = {s.postsContainer}>
                    {posts?.map(post => (
                        <Post key = {post.id} post = {post}/>
                    ))}
                </div>
            </div>


        </div>
    )
}
