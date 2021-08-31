import apis from '../apis/Index';

async function getDatastoreSearch(resourceId = '', limit = 100) {
  let res = await apis.home.getDatastoreSearch(resourceId, limit);
  return res;
}

async function syntheticVolumeDataRecordsForY(dataRecords = []) {
  let dataRecordsNew = [];
  dataRecords.forEach((record, index) => {
    if (dataRecordsNew.length > 0) {
      if (
        getYearOfQuarter(dataRecords[index - 1].quarter) ==
        getYearOfQuarter(record.quarter)
      ) {
        dataRecordsNew[dataRecordsNew.length - 1].volume_of_mobile_data +=
          parseFloat(record.volume_of_mobile_data);
      } else {
        dataRecordsNew.push({
          year: getYearOfQuarter(record.quarter),
          volume_of_mobile_data: parseFloat(record.volume_of_mobile_data),
        });
      }
    } else {
      dataRecordsNew.push({
        year: getYearOfQuarter(record.quarter),
        volume_of_mobile_data: parseFloat(record.volume_of_mobile_data),
      });
    }
  });
  return dataRecordsNew;
}
function getYearOfQuarter(quarter = '') {
  return quarter.slice(0, 4);
}

export {syntheticVolumeDataRecordsForY, getDatastoreSearch};
