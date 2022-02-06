import React, { Fragment, useState } from 'react';
import Axios from 'axios';
const InputArticle = () => {
  //create a piece of state, and initialize state to `null`
  //`file` holds the current value of the state and `setFile` will change it.
  const [file, setFile] = useState();
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();

  //submit axios multi part form data
  const send = (event) => {
    const data = new FormData();
    data.append('title', title);
    data.append('file', file);
    data.append('description', description);
    Axios.post('http://localhost:5000/csvs/add', data)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
    window.location = '/';
  };

  //labels and inputs for form

  //When send is clicked, the state is updated, which will trigger a
  //re-render

  //only accept .csv files

  return (
    <Fragment>
      <div className='container '>
        <button
          type='button'
          className='btn btn-secondary'
          data-toggle='modal'
          data-target='#exampleModal2'
        >
          Add New CSV
        </button>

        <div
          className='modal fade text-center'
          id='exampleModal2'
          tabindex='-1'
          role='dialog'
          aria-labelledby='exampleModalLabel'
          aria-hidden='true'
        >
          <div className='modal-dialog' role='document'>
            <div className='modal-content'>
              <div className='modal-header'>
                <h5 className='modal-title' id='exampleModalLabel'>
                  New CSV Form
                </h5>
                <button
                  type='button'
                  className='close'
                  data-dismiss='modal'
                  aria-label='Close'
                >
                  <span aria-hidden='true'>&times;</span>
                </button>
              </div>
              <div className='modal-body'>
                <form className='text-left'>
                  <div className='form-group'>
                    <label>File</label>
                    <input
                      required
                      className='form-control'
                      type='file'
                      id='file'
                      accept='.csv'
                      onChange={(event) => {
                        const file = event.target.files[0];
                        setFile(file);
                      }}
                    />
                  </div>
                  <div className='form-group'>
                    <label>Title</label>
                    <input
                      placeholder='Title'
                      required
                      className='form-control'
                      type='text'
                      id='title'
                      onChange={(event) => {
                        const { value } = event.target;
                        setTitle(value);
                      }}
                    />
                  </div>
                  <div className='form-group'>
                    <label>Description</label>
                    <input
                      placeholder='Description'
                      required
                      className='form-control'
                      type='text'
                      id='description'
                      onChange={(event) => {
                        const { value } = event.target;
                        setDescription(value);
                      }}
                    />
                  </div>
                </form>
                <div className='modal-footer'>
                  <button
                    type='button'
                    className='btn btn-secondary'
                    data-dismiss='modal'
                  >
                    Close
                  </button>
                  <button
                    disabled={!file || !description || !title}
                    type='button'
                    className='btn btn-success'
                    onClick={send}
                  >
                    Upload
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default InputArticle;
//<div className='dropdown'>
//<button
//type='button'
//className='btn btn-secondary dropdown-toggle'
//data-toggle='dropdown'
//>
//Upload CSV file
//</button>
//<div className='dropdown-menu'>
//<div className='dropdown-item'>
//<h2 className='text-center mt-5'>Create File</h2>
//<form action='#'>
//<div className='flex'>
//</div>
//<div className='flex'>
//</div>
//<div className='flex'>
//<label htmlFor='file'>File</label>
//<input
//required
//className='form-control'
//type='file'
//id='file'
//accept='.csv'
//onChange={(event) => {
//const file = event.target.files[0];
//setFile(file);
//}}
///>
//</div>
//</form>
//<button
//className='btn btn-success mt-4'
//onClick={send}
//disabled={!file || !description || !title}
//>
//Send
//</button>
//</div>
//</div>
//</div>
