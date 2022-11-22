/**
  * <ReactFormBuilder />
*/

import React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { IntlProvider } from 'react-intl';
import Preview from '../Preview';
import Previewform from '../Preview/previewform';
import Toolbar from '../Toolbar';
import FormGenerator from './form';
import store from '../../stores/store';
import Registry from '../../stores/registry';
import AppLocale from '../../utils/language-provider';

class ReactFormBuilder extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      editMode: false,
      editElement: null,
    };
    this.editModeOn = this.editModeOn.bind(this);
  }

  
  editModeOn(data, e) {
    e.preventDefault();
    e.stopPropagation();
    if (this.state.editMode) {
      this.setState({ editMode: !this.state.editMode, editElement: null });
    } else {
      this.setState({ editMode: !this.state.editMode, editElement: data });
    }
  }

  manualEditModeOff() {
    if (this.state.editMode) {
      this.setState({
        editMode: false,
        editElement: null,
      });
    }
    // window.localStorage.setItem('logicBlock', false);
  }

  render() {
    const handle = window.location.pathname;

    const toolbarProps = {
      showDescription: this.props.show_description,
    };
    
    const language = this.props.locale ? this.props.locale : 'en';
    const currentAppLocale = AppLocale[language];
    console.log("handle", handle)
    if (this.props.toolbarItems) { toolbarProps.items = this.props.toolbarItems; }
    return (
      <>
      {(handle === '/' || handle === '/update' || handle === '/clone') &&
      <DndProvider backend={HTML5Backend}>
        <IntlProvider
          locale={currentAppLocale.locale}
          messages={currentAppLocale.messages}>
          <div>
            <div className="react-form-builder clearfix">
              <div className="toolbar-custom clearfix">
                <Toolbar {...toolbarProps} customItems={this.props.customToolbarItems} />
              </div>
              <div>
                <Preview
                  files={this.props.files}
                  manualEditModeOff={this.manualEditModeOff.bind(this)}
                  showCorrectColumn={this.props.showCorrectColumn}
                  parent={this}
                  data={this.props.data}
                  url={this.props.url}
                  saveUrl={this.props.saveUrl}
                  onLoad={this.props.onLoad}
                  onPost={this.props.onPost}
                  editModeOn={this.editModeOn}
                  editMode={this.state.editMode}
                  variables={this.props.variables}
                  registry={Registry}
                  editElement={this.state.editElement}
                  renderEditForm={this.props.renderEditForm}
                />
                <div>
                  <h4 style={{lineHeight: "50px"}}>Preview</h4>
                  <Previewform />
                </div>
              </div>
            </div>
          </div>
        </IntlProvider>
      </DndProvider>
      }
      </>
    );
  }
}

function ReactFormGenerator(props) {
  const language = props.locale ? props.locale : 'en';
  const currentAppLocale = AppLocale[language];
  return (
    <IntlProvider
      locale={currentAppLocale.locale}
      messages={currentAppLocale.messages}>
      <FormGenerator {...props} />
    </IntlProvider>
  );
}

const FormBuilders = {};
FormBuilders.ReactFormBuilder = ReactFormBuilder;
FormBuilders.ReactFormGenerator = ReactFormGenerator;
FormBuilders.ElementStore = store;
FormBuilders.Registry = Registry;

export default FormBuilders;

export {
  ReactFormBuilder, ReactFormGenerator, store as ElementStore, Registry,
};