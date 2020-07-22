import moment, { Moment } from 'moment'

const lastOnline = (lastAction: Moment) => {
  const tenMinues = 600000
  const isOnlineNow = moment().diff(lastAction) < tenMinues

  return isOnlineNow ? 'Online': lastAction.fromNow()
}

const daysUntillHomeworkDue = (date: Moment) => {
  const today = moment().startOf('day')

  const dueDate = date.startOf('day')

  if (dueDate.toString() === today.toString()) return 'Homework is due today.'

  if (dueDate < today) return 'Homework is late. Im gonna tell your mama.'
  
  const daysDifference = dueDate.diff(today, 'days')

  if (daysDifference === 1 ) return 'Homework is due tomorrow, get too it kiddo.'

  return `${daysDifference} days`

}

const daysDifference = (startDate: Moment, endDate: Moment) => {
  return startDate.startOf('day').diff(endDate.endOf('day'), 'days')
}

const prettifyDate = (date: Moment) => {
  if (!date) return 'N/A'

  return date.format('L')
}

const dates = {lastOnline, daysUntillHomeworkDue, daysDifference, prettifyDate}

export default dates