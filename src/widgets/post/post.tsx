import React, {useState} from 'react'


import * as Collapsible from '@radix-ui/react-collapsible'
import clsx from 'clsx'
import Image from 'next/image'

import s from './post.module.scss'
import {Button, Carousel, CreationTime, UserAvatarName} from "@tehnoroboty/ui-kit";
import {PostImage} from "@tehnoroboty/ui-kit/dist/lib/types/types";
import {Block, Unblock} from "@/src/shared/assets/componentsIcons";
import ImageNotFound from "@/src/shared/assets/componentsIcons/ImageNotFound";
import imageNotFound from "@/src/shared/assets/icons/image-not-found.svg";


type Props = {
    post: PostType
}

export type PostType = {
    images: PostImage[]
    id: number
    ownerId: number
    description: string
    createdAt: Date
    updatedAt: Date
    postOwner: {
        userName: string
        firstName: string
        lastName: string
        avatars: {
            url: string,
        }[]
    }
    userBan: {
        reason: string
        createdAt: Date
    }
}


export const Post = ({post}: Props) => {
    const {id, images, createdAt, description, postOwner, ownerId, userBan} = post
    const [open, setOpen] = useState<boolean>(false)

    const isDescriptionLong = description.length > 60
    const truncatedDescription = description.slice(0, 61) + '...'

    const classNames = clsx(s.cardLowerPart, {[s.shifted]: open})
    const containerClasses = clsx(s.carouselContainer, {[s.open]: open})

    const renderImgCarousel = (img: PostImage) => {
        if (img.url) {
            return <Image alt = {''} className = {s.img} height = {img.height} src = {img.url} width = {img.width}/>
        } else {
            return <ImageNotFound height = {194} width = {199}/>
        }
    }
    return (
        <div className = {s.card} id = {`${id}`}>
            <div className = {containerClasses}>
                <Carousel disableSwipe = {open} list = {images} renderItem = {renderImgCarousel}
                          size = {'small'}/>
            </div>
            <Collapsible.Root onOpenChange = {setOpen} open = {open}>
                <div className = {classNames}>
                    <div className = {s.avatarsWrapper}>{}
                        <UserAvatarName className = {s.owner}
                                        url = {postOwner?.avatars[0]?.url ? postOwner.avatars[0].url : imageNotFound}
                                        username = {postOwner.userName}/>
                        <Button variant = {"transparent"} className = {s.avatarsBlocked}>
                            {!userBan?.reason && <Block/>}
                        </Button>
                    </div>
                    <CreationTime createdAt = {createdAt.toString()}/>
                    <p className = {s.descriptionText}>
                        {!isDescriptionLong || open ? description : truncatedDescription}
                    </p>
                    <Collapsible.Trigger asChild>
                        {isDescriptionLong && (
                            <Button className = {s.showmoreBtn} variant = {'transparent'}>
                                {open ? 'Hide' : 'Show more'}
                            </Button>
                        )}
                    </Collapsible.Trigger>
                </div>
            </Collapsible.Root>
        </div>
    )
}
