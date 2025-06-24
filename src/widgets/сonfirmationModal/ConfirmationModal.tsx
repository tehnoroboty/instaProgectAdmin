import { ReactNode } from 'react'

import { Button, Dialog, Typography } from '@tehnoroboty/ui-kit'

import s from './сonfirmationModal.module.scss'

type Props = {
  loading?: boolean
  modalMessage: ReactNode | string
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
        {typeof modalMessage === 'string' ? (
          <Typography option={'regular_text16'}>{modalMessage}</Typography>
        ) : (
          modalMessage
        )}
        <div className={s.additionalModalBtns}>
          <Button className={s.btn} disabled={loading} onClick={onClickNo} variant={'primary'}>
            {'No'}
          </Button>
          <Button className={s.btn} disabled={loading} onClick={onClickYes} variant={'bordered'}>
            {'Yes'}
          </Button>
        </div>
      </div>
    </Dialog>
  )
}
