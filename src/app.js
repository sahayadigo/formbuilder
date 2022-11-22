import React from 'react';
import FormBuilder from './components/Formbuilder';
import 'react-form-builder2/dist/app.css';
//import { ReactFormBuilder, ElementStore } from 'react-form-builder2';
import * as variables from '../src/variables';

class App extends React.Component {

  render() {
    return (
      <div className="App">
        <FormBuilder.ReactFormBuilder
          variables={variables}
          locale='en'
        />
      </div>
    );
  }
}

export default App;

