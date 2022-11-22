import React from 'react';
import store from '../../stores/store';
import { ReactFormGenerator } from '../Formbuilder';

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

export default class Previewform extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      previewVisible: false,
      shortPreviewVisible: false,
      roPreviewVisible: false,
      loading: false,
      formId: '',
    };

    const handle = window.location.pathname;
    if (handle === '/update' || handle === '/clone') {
      const urlString = window.location.href;
      const getFormId = new URL(urlString);
      const formId = getFormId.searchParams.get('id');
      const formName = getFormId.searchParams.get('name');

      fetch('https://dzf2ufyxq9.execute-api.eu-west-2.amazonaws.com/dev/getform/'+formId+'/'+formName)
      .then((res) => res.json())
          .then((json) => {
              this.setState({
                  data: json.form_json,
              });
      });
    }

    const update = this._onChange.bind(this);
    this._onSubmit = this._onSubmit.bind(this);
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
    window.location.href = '/update?id='+this.state.formId+'&name=ED_Form';
  }

  _onChange(data) {
    this.setState({
      data,
    });
  }

  // {this.state.roPreviewVisible &&
  //   <div className={roModalClass}>
  //     <div className="modal-dialog modal-lg">
  //       <div className="modal-content">
          
  //       </div>
  //     </div>
  //   </div>
  // }

  // eslint-disable-next-line no-unused-vars

  _onSubmit() {
    const dataVal = this.state.data;
    const handle = window.location.pathname;
    let setFormName = '';
    dataVal?.map((getNameRow) => {
      if(getNameRow.element === 'Header') {
        setFormName = getNameRow.content;
      }
    })
  if(setFormName !== "") {
    if (handle === '/update') {
      const urlString = window.location.href;
      const getFormId = new URL(urlString);
      const formId = getFormId.searchParams.get('id');
      const formName = getFormId.searchParams.get('name');

      fetch('https://dzf2ufyxq9.execute-api.eu-west-2.amazonaws.com/dev/updateform/'+formId+'/'+formName, {
        method: 'PUT',
        body: JSON.stringify({
          form_desc: setFormName,
          form_json: JSON.stringify(dataVal),
        }),
        headers: {
          'Content-Type': 'application/json',
        }
        }).then(response => {
            return response.json();
        }).then(json => {
            console.log('json', json.Attributes.form_id);
            if (json.Attributes.form_id) {
              this.setState({
                previewVisible: true,
                formId: json.Attributes.form_id,
              });
            } else {
              this.setState({
                previewVisible: true,
              });
            }
        });
    } else {
      fetch(`https://dzf2ufyxq9.execute-api.eu-west-2.amazonaws.com/dev/postform`, {
        method: 'POST',
        body: JSON.stringify({
          form_name: 'ED_Form',
          form_desc: setFormName,
          form_json: JSON.stringify(dataVal),
          logic_json: 'logicJson',
        }),
        headers: {
          'Content-Type': 'application/json',
        }
        }).then(response => {
            return response.json();
        }).then(json => {
            if (json.formId) {
              this.setState({
                previewVisible: true,
                formId: json.formId,
              });
            } else {
              this.setState({
                previewVisible: true,
              });
            }
        });
      }
    } else {
      alert('Please add Header text');
    }
    // console.log('onSubmit', this.state.data);
    // Place code to post json data to server here
  }

  render() {
    let modalClass = 'modal ro-modal';
    if (this.state.previewVisible) {
      modalClass += ' show d-block';
    }
    return (
     // <div className="clearfix" style={{ margin: '10px', width: '70%' }}>
     <>
     {this.state.previewVisible &&
      <div className={modalClass} role="dialog">
        <div className="modal-dialog modal-lg" role="document">
            <div className="modal-content">
                {this.state.formId !== '' ?
                  <p>Form created successfully. Form id is {this.state.formId}</p>
                :
                  <p>Something went wrong. Please try again</p>
                }
                <div className="modal-footer">
                  <button type="button" className="btn btn-default" data-dismiss="modal" onClick={this.closePreview.bind(this)}>Close</button>
                </div>
            </div>
        </div>
      </div>
      }
     <div className="col-md-6 react-form-builder-toolbar float-left">
        {/* <button className="btn btn-default float-right" style={{ marginRight: '10px' }} onClick={() => this.showShortPreview()}>Alternate/Short Form</button> */}
        {/* <button className="btn btn-default float-right" style={{ marginRight: '10px' }} onClick={() => this.showRoPreview()}>Read Only Form</button> */}
        {this.state.data.length ?
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
          :
          <div>Please build the form to view</div>
        }
      </div>
      </>
    );
  }
}
