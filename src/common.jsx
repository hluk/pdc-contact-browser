'use strict';

module.exports = {
  // Texts for special filters.
  labels: {
    releaseAll: '[All]',
    releaseAllGlobal: '[All global]',
    releaseAllRelease: '[All with release]',
    rolesAll: '[All]',
    contactsAll: '[All]',
  },

  // Request values for special filters.
  values: {
    releaseAll: 'all',
    releaseAllGlobal: 'global',
    releaseAllRelease: 'release',
    rolesAll: 'all',
    contactsAll: 'all',
  },

  // Resource names.
  resources: {
    allComponentContacts: 'all-component-contacts/',
    globalComponentContacts: 'global-component-contacts/',
    releaseComponentContacts: 'release-component-contacts/',
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

