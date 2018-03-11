import localforage from 'localforage'
localforage.config({
    driver: [localforage.INDEXEDDB, localforage.WEBSQL, localforage.LOCALSTORAGE],
    name: 'deerlet',
    version: 1.0,
    storeName: 'deerlet',
    description: 'deerletlocalforage db'
  })
  export default localforage