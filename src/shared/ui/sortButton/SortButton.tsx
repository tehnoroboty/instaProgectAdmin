import clsx from 'clsx';
import s from './SortButton.module.scss';
import {ArrowSortDown, ArrowSortUp} from "@/src/shared/assets/componentsIcons";
import {SortDirection} from "@/src/queries/types";

export type SortColumn = 'userName' | 'createdAt'

type Props = {
    column: SortColumn;
    currentSort: SortDirection | 'none';
    onSortChange: (column: SortColumn, currentSort: SortDirection | 'none') => void;
}
export const SortButton = ({column, onSortChange, currentSort}: Props) => {

    const toggleSort = () => {
        const newSort = currentSort === "none" ? SortDirection.Asc : currentSort === SortDirection.Asc ? SortDirection.Desc : "none";

        // console.log(newSort)

        onSortChange(column, newSort)
    }

    return (
        <button
            className={clsx(s.sortBtn)}
            onClick={toggleSort}>
            <span
                className={clsx(s.arrow, s.up, {
                    [s.active]: currentSort === SortDirection.Asc,
                    [s.disabled]: currentSort === SortDirection.Desc,
                    [s.neutral]: currentSort === 'none'
                })}
            >
                <ArrowSortUp/>
            </span>

            <span
                className={clsx(s.arrow, s.down, {
                    [s.active]: currentSort === SortDirection.Desc,
                    [s.disabled]: currentSort === SortDirection.Asc,
                    [s.neutral]: currentSort === 'none'
                })}
            >
                <ArrowSortDown/>
            </span>
        </button>
    );
}