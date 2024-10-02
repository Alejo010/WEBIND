/**
 * Created by Felipe Rodriguez Arias <ucifarias@gmail.com> on 06/11/2017.
 */

module.exports = {

  validateDate: function (req) {
    let result = {};
    const initialDate = req.param('initialDate');
    const finalDate = req.param('finalDate');

    if (!finalDate && (!initialDate || !_.isDate(initialDate))) {
      return new Promise((resolve, reject) => {
        reject('Invalid date format for initialDate');
      });
    }

    if (!initialDate && (!finalDate || !_.isDate(finalDate))) {
      return new Promise((resolve, reject) => {
        reject('Invalid date format for finalDate.');
      });
    }

    result.finalDate = finalDate;
    result.initialDate = initialDate;
    result.query.date = {">=": new Date(initialDate), "<=": new Date(finalDate)};

    return new Promise((resolve, reject) => {
      resolve(result);
    });
  },
  validatePagination: function (req) {
    let page = 0, length = 10;

    if (req.param('page') !== undefined) {
      if (!isNaN(parseInt(req.param('page')))) {
        page = Math.abs(parseInt(req.param('page')));
      } else {
        return new Promise((resolve, reject) => {
          reject(sails.__("ERROR_PAGE_INVALID"));
        });
      }
    }

    if (req.param('len') !== undefined) {
      if (!isNaN(parseInt(req.param('len')))) {
        length = Math.abs(parseInt(req.param('len')));
      } else {
        return new Promise((resolve, reject) => {
          reject(sails.__("ERROR_LEN_INVALID"));
        });
      }
    }

    return new Promise((resolve, reject) => {
      resolve({page, length});
    });
  },
};
