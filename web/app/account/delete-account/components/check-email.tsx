'use client'
import { useTranslation } from 'react-i18next'
import { useState } from 'react'
import { useAppContext } from '@/context/app-context'
import Input from '@/app/components/base/input'
import Button from '@/app/components/base/button'

type DeleteAccountProps = {
  onCancel: () => void
  onConfirm: () => void
}

export default function CheckEmail(props: DeleteAccountProps) {
  const { t } = useTranslation()
  const { userProfile } = useAppContext()
  const [userInputEmail, setUserInputEmail] = useState('')
  return <div className='flex flex-col gap-4'>
    <div className='text-text-destructive body-md-medium'>
      {t('common.account.deleteTip')}
    </div>
    <label className='system-sm-semibold text-text-secondary'>{t('common.account.deleteLabel')}</label>
    <div>
      <Input placeholder={t('common.account.deletePlaceholder') as string} onChange={(e) => {
        setUserInputEmail(e.target.value)
      }} />
    </div>
    <div className='w-full flex flex-col gap-2 pb-6'>
      <Button className='w-full' disabled={userInputEmail !== userProfile.email} variant='primary' onClick={props.onConfirm}>{t('common.account.sendVerificationButton')}</Button>
      <Button className='w-full' onClick={props.onCancel}>{t('common.operation.cancel')}</Button>
    </div>
  </div>
}
