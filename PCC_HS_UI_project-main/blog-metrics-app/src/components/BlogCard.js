import React, { useState } from 'react';
import { Card, CardContent, Typography, IconButton, Box, Button, TextField, CardMedia } from '@mui/material';
import { Delete, Edit, Comment } from '@mui/icons-material';
import { Link } from 'react-router-dom';

const BlogCard = ({ id, title, content, imageUrl, onEdit, onDelete }) => {
  const [showCommentBox, setShowCommentBox] = useState(false);
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);

  const handleAddComment = () => {
    setComments([...comments, comment]);
    setComment('');
    setShowCommentBox(false);
  };

  return (
    <Card sx={{ mb: 3, border: '2px solid #2196f3' }}>
      {imageUrl && (
        <CardMedia
          component="img"
          height="140"
          image={imageUrl}
          alt={title}
        />
      )}
      <CardContent>
        <Typography variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary" paragraph>
          {content}
        </Typography>
        <Box display="flex" alignItems="center" justifyContent="space-between" mt={2}>
          <Box>
            <Link to={`/edit/${id}`}>
              <IconButton color="primary">
                <Edit />
              </IconButton>
            </Link>
            <IconButton onClick={onDelete} color="secondary">
              <Delete />
            </IconButton>
            <IconButton onClick={() => setShowCommentBox(!showCommentBox)} color="default">
              <Comment />
            </IconButton>
          </Box>
          {showCommentBox && (
            <Box mt={2} width="100%">
              <TextField
                fullWidth
                label="Comment"
                multiline
                rows={3}
                variant="outlined"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
              <Button variant="contained" color="primary" onClick={handleAddComment} sx={{ mt: 2 }}>
                Submit Comment
              </Button>
            </Box>
          )}
        </Box>
        <Box mt={2}>
          <Typography variant="h6">Comments</Typography>
          {comments.map((comment, index) => (
            <Typography key={index} variant="body2" color="text.secondary">
              {comment}
            </Typography>
          ))}
        </Box>
      </CardContent>
    </Card>
  );
};

export default BlogCard;
