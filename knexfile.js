module.exports = {

  development: {
    client: 'postgresql',
    connection: {
      database: 'projekti1'
    },
    pool: {
      min: 2,
      max: 10
    }
  },

};