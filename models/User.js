var Model       = require('objection').Model;
var bcrypt      = require('bcrypt-nodejs');
/**
 * @extends Model
 * @constructor
 */
function User() {
  Model.apply(this, arguments);
}

Model.extend(User);
module.exports = User;

// Table name is the only required property.
User.tableName = 'User';

// Optional JSON schema. This is not the database schema! Nothing is generated
// based on this. This is only used for validation. Whenever a model instance
// is created it is checked against this schema. http://json-schema.org/.
User.jsonSchema = {
  type: 'object',
  required: ['firstName', 'lastName', 'username', 'password'],

  properties: {
    id: {type: 'integer'},
    firstName: {type: 'string', minLength: 1, maxLength: 255},
    lastName: {type: 'string', minLength: 1, maxLength: 255},
    username: {type: 'string', minLength: 1, maxLength: 255},
    password: {type: 'string', minLength: 1, maxLength: 255},
    isAdmin: {type: 'boolean'}
  }
};

// This object defines the relations to other models.
User.relationMappings = {
  messages: {
    relation: Model.OneToManyRelation,
    modelClass: require('./Message'),
    join: {
      from: 'User.id',
      to: 'Message.author'
    }
   } 
};
