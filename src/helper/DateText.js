import _ from 'lodash';

class DateText {
  static getChatTimeText(date) {
    const sentDate = new Date(date);
    const currentDate = new Date();
    const difference = currentDate.getTime() - sentDate.getTime();
    const differenceInSeconds = _.round(difference / 1000, 0);
    const differenceInMinutes = _.floor(differenceInSeconds / 60, 0);
    const differenceInHours = _.floor(differenceInMinutes / 60, 0);
    const differenceInDays = _.floor(differenceInHours / 24, 0);

    if (differenceInSeconds <= 5) {
      return 'just now';
    } else if (differenceInSeconds < 60) {
      return differenceInSeconds + 's';
    } else if (differenceInMinutes < 60) {
      return differenceInMinutes + 'm';
    } else if (differenceInHours < 24) {
      return differenceInHours + 'h';
    }

    return differenceInDays + 'd';
  }

  static formatDate(input, includeYear = true) {
    const pad = s => String(s).padStart(2, '0');
    const date = new Date(input);
    const day = pad(date.getUTCDate());
    const month = pad(date.getUTCMonth() + 1);
    const year = date.getFullYear();
    const hour = pad(date.getUTCHours());
    const minutes = pad(date.getMinutes());

    return includeYear ? `${day}/${month}/${year} ${hour}:${minutes}` : `${day}/${month} ${hour}:${minutes}`;
  }

  static getHoursAndMins(input) {
    const pad = s => String(s).padStart(2, '0');
    const date = new Date(input);
    const hour = pad(date.getUTCHours());
    const minutes = pad(date.getMinutes());
    return `${hour}:${minutes}`;
  }
}

export default DateText;
