'use client'
import { useTranslation } from 'react-i18next'
import { useCallback, useState } from 'react'
import { useRouter } from 'next/navigation'
import Button from '@/app/components/base/button'
import CustomDialog from '@/app/components/base/dialog'
import Textarea from '@/app/components/base/textarea'
import Toast from '@/app/components/base/toast'
import { logout } from '@/service/common'

type DeleteAccountProps = {
  onCancel: () => void
  onConfirm: () => void
}

export default function FeedBack(props: DeleteAccountProps) {
  const { t } = useTranslation()
  const router = useRouter()
  const [userFeedback, setUserFeedback] = useState('')

  const handleSuccess = useCallback(async () => {
    try {
      await logout({
        url: '/logout',
        params: {},
      })

      if (localStorage?.getItem('console_token'))
        localStorage.removeItem('console_token')
      router.push('/signin')
      Toast.notify({ type: 'info', message: t('common.account.deleteSuccessTip') })
    }
    catch (error) { console.error(error) }
  }, [router, t])

  const handleSubmit = useCallback(async () => {
    try {
      props.onConfirm()
      handleSuccess()
    }
    catch (error) { console.error(error) }
  }, [handleSuccess, props])

  const handleSkip = useCallback(() => {
    props.onCancel()
    handleSuccess()
  }, [handleSuccess, props])
  return <CustomDialog
    show={true}
    onClose={props.onCancel}
    title={t('common.account.feedbackTitle')}
    className="max-w-[480px]"
    footer={false}
  >  <div className='flex flex-col gap-4'>
      <label className='system-sm-semibold text-text-secondary'>{t('common.account.feedbackLabel')}</label>
      <Textarea rows={4} value={userFeedback} placeholder={t('common.account.feedbackPlaceholder') as string} onChange={(e) => {
        setUserFeedback(e.target.value)
      }} />
      <div className='w-full flex flex-col gap-2 pb-6'>
        <Button className='w-full' variant='primary' onClick={handleSubmit}>{t('common.operation.submit')}</Button>
        <Button className='w-full' onClick={handleSkip}>{t('common.operation.skip')}</Button>
      </div>
    </div>
  </CustomDialog>
}
