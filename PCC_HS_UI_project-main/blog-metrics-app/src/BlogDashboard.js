import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { Typography, Button, Container, Box, Paper, TextField } from '@mui/material';
import { AddCircle } from '@mui/icons-material';
import Masonry from '@mui/lab/Masonry';
import BlogCard from './components/BlogCard'; // Import the BlogCard component
import Footer from './components/Footer'; // Import the Footer component
import logo from './components/blog_icon.png'; // Import your image
import NewPost from './components/NewPost'; // Import the NewPost component

const BlogDashboard = () => {
  const [data, setData] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    filterData();
  }, [searchQuery, data]);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:3001/blogs'); // Replace with your server's endpoint
      if (Array.isArray(response.data)) {
        setData(response.data);
        setFilteredData(response.data);
      } else {
        console.error('Expected an array but got:', response.data);
        setData([]);
        setFilteredData([]);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const filterData = useCallback(() => {
    if (searchQuery.trim() === '') {
      setFilteredData(data);
    } else {
      const query = searchQuery.toLowerCase();
      const filtered = data.filter(blog =>
        blog.title.toLowerCase().includes(query) || blog.blog.toLowerCase().includes(query)
      );
      setFilteredData(filtered);
    }
  }, [searchQuery, data]);

  const handleEdit = (id) => {
    console.log(`Edit blog with id: ${id}`);
  };

  const handleDelete = (id) => {
    setData(prevData => prevData.filter(blog => blog.id !== id));
  };

  const handleAddPost = (newPost) => {
    setData(prevData => [newPost, ...prevData]);
    setShowForm(false);
  };

  const handleGoBack = () => {
    setShowForm(false);
  };

  return (
    <Container>
      {showForm ? (
        <NewPost onAddPost={handleAddPost} onGoBack={handleGoBack} />
      ) : (
        <Paper elevation={3} sx={{ p: 4, mt: 4, backgroundColor: 'background.paper' }}>
          <Box display="flex" alignItems="center" justifyContent="space-between" mb={3} sx={{ alignItems: 'center' }}>
            <img src={logo} alt="Logo" style={{ width: '80px', height: '80px', marginRight: '10px' }} />
            <Typography variant="h3" align="center" style={{ flexGrow: 1 }}>
              Anunya's Blog Dashboard
            </Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={() => setShowForm(true)}
              startIcon={<AddCircle />}
              sx={{ height: '50px', fontSize: '16px', marginLeft: '20px' }}  // Adjusted button size
            >
              Add New Post
            </Button>
          </Box>

          <Box mb={3}>
            <TextField
              variant="outlined"
              placeholder="Search..."
              fullWidth
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </Box>

          <Masonry columns={{ xs: 1, sm: 2, md: 3 }} spacing={3}>
            {filteredData.map((blog) => (
              <BlogCard
                key={blog.id}
                id={blog.id}
                title={blog.title}
                content={blog.blog}
                imageUrl={blog.imageUrl}
                onEdit={() => handleEdit(blog.id)}
                onDelete={() => handleDelete(blog.id)}
              />
            ))}
          </Masonry>

          <Footer />  {/* Add the Footer component */}
        </Paper>
      )}
    </Container>
  );
};

export default BlogDashboard;
