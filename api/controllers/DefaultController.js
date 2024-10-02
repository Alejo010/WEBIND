/**
 * DefaultController
 *
 * @description :: Server-side logic for managing Antecedentes_patologicos_fams
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

const homeAction = (req, res) => {
  res.view('homepage', {layout: 'layout'});
  // res.view('homepage');
};

module.exports = {
  homeAction,
};

