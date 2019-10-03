var moment = require('moment');
var jalali = require('jalaali-js');
var stringHelper = require('./stringHelper');

function getJalaaliDatetime(gregorianMoment, jalaliMonths) {
  var jalaliDate = jalali.toJalaali(
    gregorianMoment.year(),
    gregorianMoment.month() + 1,
    gregorianMoment.date()
  );
  var output =
    // eslint-disable-next-line prefer-template
    jalaliDate.jd + ' ' + jalaliMonths[jalaliDate.jm - 1] + ' ' + jalaliDate.jy;
  return output;
}

function addJalaliDate(locale, jalaliMonths, jalaliFormats, gregorianString) {
  var gregorianMoment = moment(gregorianString, jalaliFormats, locale, true);

  // gregorianString must be in one of jalaliFormats, and return an isValid moment for
  // Jalali calendar to be applied to - e.g this will exclude timeago timestamps
  if (gregorianMoment.isValid() && jalaliMonths.length === 12) {
    // eslint-disable-next-line prefer-template
    return (
      // eslint-disable-next-line prefer-template
      stringHelper.useEasternNumerals(
        getJalaaliDatetime(gregorianMoment, jalaliMonths)
      ) +
      ' - ' +
      stringHelper.useEasternNumerals(gregorianString)
    );
  }
  return gregorianString;
}

exports.addJalaliDate = addJalaliDate;
exports.getJalaaliDatetime = getJalaaliDatetime;
