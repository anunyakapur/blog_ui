import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, IconButton, Typography, TextField, Button, Box } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import axios from 'axios';

const EditPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [titleError, setTitleError] = useState(false);
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    axios.get(`http://localhost:3000/blog/${id}`)
      .then(response => {
        setTitle(response.data.title);
        setContent(response.data.content);
        setImageUrl(response.data.imageUrl || '');
      })
      .catch(error => {
        console.error('Error fetching the post:', error);
      });
  }, [id]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (title.trim() === '') {
      setTitleError(true);
    } else {
      setTitleError(false);
      const updatedPost = {
        title,
        content,
        imageUrl
      };
      if (image) {
        const formData = new FormData();
        formData.append('file', image);
        try {
          const response = await axios.post('http://localhost:3000/upload', formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          });
          updatedPost.imageUrl = response.data.url;
        } catch (error) {
          console.error('Error uploading image:', error);
        }
      }
      axios.put(`http://localhost:3000/blog/${id}`, updatedPost)
        .then(() => {
          navigate('/');
        })
        .catch(error => {
          console.error('Error updating the post:', error);
        });
    }
  };

  const handleImageChange = (event) => {
    setImage(event.target.files[0]);
  };

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="back" onClick={() => navigate('/')}>
            <ArrowBack />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Edit Post
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        component="form"
        sx={{
          '& > :not(style)': { m: 1, width: '100%' },
          maxWidth: '600px',
          mx: 'auto', // Center the form horizontally
          mt: 4, // Add some top margin
          p: 3, // Add some padding
          boxShadow: 3, // Add a shadow for better visual separation
          borderRadius: 2, // Round the corners
        }}
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit}
      >
        <TextField
          id="standard-basic"
          label="Title"
          variant="standard"
          fullWidth
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          error={titleError}
          helperText={titleError ? 'Title is required' : ''}
        />
        <TextField
          id="outlined-multiline-flexible"
          label="Write your blog here..."
          multiline
          rows={4}
          variant="outlined"
          fullWidth
          sx={{ mt: 2 }}
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <Box sx={{ mt: 2 }}>
          <Button variant="contained" component="label">
            Upload Image
            <input type="file" hidden onChange={handleImageChange} />
          </Button>
        </Box>
        {imageUrl && (
          <Box sx={{ mt: 2 }}>
            <img src={imageUrl} alt="Blog post" style={{ width: '100%', maxHeight: '300px', objectFit: 'cover' }} />
          </Box>
        )}
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
          <Button
            variant="contained"
            color="primary"
            type="submit"
            sx={{ width: '200px', height: '50px', fontSize: '18px' }}
          >
            Update Post
          </Button>
        </Box>
      </Box>
    </div>
  );
};

export default EditPost;
