var Model = require('objection').Model;

/**
 * @extends Model
 * @constructor
 */
function Person() {
  Model.apply(this, arguments);
}

Model.extend(Person);
module.exports = Person;

// Table name is the only required property.
Person.tableName = 'Person';

// Optional JSON schema. This is not the database schema! Nothing is generated
// based on this. This is only used for validation. Whenever a model instance
// is created it is checked against this schema. http://json-schema.org/.
Person.jsonSchema = {
  type: 'object',
  required: ['firstName', 'lastName'],

  properties: {
    id: {type: 'integer'},
    firstName: {type: 'string', minLength: 1, maxLength: 255},
    lastName: {type: 'string', minLength: 1, maxLength: 255}
    username: {type 'string', minLength: 1, maxLength: 255},
    password {type 'string', minLength: 1, maxLength: 255}
  }
};

// This object defines the relations to other models.
Person.relationMappings = {
 
};