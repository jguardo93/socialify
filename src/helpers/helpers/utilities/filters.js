import underscoreStr from "underscore.string";
import moment from "moment-timezone";
//import MomentHelper from "../../services/momentHelper";
import _ from "lodash";

function doubleDash(val) {
  return val || "--";
}

function list(val, emptyStr) {
  if (_.isEmpty(val)) return emptyStr || "";
  return val.join(", ");
}

function dateStr(val, fmt) {
  let dateStr = moment(val).format(fmt || "MMM DD, YYYY");
  return dateStr === "Invalid date" ? val : dateStr;
}

function localDate(val, field, format) {
  if (!val) return "";
  let timezone = this.$get(field);
  format = format || "MMM DD, h A";
 // if (timezone) return MomentHelper.parseDateTime(val, timezone).format(format);
  return moment(val).format(format) + " *";
}

function coordinates(val) {
  if (_.isArray(val))
    return _.map(val, function (i) {
      return parseInt(i);
    });
  return val;
}

function elipsis(val) {
  return val.length < 75 ? val : val.substring(0, 72) + "...";
}

function integer(val) {
  return !val ? 0 : val.toFixed(0);
}

function title(val) {
  return underscoreStr.titleize(val);
}

export default {
  doubleDash,
  list,
  dateStr,
  localDate,
  coordinates,
  elipsis,
  integer,
  title,
};
