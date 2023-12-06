import React from 'react';
import { useParams } from 'react-router-dom';

const SingleModuleViewPage = () => {
  const { id } = useParams();

  return (
    <div>
      <h1>id Page</h1>
      <p>id: {id}</p>
    </div>
  );
};

export default SingleModuleViewPage;