'use client'
import React from 'react'

import { ImagePost } from '@/src/queries/types'
import ImageNotFound from '@/src/shared/assets/componentsIcons/ImageNotFound'
import Image from 'next/image'

import s from './posts.module.scss'

type Props = {
  posts: ImagePost[]
}

export const Posts = ({ posts }: Props) => {
  return (
    <div className={s.postsGrid}>
      {posts.map(post => {
        return (
          <div className={s.image} key={post.id}>
            {post.url ? (
              <Image alt={'Post image'} height={228} src={post.url} width={234} />
            ) : (
              <div className={s.notFound}>
                <ImageNotFound height={194} width={199} />
                <div>
                  <b>No Image</b>
                </div>
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
