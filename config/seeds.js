/**
 * Sails Seed Settings
 * (sails.config.seeds)
 *
 * Configuration for the data seeding in Sails.
 *
 * For more information on configuration, check out:
 * http://github.com/frostme/sails-seed
 */
module.exports.seeds = {
  disable: false,
  user: {
    data: [
      {
        name: 'j',
        email:  'j',
        password: 'j',
        passwordConfirmation: 'j',
      }
    ],
    overwrite: true
  }
}
