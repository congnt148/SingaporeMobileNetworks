import Utils from '../common/Utils';
const PREFIX = '/api/action';

async function getDatastoreSearch(resourceId = '', limit = 10) {
  let res = await Utils.getApi(
    `${PREFIX}/datastore_search?resource_id=${resourceId}&limit=${limit}`,
  );
  return res;
}

export {getDatastoreSearch};
