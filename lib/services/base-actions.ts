export type BaseActionParams = {
  [key: string]: any
}

export type BaseActionResult = {
  success: boolean
  message: string
}

export async function addCustomer(params: BaseActionParams): Promise<BaseActionResult> {
  console.log('Adding customer with params:', params)
  return {
    success: true,
    message: `Added customer ${params.name} with contact info: ${params.contact}`
  }
}

export async function scheduleAppointment(params: BaseActionParams): Promise<BaseActionResult> {
  console.log('Scheduling appointment with params:', params)
  return {
    success: true,
    message: `Scheduled appointment for ${params.customer} on ${params.date} at ${params.time}`
  }
}

export async function sendConfirmation(params: BaseActionParams): Promise<BaseActionResult> {
  console.log('Sending confirmation with params:', params)
  return {
    success: true,
    message: `Sent confirmation to ${params.recipient} via ${params.medium}`
  }
}

export const BASE_ACTIONS = {
  add_customer: addCustomer,
  schedule_appointment: scheduleAppointment,
  send_confirmation: sendConfirmation
} 