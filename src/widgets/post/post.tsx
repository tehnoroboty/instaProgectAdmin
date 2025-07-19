import React, { useState } from 'react'

import { PostType } from '@/src/queries/types'
import { Block, Unblock } from '@/src/shared/assets/componentsIcons'
import ImageNotFound from '@/src/shared/assets/componentsIcons/ImageNotFound'
import imageNotFound from '@/src/shared/assets/icons/image-not-found.svg'
import { UserModalType } from '@/src/shared/types/types'
import * as Collapsible from '@radix-ui/react-collapsible'
import { Button, Carousel, CreationTime, UserAvatarName } from '@tehnoroboty/ui-kit'
import { PostImage } from '@tehnoroboty/ui-kit/dist/lib/types/types'
import clsx from 'clsx'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

import s from './post.module.scss'

type Props = {
  openModal: (type: UserModalType, post: PostType) => void
  post: PostType
}

export const Post = ({ openModal, post }: Props) => {
  const { createdAt, description, id, images, ownerId, postOwner, userBan } = post
  const router = useRouter()

  const [open, setOpen] = useState<boolean>(false)
  const isDescriptionLong = description.length > 60
  const truncatedDescription = description.slice(0, 61) + '...'

  const classNames = clsx(s.cardLowerPart, { [s.shifted]: open })
  const containerClasses = clsx(s.carouselContainer, { [s.open]: open })

  const renderImgCarousel = (img: PostImage) => {
    if (img.url) {
      return (
        <Image alt={''} className={s.img} height={img.height} src={img.url} width={img.width} />
      )
    } else {
      return <ImageNotFound height={194} width={199} />
    }
  }

  const bunUnbanUserHandler = () => {
    if (userBan?.reason) {
      openModal('unban', post)
    } else {
      openModal('ban', post)
    }
  }

  const postClickHandler = () => {
    router.push(`/users-list/${ownerId}`)
  }

  return (
    <div className={s.card} id={`${id}`}>
      <div className={containerClasses}>
        <Carousel disableSwipe={open} list={images} renderItem={renderImgCarousel} size={'small'} />
      </div>
      <Collapsible.Root onOpenChange={setOpen} open={open}>
        <div className={classNames}>
          <div className={s.avatarsWrapper}>
            <div onClick={postClickHandler}>
              <UserAvatarName
                className={s.owner}
                url={postOwner?.avatars[0]?.url ? postOwner.avatars[0].url : imageNotFound}
                username={postOwner.userName}
              />
            </div>
            <Button
              className={s.avatarsBlocked}
              onClick={bunUnbanUserHandler}
              variant={'transparent'}
            >
              {!userBan?.reason ? <Block /> : <Unblock />}
            </Button>
          </div>
          <CreationTime createdAt={createdAt.toString()} />
          <p className={s.descriptionText}>
            {!isDescriptionLong || open ? description : truncatedDescription}
          </p>
          <Collapsible.Trigger asChild>
            {isDescriptionLong && (
              <Button className={s.showmoreBtn} variant={'transparent'}>
                {open ? 'Hide' : 'Show more'}
              </Button>
            )}
          </Collapsible.Trigger>
        </div>
      </Collapsible.Root>
    </div>
  )
}
