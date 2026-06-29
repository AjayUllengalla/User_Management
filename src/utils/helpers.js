import { DEPARTMENTS } from './constants';

/**
 * Maps raw API user to our internal format.
 * Splits "name" into firstName/lastName, assigns a default department.
 */
export const mapApiUser = (user) => {
  const parts = user.name.split(' ');
  return {
    id: user.id,
    firstName: parts[0] || '',
    lastName: parts.slice(1).join(' ') || '',
    email: user.email,
    department: DEPARTMENTS[user.id % DEPARTMENTS.length],
  };
};

export const generateId = (users) => {
  return users.length > 0 ? Math.max(...users.map((u) => u.id)) + 1 : 1;
};
