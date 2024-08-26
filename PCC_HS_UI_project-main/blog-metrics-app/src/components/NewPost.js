import * as React from 'react';
import { AppBar, Toolbar, IconButton, Typography, Switch, TextField, Button, Box } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import axios from 'axios';

const label = { inputProps: { 'aria-label': 'Switch demo' } };

const NewPost = ({ onAddPost, onGoBack }) => {
  const [title, setTitle] = React.useState('');
  const [content, setContent] = React.useState('');
  const [titleError, setTitleError] = React.useState(false);
  const [image, setImage] = React.useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (title.trim() === '') {
      setTitleError(true);
    } else {
      setTitleError(false);
      const newPost = {
        id: Date.now(), // Generate a unique ID for the new post
        title,
        content
      };
      // Handle image upload
      if (image) {
        const formData = new FormData();
        formData.append('file', image);
        try {
          const response = await axios.post('http://localhost:3000/upload', formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          });
          newPost.imageUrl = response.data.url;
        } catch (error) {
          console.error('Error uploading image:', error);
        }
      }
      onAddPost(newPost);
      setTitle('');
      setContent('');
      setImage(null);
    }
  };

  const handleImageChange = (event) => {
    setImage(event.target.files[0]);
  };

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="back" onClick={onGoBack}>
            <ArrowBack />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Create a New Post
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
        <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
          <Typography>Post anonymously</Typography>
          <Switch {...label} />
        </Box>
        <Box sx={{ mt: 2 }}>
          <Button variant="contained" component="label">
            Upload Image
            <input type="file" hidden onChange={handleImageChange} />
          </Button>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
          <Button
            variant="contained"
            color="primary"
            type="submit"
            sx={{ width: '200px', height: '50px', fontSize: '18px' }} // Adjust button size and font size
          >
            Add New Post
          </Button>
        </Box>
      </Box>
    </div>
  );
};

export default NewPost;
