import React, { Fragment, useState, useEffect } from 'react';

const ListArticles = () => {
  const [article, setArticle] = useState([]);

  // delete by id
  async function deleteArticle(id) {
    try {
      await fetch(`http://localhost:5000/csvs/${id}`, {
        method: 'DELETE',
      });
    } catch (err) {
      console.error(err.message);
    }
  }

  // get all csvs
  async function getArticles() {
    const res = await fetch('http://localhost:5000/csvs');
    const articleArray = await res.json();
    setArticle(articleArray);
  }

  // convert bytes to kb, mb etc
  function bytesToSize(bytes) {
    let sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    if (bytes === 0) return '0 Byte';
    let i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
    return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i];
  }

  useEffect(() => {
    getArticles();
  }, []);

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
