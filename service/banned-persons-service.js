const { Op } = require('sequelize');
const { sequelize } = require('../db');
const ApiError = require('../exceptions/api-error');
const BannedPersons = sequelize.models.BannedPersons;

class BannedPersonsService {
  async checkPerson(body) {
    const input = body?.value;

    if (input !== null && input !== undefined) {
      const formattedInput = input.replace(/ /g, '');

      const persons = await BannedPersons.findAll();
      const formattedPersons = persons.map((person) => ({
        ...person.toJSON(),
        value: person?.value?.replace(/ /g, ''),
      }));

      const matchingPersons = formattedPersons.filter(
        (person) => person.value === formattedInput
      );

      return matchingPersons;
    } else {
      return [];
    }
  }
}

module.exports = new BannedPersonsService();
