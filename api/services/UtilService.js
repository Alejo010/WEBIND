/**
 * Created by Felipe Rodriguez Arias <ucifarias@gmail.com> on 06/11/2017.
 */

module.exports = {
  promisify: callback => {
    return () => {
      let args = [].slice.call(arguments);
      return new Promise((resolve, reject) => {
        args.push((err, result) => {
          if (err) {
            return reject(err);
          }
          if (arguments.length <= 2) {
            resolve(result);
          } else {
            resolve([].slice.call(arguments, 1));
          }
        });
        callback.apply(null, args);
      });
    }
  },
};
