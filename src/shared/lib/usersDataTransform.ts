import type {User} from "@/src/queries/types";
import {format} from "date-fns";
import type {TableUser} from "@/src/shared/types/types";

export const usersDataTransform = (users: Partial<User>[]): TableUser[] => {
    return users.map(user => {
            const userName = user?.profile?.firstName && user?.profile?.lastName ? `${user?.profile?.firstName} ${user?.profile?.lastName}` : '';

            return {
                id: `${user.id}` || '',
                userName,
                profileLink: user.userName || '',
                createdAt: format(new Date(user.createdAt), 'dd.MM.yyyy'),
                isBlocked: !!user.userBan?.createdAt,
            }
        }
    )
}