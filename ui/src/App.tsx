import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import WelcomePage from './Welcome';
import CommentList from './CommentList';

const App: React.FC = () => {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" Component={WelcomePage} />
        <Route path="/comments" Component={CommentList} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
