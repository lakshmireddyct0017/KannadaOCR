import moment from 'moment'
import ltrim from 'validator/lib/ltrim'
import rtrim from 'validator/lib/rtrim'

export function trim(string) {
    return ltrim(rtrim(string))
}

export function stringToDate(date) {
    return moment(date, 'yyyy-MM-DD')
}

export function formateDate(date) {
    const mDate = stringToDate(date)
    return mDate.format('DD/MM/yyyy')
}

export function formatBytes(bytes, decimals = 2) {
    if (bytes === 0) return '0 Bytes';

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}