'use strict';

module.exports = {
  // Texts for special filters.
  labels: {
    rolesAll: '[All]',
    contactsAll: '[All]',
  },

  // Request values for special filters.
  values: {
    rolesAll: 'all',
    contactsAll: 'all',
  },

  // Resource names.
  resources: {
    globalComponentContacts: 'global-component-contacts/',
  },

  // Identifiers for contact type; they should match the URL fragment used in
  // the API
  contactType: {
    person: 'people',
    mailingList: 'mailing-lists',
  },

  // Default page size - affects number of items in the data table.
  default_page_size: 20,
}

