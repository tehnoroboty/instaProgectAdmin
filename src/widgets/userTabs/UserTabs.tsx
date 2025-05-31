import { UploadedPhotos } from './UploadedPhotos'
import {Payments} from "./Payments";
import {Followers} from "./Followers";
import {Following} from "@/src/widgets/userTabs/Following";
import {Tab} from "@/src/shared/types/types";
import {usePathname, useRouter} from 'next/navigation';
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@radix-ui/react-tabs";
import s from './userTabs.module.scss'

export const dataTabs: Tab[] = [
  {
    title: 'Uploaded Photos',
    value: 'uploaded-photos',
    page: <UploadedPhotos />,
  },
  {
    title: 'Payments',
    value: 'payments',
    page: <Payments />,
  },
  {
    title: 'Followers',
    value: 'followers',
    page: <Followers />,
  },
  {
    title: 'Following',
    value: 'following',
    page: <Following />,
  },
]

export const UserTabs = ({ userId }: { userId: string }) => {
  const router = useRouter()
  const pathname = usePathname()
  const currentTab = pathname.split('/').pop() || 'general-information'
  // const isAuth = localStorage.getItem('accessToken')

/*
  if (!isAuth) {
    router.push(AuthRoutes.LOGIN)
  }
*/
  const handleTabChange = (newTab: string) => {
    router.push(`/users-list/${userId}/${newTab}`)
  }
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
    <div className={s.page}>
      <Tabs className={s.tabs} onValueChange={handleTabChange} value={currentTab}>
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


