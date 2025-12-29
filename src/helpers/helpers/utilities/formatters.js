import moment from "moment";
import numeral from "numeral";
import _ from "lodash";

function dateTime(date) {
  if (!!date) return moment(date).format("MM-DD-YYYY hh:mm:ss");
}

function date(date, fmt) {
  var dateStr = moment(new Date(date)).format(fmt || "MMM DD, YYYY");
  return dateStr === "Invalid date" ? date : dateStr;
}

function intlCurrency(amount) {
  return _.isNumber(amount) ? numeral(amount).format("0,0.00") : amount;
}

function number(amount) {
  return _.isNumber(amount) ? numeral(amount).format("0,0") : amount;
}

function percent(amount) {
  return _.isNumber(amount) ? numeral(amount).format("0%") : amount;
}

function percent1(amount) {
  return _.isNumber(amount) ? numeral(amount).format("0.0%") : amount;
}

function validateDates(from, to, onfail) {
  if (moment(from).isAfter(to)) onfail();
}

function capitalizeFirstLetter(string) {
  if (!string) {
    return "";
  }
  let words = string.split(" ");
  return _.map(words, function (word) {
    return word.charAt(0).toUpperCase() + word.slice(1);
  }).join(" ");
}

function parseNewLines(text, separator) {
  if (!text) {
    return "";
  }
  separator = separator || "<br />";
  return text ? text.replace(/\n/g, separator) : "";
}

function phoneHref(string) {
  if (!string) {
    return "";
  }
  return "tel:" + string.replace(/[^0-9+]/g, "");
}

export default {
  dateTime,
  date,
  intlCurrency,
  number,
  percent,
  percent1,
  validateDates,
  capitalizeFirstLetter,
  parseNewLines,
  phoneHref,
};
