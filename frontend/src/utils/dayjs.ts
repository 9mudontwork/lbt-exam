import dayjs from 'dayjs'
import duration from 'dayjs/plugin/duration'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'
import relativeTime from 'dayjs/plugin/relativeTime'

dayjs.extend(duration)
dayjs.extend(customParseFormat)
dayjs.extend(utc)
dayjs.extend(timezone)
dayjs.extend(relativeTime)

type DefaultTimeZoneType = 'Asia/Bangkok'

function dateTimeToFormat({
  date,
  timezone,
  format = 'DD/MM/YYYY HH:mm:ss',
}: {
  date: string
  timezone?: DefaultTimeZoneType
  format?: string
}) {
  return dayjs.tz(dayjs(date), timezone).format(format)
}

function formatDuration(duration: plugin.Duration): string {
  let formatString = ''

  if (duration.years() > 0) {
    formatString += 'y[y] '
  }

  if (duration.months() > 0) {
    formatString += 'M[M] '
  }

  if (duration.days() > 0) {
    formatString += 'D[d] '
  }

  if (duration.hours() > 0) {
    formatString += 'H[h] '
  }

  if (duration.minutes() > 0) {
    formatString += 'm[m] '
  }

  if (duration.seconds() > 0) {
    formatString += 's[s]'
  }

  if (duration.milliseconds()) {
    if (formatString === '0') {
      formatString = 'SSS[ms]'
    } else {
      formatString += ' SSS[ms]'
    }
  }

  return duration.format(formatString.trim()) || '-'
}

interface GetTimeDuration {
  start: dayjs.Dayjs
  end: dayjs.Dayjs
  timezone?: DefaultTimeZoneType | string
}

function getTimeDuration({
  start,
  end,
  timezone,
}: GetTimeDuration): plugin.Duration {
  const startTime = dayjs.tz(start, timezone)
  const endTime = dayjs.tz(end, timezone)

  const diff = endTime.diff(startTime)
  const duration = dayjs.duration(diff)

  return duration
}

export { dayjs, dateTimeToFormat, formatDuration, getTimeDuration }
