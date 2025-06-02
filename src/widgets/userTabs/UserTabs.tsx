import { useEffect, useState } from 'react'

import { Tab } from '@/src/shared/types/types'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/src/shared/ui/tabs/Tabs'
import { Following } from '@/src/widgets/userTabs/Following'
import { usePathname, useRouter } from 'next/navigation'

import { Followers } from './Followers'
import { Payments } from './Payments'
import { UploadedPhotos } from './UploadedPhotos'
// import s from './userTabs.module.scss'

export const dataTabs: Tab[] = [
  {
    page: <UploadedPhotos />,
    title: 'Uploaded Photos',
    value: 'uploaded-photos',
  },
  {
    page: <Payments />,
    title: 'Payments',
    value: 'payments',
  },
  {
    page: <Followers />,
    title: 'Followers',
    value: 'followers',
  },
  {
    page: <Following />,
    title: 'Following',
    value: 'following',
  },
]

const DEFAULT_TAB = 'uploaded-photos'

type Props = {
  userId: number
}

export const UserTabs = ({ userId }: Props) => {
  const [currentTab, setCurrentTab] = useState(DEFAULT_TAB)
  const router = useRouter()
  const pathname = usePathname()
  const handleTabChange = (value: string) => setCurrentTab(value)

  const renderTabsList = (disabled = false) => (
    <TabsList loop>
      {dataTabs.map(tab => (
        <TabsTrigger disabled={disabled} key={tab.value} value={tab.value}>
          {tab.title}
        </TabsTrigger>
      ))}
    </TabsList>
  )

  return (
    <div>
      <Tabs onValueChange={handleTabChange} value={currentTab}>
        {renderTabsList()}
        {dataTabs.map(tab => (
          <TabsContent key={tab.value} value={tab.value}>
            {tab.page}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}
