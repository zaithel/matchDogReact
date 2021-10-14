// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';

const Character = {
  "ALEGRE": "ALEGRE",
  "TRANQUILO": "TRANQUILO",
  "SOCIABLE": "SOCIABLE",
  "ANSIOSO": "ANSIOSO",
  "ENERGETICO": "ENERGETICO"
};

const { Match, User } = initSchema(schema);

export {
  Match,
  User,
  Character
};