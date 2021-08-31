import React, {Component} from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {ifIphoneX} from 'react-native-iphone-x-helper';
import containers from '../../containers/Index';
const {width, height} = Dimensions.get('window');

const RESOURCE_ID = 'a807b7ab-6cad-4aa6-87d0-e283a7353a0f';
class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      limitRecords: 100,
      dataRes: '',
      dataRecords: [],
      indexsRecSel: [],
    };
  }

  componentDidMount() {
    this._reloadData();
  }
  _reloadData = async () => {
    var {limitRecords} = this.state;
    let res = await containers.home.getDatastoreSearch(
      RESOURCE_ID,
      limitRecords,
    );
    if (res && res.success) {
      let dataRecordsFormatted =
        await containers.home.syntheticVolumeDataRecordsForY(
          (res.result && res.result.records) || [],
        );
      this.setState({
        dataRes: res.result || '',
        dataRecords: dataRecordsFormatted || [],
      });
    } else {
    }
  };

  _selRecord = index => {
    var {indexsRecSel} = this.state;
    const arr = indexsRecSel.slice();
    if (arr.includes(index)) {
      const indexOf = arr.indexOf(index);
      arr.splice(indexOf, 1);
    } else {
      arr.push(index);
    }
    this.setState({indexsRecSel: arr});
  };
  renderItemRecords = ({item, index}) => {
    var {indexsRecSel} = this.state;
    return (
      <TouchableOpacity
        onPress={() => this._selRecord(index)}
        style={[
          styles.styItemRecords,
          // eslint-disable-next-line react-native/no-inline-styles
          {
            backgroundColor:
              indexsRecSel.indexOf(index) !== -1 ? '#CF8984' : 'white',
          },
        ]}>
        <Text style={styles.styTxtVolumeItemRecords}>{`${
          item.volume_of_mobile_data || ''
        }`}</Text>
      </TouchableOpacity>
    );
  };
  render() {
    var {dataRecords} = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text
            style={styles.styTxtTitHer}>{`Singapore’s mobile networks`}</Text>
        </View>
        <View>
          {dataRecords == '' ? (
            <ActivityIndicator size="large" color="black" />
          ) : (
            <FlatList
              showsVerticalScrollIndicator={false}
              data={dataRecords || []}
              renderItem={this.renderItemRecords}
              keyExtractor={(item, index) => index.toString()}
              contentContainerStyle={{paddingBottom: 100}}
            />
          )}
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#FFC009',
    ...ifIphoneX(
      {
        paddingTop: 50,
      },
      {
        paddingTop: 20,
      },
    ),
  },
  styTxtTitHer: {
    fontSize: 20,
    fontWeight: '500',
  },
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
    width: width,
    height: height,
  },
  styItemRecords: {
    backgroundColor: 'white',
    marginHorizontal: 16,
    marginVertical: 6,
    padding: 20,
    borderRadius: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  styTxtVolumeItemRecords: {
    fontSize: 17,
    fontWeight: '400',
    marginVertical: 2,
  },
});

export default HomeScreen;
