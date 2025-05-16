"use client"

import {useGetUsersQuery} from "@/src/queries/users/getUsers.generated";
import {type QueryGetUsersArgs, SortDirection, UserBlockStatus} from "@/src/queries/types";
import {usersDataTransform} from "@/src/shared/lib/usersDataTransform";
import {UsersTable} from "@/src/widgets/usersTable/usersTable";
import type {TableUser} from "@/src/shared/types/types";
import {Pagination} from "@/src/shared/ui/pagination/Pagination";
import {SelectBox} from "@/src/shared/ui/select/SelectBox";
import {Input} from "@/src/shared/ui/input";
import s from './showUsersList.module.scss'
import {useEffect, useState} from "react";



const USERS_PER_PAGE = 8;
const SELECT_OPTIONS = [
    {value: UserBlockStatus.All, valueTitle: 'Not selected'},
    {value: UserBlockStatus.Blocked, valueTitle: 'Blocked'},
    {value: UserBlockStatus.Unblocked, valueTitle: 'Not blocked'}]

export const ShowUsersList = () => {
    const variables: QueryGetUsersArgs = {
        "pageSize": USERS_PER_PAGE,
        "pageNumber": 1,
        "sortBy": "createdAt",
        "sortDirection": SortDirection.Desc,
        "searchTerm": "",
        "statusFilter": UserBlockStatus.All
    }
    const {data, loading, error} = useGetUsersQuery({variables})

    const [transformedData, setTransformedData] = useState<TableUser[]>([])

    useEffect(() => {
        if (data && data.getUsers) {
            const transformed = usersDataTransform(data.getUsers.users)
            setTransformedData(transformed)
            console.log(transformed)
        } else {
            setTransformedData([])
        }
    }, [data])

    return (
        <div className={s.container}>
            <div className={s.header}>
                <Input placeholder={'Search'} className={s.searchInput}/>
                <SelectBox className={s.selector} options={SELECT_OPTIONS}/>
            </div>
            <UsersTable data={transformedData}/>
            <Pagination className={s.pagination} currentPage={1} totalCount={10} onPageChange={() => {
            }} onPageSizeChange={() => console.log('page change')} pageSize={USERS_PER_PAGE}/>
        </div>
    )
}
