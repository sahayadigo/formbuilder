import React from 'react';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import store from '../src/stores/store';
import { ReactFormGenerator } from '../src/components/Formbuilder';
import Forms from '../src/pages/forms';
import Update from '../src/pages/update';

const answers = {};
// const answers = {
//   'dropdown_38716F53-51AA-4A53-9A9B-367603D82548': 'd2',
//   'checkboxes_8D6BDC45-76A3-4157-9D62-94B6B24BB833': [
//     'checkboxes_option_8657F4A6-AA5A-41E2-A44A-3E4F43BFC4A6',
//     'checkboxes_option_1D674F07-9E9F-4143-9D9C-D002B29BA9E4',
//   ],
//   'radio_buttons_F79ACC6B-7EBA-429E-870C-124F4F0DA90B': [
//     'radiobuttons_option_553B2710-AD7C-46B4-9F47-B2BD5942E0C7',
//   ],
//   'rating_3B3491B3-71AC-4A68-AB8C-A2B5009346CB': 4,
// };

export default class Demobar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      previewVisible: false,
      shortPreviewVisible: false,
      roPreviewVisible: false,
    };

    const update = this._onChange.bind(this);
    // this._onSubmit = this._onSubmit.bind(this);

    store.subscribe(state => update(state.data));
  }

  showPreview() {
    this.setState({
      previewVisible: true,
    });
  }

  showShortPreview() {
    this.setState({
      shortPreviewVisible: true,
    });
  }

  showRoPreview() {
    this.setState({
      roPreviewVisible: true,
    });
  }

  closePreview() {
    this.setState({
      previewVisible: false,
      shortPreviewVisible: false,
      roPreviewVisible: false,
    });
  }

  _onChange(data) {
    this.setState({
      data,
    });
  }

  // // eslint-disable-next-line no-unused-vars
  // _onSubmit(data) {
  //   const dataVal = this.state.data;
  //   var answers = {
  //       answers: []
  //   };
  //   dataVal.map(row => {
  //     console.log('row', row.id);
  //     answers.answers.push({
  //       "id" : row.id,
  //       "correctAnswer"  : row.label
  //     });
  //     console.log('answers', answers);
  //   });
  //   fetch(`https://hxxafj49f1.execute-api.eu-west-2.amazonaws.com/dev/postform/`, {
  //     method: 'POST',
  //     body: JSON.stringify({
  //       desc: 'descript2',
  //       formJson: JSON.stringify(dataVal),
  //     }),
  //     headers: {
  //       'Content-Type': 'application/json',
  //       'Accept': 'application/json',
  //     }
  //     }).then(response => {
  //       console.log('json', response);
  //         return response.json()
  //     }).then(json => {
  //         console.log('json', json);
  //     });
  //   console.log('onSubmit', this.state.data);
  //   // Place code to post json data to server here
  // }

  render() {
    let modalClass = 'modal';
    if (this.state.previewVisible) {
      modalClass += ' show d-block';
    }

    let shortModalClass = 'modal short-modal';
    if (this.state.shortPreviewVisible) {
      shortModalClass += ' show d-block';
    }

    let roModalClass = 'modal ro-modal';
    if (this.state.roPreviewVisible) {
      roModalClass += ' show d-block';
    }

    return (
    // <div className="clearfix" style={{ margin: '10px', width: '70%' }}>
    <>
     <div className="clearfix" style={{height: '50px', backgroundImage: 'linear-gradient(to bottom right, #1A5E79, #FFFFFF)' }}>
        <ul className="header-menu">
        <li className="float-left"><a href="/forms">All Forms</a></li>
        <li className="btn btn-primary float-right"><a href="/">Create</a></li>
        </ul>

        {/* <button className="btn btn-default float-right" style={{ marginRight: '10px' }} onClick={() => this.showShortPreview()}>Alternate/Short Form</button> */}
        {/* <button className="btn btn-default float-right" style={{ marginRight: '10px' }} onClick={() => this.showRoPreview()}>Read Only Form</button> */}

        { this.state.previewVisible &&
          <div className={modalClass} role="dialog">
            <div className="modal-dialog modal-lg" role="document">
              <div className="modal-content">
                <ReactFormGenerator
                  download_path=""
                  back_action="/"
                  back_name="Reset"
                  answer_data={answers}
                  action_name="Save"
                  // form_action="/api/form"
                  form_method="POST"
                  // skip_validations={true}
                  onSubmit={this._onSubmit}
                  variables={this.props.variables}
                  data={this.state.data}
                  locale='en'/>

                <div className="modal-footer">
                  <button type="button" className="btn btn-default" data-dismiss="modal" onClick={this.closePreview.bind(this)}>Close</button>
                </div>
              </div>
            </div>
          </div>
        }

        { this.state.roPreviewVisible &&
          <div className={roModalClass}>
            <div className="modal-dialog modal-lg">
              <div className="modal-content">
                <ReactFormGenerator
                  download_path=""
                  back_action="/"
                  back_name="Back"
                  answer_data={answers}
                  action_name="Save"
                  form_action="/"
                  form_method="POST"
                  read_only={true}
                  variables={this.props.variables}
                  hide_actions={true}
                  data={this.state.data}
                  locale='en'/>

                <div className="modal-footer">
                  <button type="button" className="btn btn-default" data-dismiss="modal" onClick={this.closePreview.bind(this)}>Close</button>
                </div>
              </div>
            </div>
          </div>
        }

        { this.state.shortPreviewVisible &&
          <div className={shortModalClass}>
            <div className="modal-dialog modal-lg">
              <div className="modal-content border border-light p-3 mb-4">
                <ReactFormGenerator
                  download_path=""
                  back_action=""
                  answer_data={answers}
                  form_action="/"
                  form_method="POST"
                  data={this.state.data}
                  display_short={true}
                  variables={this.props.variables}
                  hide_actions={false}
                  locale='en'
                  />

                <div className="modal-footer">
                  <button type="button" className="btn btn-default" data-dismiss="modal" onClick={this.closePreview.bind(this)}>Close</button>
                </div>
              </div>
            </div>
          </div>
        }
      </div>
      <Router>
      <Routes>
          <Route path='/forms' element={<Forms/>} />
          <Route path='/update' element={<Update/>} />
          <Route path='/clone' element={<Update/>} />
      </Routes>
      </Router>
      </>
    );
  }
}
