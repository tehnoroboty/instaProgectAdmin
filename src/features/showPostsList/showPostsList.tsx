'use client'

import s from './showPostsList.module.scss'
import {Input, Loader} from "@tehnoroboty/ui-kit";

// const POSTS_PER_PAGE = 8

export const ShowPostsList = () => {
    const loading = true

    return (
        <div className = {s.container}>
            <div className = {s.header}>
                <Input
                    className = {s.searchInput}
                    // onInput = {handleInputChange}
                    placeholder = {'Search'}
                    type = {'search'}
                />
                {loading ? (
                    <div className = {s.loading}>
                        <Loader color = {'#4C8DFF'} size = {20}/>
                    </div>
                ) : (
                    <div>POSTS</div>
                )}

            </div>
        </div>
    )
}
