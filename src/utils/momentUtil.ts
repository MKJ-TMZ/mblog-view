import * as moment from 'moment'
import 'moment/dist/locale/zh-cn'

// 显示距离现在的时间
export function dateFromNow(date: any) {
  // 时间大于一个月,显示日期
  if (moment().diff(moment(date)) > 30 * 24 * 60 * 60 * 1000) {
    return moment(date).format('YYYY-MM-DD')
  }
  return moment(date).fromNow()
}