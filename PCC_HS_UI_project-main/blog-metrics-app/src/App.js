// App.js
import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import BlogDashboard from './BlogDashboard';
import NewPost from './components/NewPost';
import EditPost from './components/EditPost';
import NoPage from './components/NoPage';
import darkTheme from './theme'; // Import the dark theme

const App = () => {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/" element={<BlogDashboard />} />
          <Route path="/post" element={<NewPost />} />
          <Route path="/edit/:id" element={<EditPost />} /> {/* Route for editing post */}
          <Route path="*" element={<NoPage />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;
