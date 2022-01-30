import React, { Fragment } from 'react';

// article components
import InputArticle from '../components/InputArticle';
import ListArticles from '../components/ListArticles';

const Articles = () => {
  return (
    <div>
      <InputArticle />
      <ListArticles />
    </div>
  );
};

const Dashboard = () => {
  return (
    <Fragment>
      <div className='container'>
        <h1 className='text-center mt-4'>CSV Libary</h1>
        <Articles />
      </div>
    </Fragment>
  );
};

export default Dashboard;
