import { useState } from 'react'

import { SortDirection } from '@/src/queries/types'
import { type SortColumn, Tab } from '@/src/shared/types/types'
import { Following } from '@/src/widgets/userTabs/following/Following'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@tehnoroboty/ui-kit'

import { Followers } from './followers/Followers'
import { Payments } from './payments/Payments'
import { UploadedPhotos } from './uploadedPhotos/UploadedPhotos'

const DEFAULT_TAB = 'uploaded-photos'

type Props = {
  userId: number
}

export const UserTabs = ({ userId }: Props) => {
  const [currentTab, setCurrentTab] = useState(DEFAULT_TAB)

  const dataTabs: Tab[] = [
    {
      page: <UploadedPhotos userId={userId} />,
      title: 'Uploaded Photos',
      value: 'uploaded-photos',
    },
    {
      page: <Payments userId={userId} />,
      title: 'Payments',
      value: 'payments',
    },
    {
      page: <Followers userId={userId} />,
      title: 'Followers',
      value: 'followers',
    },
    {
      page: <Following userId={userId} />,
      title: 'Following',
      value: 'following',
    },
  ]

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
