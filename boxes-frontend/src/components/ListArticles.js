import React, { Fragment, useState, useEffect } from 'react';
import Papa from 'papaparse';

const ListArticles = () => {
  const [article, setArticle] = useState([]);

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

  // get all csvs
  const getArticles = async () => {
    try {
      const res = await fetch('http://localhost:5000/csvs');
      const articleArray = await res.json();
      setArticle(articleArray);
    } catch (err) {
      console.error(err.message);
    }
  };

  // convert bytes to kb, mb etc
  const bytesToSize = (bytes) => {
    let sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    if (bytes === 0) return '0 Byte';
    let i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
    return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i];
  };

  useEffect(() => {
    getArticles();
  }, []);

  //fetch the csv file, parse it to json object array and map it

  //const fetchCsv = async () => {
  //return fetch(`http://localhost:5000/static/hi.csv`).then(function (
  //response
  //) {
  //let reader = response.body.getReader();
  //let decoder = new TextDecoder('utf-8');

  //return reader.read().then(function (result) {
  //return decoder.decode(result.value);
  //});
  //});
  //};

  //async function getCsvData() {
  //let csvData = await fetchCsv();
  //let results = Papa.parse(csvData, { header: true });
  //return results;
  //}

  //let csvDataArray = [];
  //getCsvData().then((value) => csvDataArray.push(JSON.stringify(value)));

  //console.log(csvDataArray);
  ////take the first object in the array and map them to a list of table headers (colums)
  ////take all the other objects and map them to thier rows

  //map the csvs and thier properties

  //'/static' is a route for getting static files from the server
  //folder 'csvs', referenced by the file name recieved

  // window is reloaded on delete click (can be refractored later)

  return (
    <Fragment>
      <h2 className='text-center'>CSV Files</h2>
      <table className='table-striped w-100 mt-5'>
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Size</th>
          </tr>
        </thead>
        <tbody>
          {article.map((item) => (
            <tr key={item._id}>
              <td className='pl-2'>{item.title}</td>
              <td>{item.description}</td>
              <td>{bytesToSize(item.size)}</td>
              <td>
                <button className='btn btn-success'>
                  <a href={`http://localhost:5000/static/${item.filename}`}>
                    Download
                  </a>
                </button>
                <button className='btn btn-success'>
                  <a href={`http://localhost:5000/static/${item.filename}`}>
                    View
                  </a>
                </button>
              </td>
              <td>
                <button
                  className='btn btn-danger'
                  onClick={() =>
                    deleteArticle(item._id) && window.location.reload()
                  }
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Fragment>
  );
};

export default ListArticles;
