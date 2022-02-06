import React, { Fragment, useState, useEffect } from 'react';
import { ReactComponent as Bin } from '../svgs/trash2-fill.svg';
import { ReactComponent as View } from '../svgs/binoculars-fill.svg';
import { ReactComponent as Edit } from '../svgs/pencil-fill.svg';
import { ReactComponent as Download } from '../svgs/download.svg';

const ListArticles = () => {
  // delete by id
  const deleteArticle = async (id) => {
    try {
      await fetch(`http://localhost:5000/csvs/${id}`, {
        method: 'DELETE',
      });
    } catch (err) {
      console.error(err.message);
    }
  };

  const [id, setId] = useState();
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  //update csv by id
  const updateCsv = async (id, title, description) => {
    const data = { title: title, description: description };
    try {
      await fetch(`http://localhost:5000/csvs/update/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
    } catch (err) {
      console.error(err.message);
    }
  };

  // get all csvs
  const [article, setArticle] = useState([]);
  const getArticles = async () => {
    try {
      const res = await fetch('http://localhost:5000/csvs');
      const articleArray = await res.json();
      setArticle(articleArray);
    } catch (err) {
      console.error(err.message);
    }
  };
  useEffect(() => {
    getArticles();
  }, []);

  //fetch a csv file by filename
  const [text, setText] = useState();
  const load = async (filename) => {
    try {
      const res = await fetch(`http://localhost:5000/static/${filename}`);
      const fileText = await res.text();

      setText(fileText);
    } catch (err) {
      console.error(err.message);
    }
  };

  //converts csv text to something readable
  const convertText = (text) => {
    if (text) {
      const arrObj = [];
      const lines = text.split('\n');
      const headers = lines[0].replace(/(""*)/g, ' ');
      for (let i = 1; i < lines.length; i++) {
        arrObj.push(
          <p className='csv-data' key={i}>
            {lines[i]}
          </p>
        );
      }
      //csv layout for modal
      return (
        <div>
          <p className='csv-header'>{headers}</p>
          {arrObj}
        </div>
      );
    }
  };

  // convert bytes to kb, mb etc
  const bytesToSize = (bytes) => {
    let sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    if (bytes === 0) return '0 Byte';
    let i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
    return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i];
  };

  //store the target name for modal
  const [targetName, setTargetName] = useState();
  const handleSearch = (e) => {
    setTargetName(e.target.value);
    load(e.target.value);
  };

  //state for edit model placehoders
  const [origionalTitle, setOriginalTitle] = useState();
  const [origionalDescription, setOriginalDescription] = useState();

  return (
    <Fragment>
      <table className='table-striped w-100 mt-5'>
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Created by</th>
            <th>Created at</th>
            <th>Size</th>
          </tr>
        </thead>
        <tbody>
          {article.map((item) => (
            <tr key={item._id}>
              <td className='pl-2'>{item.title}</td>
              <td>{item.description}</td>
              <td>Fred</td>
              <td>3/2/1994</td>
              <td>{bytesToSize(item.size)}</td>
              <td>
                <button
                  type='button'
                  className='btn btn-success '
                  data-toggle='modal'
                  data-target='#exampleModal'
                  value={item.filename}
                  onClick={handleSearch}
                >
                  <View />
                </button>
              </td>
              <td>
                <button className='btn btn-success'>
                  <a href={`http://localhost:5000/static/${item.filename}`}>
                    <Download />
                  </a>
                </button>
              </td>
              <td>
                <button
                  type='button'
                  className='btn btn-success'
                  data-toggle='modal'
                  data-target='#form'
                  onClick={() => {
                    setOriginalDescription(item.description);
                    setOriginalTitle(item.title);
                    setId(item._id);
                  }}
                >
                  <Edit />
                </button>
              </td>
              <td>
                <button
                  className='btn btn-danger '
                  onClick={() =>
                    deleteArticle(item._id) && window.location.reload()
                  }
                >
                  <Bin />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div
        className='modal fade'
        id='exampleModal'
        tabIndex='-1'
        role='dialog'
        aria-labelledby='exampleModalLabel'
        aria-hidden='true'
      >
        <div className='modal-dialog' role='document'>
          <div className='modal-content'>
            <div className='modal-header'>
              <h5 className='modal-title' id='exampleModalLabel'>
                {targetName}
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
            <div className='modal-body'>{convertText(text)}</div>
            <div className='modal-footer'>
              <button
                type='button'
                className='btn btn-secondary'
                data-dismiss='modal'
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
      <div
        className='modal fade'
        id='form'
        tabIndex='-1'
        role='dialog'
        aria-labelledby='exampleModalLabel'
      >
        <div
          id={id}
          className='modal-dialog modal-dialog-centered'
          role='document'
        >
          <div className='modal-content'>
            <div className='modal-header border-bottom-0'>
              <h5 className='modal-title' id='exampleModalLabel'>
                Edit info
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
            <form>
              <div className='modal-body'>
                <div className='form-group'>
                  <label>Title</label>
                  <input
                    required
                    className='form-control'
                    type='text'
                    id='password1'
                    placeholder={origionalTitle}
                    onChange={(e) => {
                      setTitle(e.target.value);
                    }}
                  />
                </div>
                <div className='form-group'>
                  <label>Description</label>
                  <input
                    required
                    type='text'
                    className='form-control'
                    id='password2'
                    placeholder={origionalDescription}
                    onChange={(e) => {
                      setDescription(e.target.value);
                    }}
                  />
                </div>
              </div>
              <div className='modal-footer border-top-0 d-flex justify-content-center'>
                <button
                  id={id}
                  title={title}
                  description={description}
                  type='submit'
                  className='btn btn-success'
                  disabled={!description || !title}
                  onClick={() => {
                    updateCsv(id, title, description);
                  }}
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default ListArticles;
