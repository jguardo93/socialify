import jstz from "jstz";
//import parseDateTime from "../services/momentHelper";
import underscoreStr from "underscore.string";
import filters from "./utilities/filters";
import formatters from "./utilities/formatters";

function setupGlobalFunctions(BrowserServiceLocator) {

  function nextWrapper(next) {
    return function (data) {
      next(null, data);
    };
  }

  function browserTZ() {
    return jstz.determine().name();
  }

  function toBrowserTZ(date) {
    let tz = browserTZ();
    return true //parseDateTime(date, tz);
  }

  function optionize(list) {
    return _.map(list, function (m) {
      return {
        val: m,
        text: underscoreStr.titleize(underscoreStr.humanize(m)),
      };
    });
  }

  function dateHour(date) {
    if (date) return toBrowserTZ(date).format("MM-DD-YYYY h:A");
  }
}

export default {
  filters,
  formatters,
};
