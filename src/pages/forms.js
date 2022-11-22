import React from 'react';

class Forms extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
                items: [],
                DataisLoaded: false,
                roPreviewVisible: false,
                formId: '',
                formName: '',
        };
    }

    // ComponentDidMount is used to
    // execute the code
    componentDidMount() {
        fetch('https://dzf2ufyxq9.execute-api.eu-west-2.amazonaws.com/dev/getallform')
        .then((res) => res.json())
            .then((json) => {
                this.setState({
                    items: json,
                    DataisLoaded: true,
                });
        });
    }

    render() {
        const { DataisLoaded, items } = this.state;

        const deleteForm = (name, id) => {
            this.setState({
                roPreviewVisible: true,
                formId: id,
                formName: name,
            });
        };

        const deleteConfirm = () => {
            fetch(`https://dzf2ufyxq9.execute-api.eu-west-2.amazonaws.com/dev/deleteform/${this.state.formId}/${this.state.formName}`, { method: 'DELETE' })
                .then((res) => res.json())
                .then((json) => {
                    this.setState({
                        roPreviewVisible: true,
                        formId: '',
                        formName: json.message,
                    });
                });
        };

        const closePreview = () => {
            this.setState({
                roPreviewVisible: false,
            });
            window.location.reload();
        };

        let modalClass = 'modal ro-modal';
        if (this.state.roPreviewVisible) {
            modalClass += ' show d-block';
        }
        if (!DataisLoaded) {
            return (<div>
            <h1> Please wait some time.... </h1> </div>);
        }
        return (
            <>
            {this.state.roPreviewVisible &&
              <div className={modalClass}>
                <div className="modal-dialog modal-lg">
                {this.state.formId === '' ?
                  <div className="modal-content">
                     <p>{ this.state.formName }?</p>
                     <div className="modal-footer">
                        <button type="button" className="btn btn-default" data-dismiss="modal" onClick={closePreview}>Close</button>
                    </div>
                  </div>
                  :
                  <div className="modal-content">
                     <p>Are you sure to delete the form { this.state.formName }?</p>
                     <p>Form id: {this.state.formId}</p>
                     <div className="modal-footer">
                        <button type="button" className="btn btn-danger" data-dismiss="modal" onClick={deleteConfirm}>Delete</button>
                        <button type="button" className="btn btn-default" data-dismiss="modal" onClick={closePreview}>Close</button>
                    </div>
                  </div>
                }
                </div>
              </div>
            }
            <div className = "App">
                <h1> List of forms </h1>
                    <table>
                        <thead>
                            <tr>
                                <th>Form Name</th>
                                <th>Form ID</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                        {items.map((row, i) => (
                                <tr key={i}>
                                    <td>{ row.form_description }</td>
                                    <td>{ row.form_id }</td>
                                    <td>
                                        <a className="btn btn-primary m-1" href={`/update?id=${row.form_id}&name=${row.form_name}`}>Edit</a>
                                        <a className="btn btn-info m-1" href={`/clone?id=${row.form_id}&name=${row.form_name}`}>Clone</a>
                                        <a className="btn btn-danger m-1" onClick={() => deleteForm(row.form_name, row.form_id)}>Delete</a>
                                    </td>
                                </tr>
                        ))}
                        </tbody>
                </table>
            </div>
            </>
        );
    }
}

export default Forms;