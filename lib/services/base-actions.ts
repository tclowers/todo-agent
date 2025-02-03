export type BaseActionParams = {
  // Add customer params
  name?: string
  address?: string
  phone_number?: string
  email?: string
  preferred_medium?: 'phone' | 'text' | 'email'
  
  // Schedule appointment params
  customer?: string
  date?: string
  time?: string
  type?: string
  notes?: string
  
  // Send confirmation params
  recipient?: string
  medium?: 'email' | 'phone' | 'text'
  message?: string
}

export type BaseActionResult = {
  success: boolean
  message: string
}

export async function addCustomer(params: BaseActionParams): Promise<BaseActionResult> {
  console.log('Adding customer with params:', params)
  return {
    success: true,
    message: `Added customer ${params.name} with contact info: ${params.phone_number || params.email}`
  }
}

export async function scheduleAppointment(params: BaseActionParams): Promise<BaseActionResult> {
  console.log('Scheduling appointment with params:', params)
  return {
    success: true,
    message: `Scheduled ${params.type} appointment for ${params.customer} on ${params.date} at ${params.time}`
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