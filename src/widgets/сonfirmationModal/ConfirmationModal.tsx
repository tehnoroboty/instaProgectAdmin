import { Button } from '@/src/shared/ui/button/Button'
import { Dialog } from '@/src/shared/ui/dialog'
import { Typography } from '@/src/shared/ui/typography/Typography'

import s from './сonfirmationModal.module.scss'

type Props = {
  loading?: boolean
  modalMessage: string
  modalTitle: string
  onClickNo: () => void
  onCloseModal: () => void
  onCloseParentModal: () => void
  open: boolean
}

export const ConfirmationModal = ({
  loading,
  modalMessage,
  modalTitle,
  onClickNo,
  onCloseModal,
  onCloseParentModal,
  open,
}: Props) => {
  const onClickYes = () => {
    onCloseModal()
    onCloseParentModal()
  }

  return (
    <Dialog
      className={s.additionalModal}
      modalTitle={modalTitle}
      onClose={onCloseModal}
      open={open}
    >
      <div>
        <Typography option={'regular_text16'}>{modalMessage}</Typography>
        <div className={s.additionalModalBtns}>
          <Button className={s.btn} disabled={loading} onClick={onClickYes} variant={'bordered'}>
            {'Yes'}
          </Button>
          <Button className={s.btn} disabled={loading} onClick={onClickNo} variant={'primary'}>
            {'No'}
          </Button>
        </div>
      </div>
    </Dialog>
  )
}
