/**
  * <DynamicOptionList />
  */

 import React from 'react';
 import ID from '../../utils/UUID';
 import IntlMessages from '../../utils/language-provider/IntlMessages';

 export default class DynamicOptionList extends React.Component {
   constructor(props) {
     super(props);
     this.state = {
       element: this.props.element,
       data: this.props.data,
       dirty: false,
       questionId: '',
       answerData: [],
     };
   }

   _setValue(text) {
      return text.replace(/[^A-Z0-9]+/ig, '_').toLowerCase();
   }

   editOption(option_index, e) {
     const this_element = this.state.element;
     const val = (this_element.options[option_index].value !== this._setValue(this_element.options[option_index].text)) ? this_element.options[option_index].value : this._setValue(e.target.value);
     this_element.options[option_index].text = e.target.value;
     this_element.options[option_index].value = val;
     this.setState({
       element: this_element,
       dirty: true,
     });
   }

   editLogicOption(option_index, e) {
    const this_element = this.state.element;
    const val = (this_element.options[option_index].value !== this._setValue(this_element.options[option_index].text)) ? this_element.options[option_index].value : this._setValue(e.target.value);
    this_element.options[option_index].value = val;
    this_element.options[option_index].questionId = e.target.value;
    this.state.data.map((questions) => {
      if (questions.id === e.target.value) {
        this.setState({
          answerData: questions.options,
        });
        this_element.options[option_index].questionLabel = questions.label;
      }
    });

    this.setState({
      element: this_element,
      dirty: true,
    });
  }

  editLogicValue(option_index, e) {
    const this_element = this.state.element;
    const val = (this_element.options[option_index].value !== this._setValue(this_element.options[option_index].text)) ? this_element.options[option_index].value : this._setValue(e.target.value);
    // const val = (e.target.value === '') ? this._setValue(this_element.options[option_index].text) : e.target.value;
    this_element.options[option_index].value = val;
    this_element.options[option_index].answerId = e.target.value;
    this.state.answerData.map((answers) => {
      if (answers.key === e.target.value) {
        this_element.options[option_index].answerLabel = answers.text;
      }
    });
    this.setState({
      element: this_element,
      dirty: true,
    });
  }

     // eslint-disable-next-line no-unused-vars
    editLogicOptionRedirect(option_index, e) {
      const this_element = this.state.element;
      const val = (this_element.options[option_index].value !== this._setValue(this_element.options[option_index].text)) ? this_element.options[option_index].value : this._setValue(e.target.value);
      // const val = (e.target.value === '') ? this._setValue(this_element.options[option_index].text) : e.target.value;
      this_element.options[option_index].value = val;
      this_element.options[option_index].redirectId = e.target.value;
      this.state.data.map((questions) => {
        if (questions.id === e.target.value) {
          this_element.options[option_index].redirectLabel = questions.label;
        }
      });
      this.setState({
        element: this_element,
        dirty: true,
      });
    }

  editValue(option_index, e) {
     const this_element = this.state.element;
     const val = (e.target.value === '') ? this._setValue(this_element.options[option_index].text) : e.target.value;
     this_element.options[option_index].value = val;
     this.setState({
       element: this_element,
       dirty: true,
     });
   }

   // eslint-disable-next-line no-unused-vars
   editOptionCorrect(option_index, e) {
     const this_element = this.state.element;
     if (this_element.options[option_index].hasOwnProperty('correct')) {
       delete (this_element.options[option_index].correct);
     } else {
       this_element.options[option_index].correct = true;
     }
     this.setState({ element: this_element });
     this.props.updateElement.call(this.props.preview, this_element);
   }

   updateOption() {
     const this_element = this.state.element;
     // to prevent ajax calls with no change
     if (this.state.dirty) {
       this.props.updateElement.call(this.props.preview, this_element);
       this.setState({ dirty: false });
     }
   }

   addOption(index) {
     const this_element = this.state.element;
     this_element.options.splice(index + 1, 0, { value: '', text: '', key: ID.uuid() });
     this.props.updateElement.call(this.props.preview, this_element);
   }

   addLogicOption(index) {
    const this_element = this.state.element;
    this_element.options.splice(index + 1, 0, { value: '', text: '', key: ID.uuid() });
    this.props.updateElement.call(this.props.preview, this_element);
  }

   removeOption(index) {
     const this_element = this.state.element;
     this_element.options.splice(index, 1);
     this.props.updateElement.call(this.props.preview, this_element);
   }

   render() {
     if (this.state.dirty) {
       this.state.element.dirty = true;
     }
     return (
       <div className="dynamic-option-list">
         {this.state.element.text === 'Logic Input' ?
          <ul>
            <li>
              <div className="row">
                <div className="col-sm-4"><b>Select Parent Question</b></div>
                { this.props.canHaveOptionValue &&
                <div className="col-sm-3"><b>Expected Answer</b></div> }
                { this.props.canHaveOptionValue && this.props.canHaveOptionCorrect &&
                <div className="col-sm-3"><b>Select Next Question</b></div> }
              </div>
            </li>
            {
              this.props.element.options.map((option, index) => {
                const this_key = `edit_${option.key}`;
                console.log('item_test', option);
                const val = (option.value !== this._setValue(option.text)) ? option.value : '';
                return (
                  <li className="clearfix" key={this_key}>
                  {this.props.element.options.length !== index + 1 ?
                    <div className="row">
                      <div className="col-sm-4">
                        { option.questionLabel }
                      </div>
                      { this.props.canHaveOptionValue &&
                      <div className="col-sm-3">
                        { option.answerLabel }
                      </div> }
                      { this.props.canHaveOptionValue && this.props.canHaveOptionCorrect &&
                      <div className="col-sm-3">
                        { option.redirectLabel }
                      </div> }
                      <div className="col-sm-2">
                        <div className="dynamic-options-actions-buttons">
                          <button onClick={this.addLogicOption.bind(this, index)} className="btn btn-success"><i className="fas fa-plus-circle"></i></button>
                          <button onClick={this.removeOption.bind(this, index)} className="btn btn-danger"><i className="fas fa-minus-circle"></i></button>
                        </div>
                      </div>
                    </div>
                    :
                    <div className="row">
                      <div className="col-sm-4">
                        <select tabIndex={index + 1} className="form-control" style={{ width: '100%' }} value={option.questionId} onChange={this.editLogicOption.bind(this, index)} onBlur={this.updateOption.bind(this)}>
                          <option>Please Select</option>
                         {this.state.data.map((questions) => (questions.label &&
                          <option key={questions.id} value={questions.id}>{questions.label}</option>
                         ))}
                        </select>
                        {/* <input tabIndex={index + 1} className="form-control" style={{ width: '100%' }} type="text" name={`text_${index}`} placeholder="Option text" value={option.text} onBlur={this.updateOption.bind(this)} onChange={this.editOption.bind(this, index)} /> */}
                      </div>
                      { this.props.canHaveOptionValue &&
                      <div className="col-sm-3">
                        <select required className="form-control" style={{ width: '100%' }} name={`value_${index}`} value={option.answerId} onChange={this.editLogicValue.bind(this, index)} >
                        <option>Please Select</option>
                        {this.state.answerData.map((answer) => (answer.key &&
                          <option key={answer.key} value={answer.key}>{answer.text}</option>
                         ))}
                         </select>
                        {/* <input className="form-control" type="text" name={`value_${index}`} value={val} onChange={this.editValue.bind(this, index)} /> */}
                      </div> }
                      { this.props.canHaveOptionValue && this.props.canHaveOptionCorrect &&
                      <div className="col-sm-3">
                        <select className="form-control" style={{ width: '100%' }} value={option.redirectId} onChange={this.editLogicOptionRedirect.bind(this, index)} >
                        <option>Please Select</option>
                         {this.state.data.map((questions) => (questions.label &&
                          <option key={questions.id} value={questions.id}>{questions.label}</option>
                         ))}
                        </select>
                        {/* <input className="form-control" type="checkbox" value="1" onChange={this.editOptionCorrect.bind(this, index)} checked={option.hasOwnProperty('correct')} /> */}
                      </div> }
                      <div className="col-sm-2">
                        <div className="dynamic-options-actions-buttons">
                          <button onClick={this.addLogicOption.bind(this, index)} className="btn btn-success"><i className="fas fa-plus-circle"></i></button>
                          { index > 0
                            && <button onClick={this.removeOption.bind(this, index)} className="btn btn-danger"><i className="fas fa-minus-circle"></i></button>
                          }
                        </div>
                      </div>
                    </div>
                    }
                  </li>
                );
              })
            }
          </ul>
         :
         <ul>
           <li>
             <div className="row">
               <div className="col-sm-6"><b><IntlMessages id='options' /></b></div>
               { this.props.canHaveOptionValue &&
               <div className="col-sm-2"><b><IntlMessages id='value' /></b></div> }
               { this.props.canHaveOptionValue && this.props.canHaveOptionCorrect &&
               <div className="col-sm-4"><b><IntlMessages id='correct' /></b></div> }
             </div>
           </li>
           {
             this.props.element.options.map((option, index) => {
               const this_key = `edit_${option.key}`;
               const val = (option.value !== this._setValue(option.text)) ? option.value : '';
               return (
                 <li className="clearfix" key={this_key}>
                   <div className="row">
                     <div className="col-sm-6">
                       <input tabIndex={index + 1} className="form-control" style={{ width: '100%' }} type="text" name={`text_${index}`} placeholder="Option text" value={option.text} onBlur={this.updateOption.bind(this)} onChange={this.editOption.bind(this, index)} />
                     </div>
                     { this.props.canHaveOptionValue &&
                     <div className="col-sm-2">
                       <input className="form-control" type="text" name={`value_${index}`} value={val} onChange={this.editValue.bind(this, index)} />
                     </div> }
                     { this.props.canHaveOptionValue && this.props.canHaveOptionCorrect &&
                     <div className="col-sm-1">
                       <input className="form-control" type="checkbox" value="1" onChange={this.editOptionCorrect.bind(this, index)} checked={option.hasOwnProperty('correct')} />
                     </div> }
                     <div className="col-sm-3">
                       <div className="dynamic-options-actions-buttons">
                         <button onClick={this.addOption.bind(this, index)} className="btn btn-success"><i className="fas fa-plus-circle"></i></button>
                         { index > 0
                           && <button onClick={this.removeOption.bind(this, index)} className="btn btn-danger"><i className="fas fa-minus-circle"></i></button>
                         }
                       </div>
                     </div>
                   </div>
                 </li>
               );
             })
           }
         </ul>
        }
       </div>
     );
   }
 }
