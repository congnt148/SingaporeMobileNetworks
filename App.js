import React, {Component} from 'react';
import AppNavigator from './src/navigators/Index';

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <AppNavigator />;
  }
}
export default App;
