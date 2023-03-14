import { IconMdiPencil } from '@/components/Utils/Icon'
import { useDataTableContext } from '@/email-logs/context/DataTableContext'
import SendEmailApi from '@/services/data-source/remote/SendMailApi'
import { FormSendEmail as IForm } from '@/services/interfaces/sendMail'
import SendMailRepository from '@/services/repository/sendMail'
import { Button, Form, Input, Modal, notification } from 'antd'
import { useMemo, useState } from 'react'

type NotificationType = 'success' | 'info' | 'warning' | 'error'

export const FormSendEmail = () => {
  const [open, setOpen] = useState(false)
  const [confirmLoading, setConfirmLoading] = useState(false)
  const { fetchEmailLog } = useDataTableContext()
  const [api, contextHolder] = notification.useNotification()

  const sendMailRp = useMemo(() => {
    return new SendMailRepository(new SendEmailApi())
  }, [])

  function sendMail(data: IForm) {
    setConfirmLoading(true)
    sendMailRp.sendEmail(data).subscribe({
      next: () => {
        fetchEmailLog()
        form.resetFields()
      },
      error: (err) => {
        setConfirmLoading(false)
        openNotificationWithIcon({
          type: 'error',
          title: err.error,
          description: err.message[0],
        })
      },
      complete: () => {
        setConfirmLoading(false)
        setOpen(false)
        openNotificationWithIcon({
          type: 'success',
          title: 'Send email successfully',
        })
      },
    })
  }

  const [form] = Form.useForm<IForm>()

  const onFinish = (values: IForm) => {
    sendMail(values)
  }

  const validateMessages = {
    required: '${label} is required!',
    types: {
      email: '${label} is not a valid email!',
    },
  }

  const showModal = () => {
    setOpen(true)
  }

  const handleOk = () => {
    form.submit()
  }

  const handleCancel = () => {
    setOpen(false)
  }

  function openNotificationWithIcon({
    type,
    title,
    description,
  }: {
    type: NotificationType
    title?: string
    description?: string
  }) {
    api[type]({
      message: title,
      description,
    })
  }

  return (
    <>
      <Button
        icon={<IconMdiPencil className="mr-2 inline-block" />}
        type="primary"
        onClick={showModal}
      >
        New Mail
      </Button>

      {contextHolder}

      <Modal
        title="Form Send Mail"
        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          validateMessages={validateMessages}
        >
          <Form.Item
            label="To"
            name="recipient"
            rules={[
              {
                required: true,
                type: 'email',
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Subject"
            name="subject"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Text"
            name="body"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input.TextArea rows={3} />
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}
