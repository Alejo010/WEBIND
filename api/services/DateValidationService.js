/**
 * Created by webind on 30/09/2017.
 */

module.exports = {

  dateValidation: function (req, callback) {
    var result = {}
    var initialDate = req.param('initialDate');
    var finalDate = req.param('finalDate');

    if (!finalDate && (!initialDate || !_.isDate(initialDate))) {
      result = {response: "ERROR", message: 'Invalid date format for initialDate'};
    }
    else
      result.finalDate = finalDate

    if (!initialDate && (!finalDate || !_.isDate(finalDate))) {
      result = {response: "ERROR", message: 'Invalid date format for finalDate.'};
    }
    else
      result.initialDate = initialDate

    result.query = {}
    if (initialDate && finalDate && !result.response) {
      result.query.date = {">=": new Date(req.param('initialDate')), "<=": new Date(req.param('finalDate'))}
    }
    else if (initialDate && !result.response) {
      result.query.date = {">=": new Date(req.param('initialDate'))}
    }
    else if (!result.response) {

      result.query.date = {"<=": new Date(req.param('finalDate'))}
    }

    callback(result)
  },

  validatePagination: function (req, res, callback) {
    let page = 0;
    let len = 10;

    if (req.param('page') !== undefined) {
      if (!isNaN(parseInt(req.param('page')))) {
        page = Math.abs(parseInt(req.param('page')));
      } else {
        callback({err: sails.__("ERROR_PAGE_INVALID")}, undefined);
      }
    }

    if (req.param('len') !== undefined) {
      if (!isNaN(parseInt(req.param('len')))) {
        len = Math.abs(parseInt(req.param('len')));
      } else {
        callback({err: sails.__("ERROR_LEN_INVALID")}, undefined);
      }
    }

    callback(undefined, page, len)
  }
};
