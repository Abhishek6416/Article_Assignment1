import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';

import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom'
import { DELETE_ARTICLES } from '../Api/article-api';
import DeleteIcon from '@mui/icons-material/Delete';

import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import Fab from '@mui/material/Fab';
export default function ArticleCard({ elem, fetchAllArticle }) {
  const { _id, title, content } = elem;
  const navigate = useNavigate()
  const handleUpdate = () => {
    navigate(`/form/${_id}`)
  }
  const handleDelete = async () => {
    const result = await DELETE_ARTICLES(_id)
    return result?.status === 200 ? (alert("Article Deleted successfully"), fetchAllArticle()) : alert("Something went woring")
  }

  const handleView = () => {
    navigate(`/view/${_id}`)
  }
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        alt="green iguana"
        height="140"
        image="https://contenthub-static.grammarly.com/blog/wp-content/uploads/2022/08/BMD-3398.png"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {content}
        </Typography>
      </CardContent>
      <CardActions sx={{ display: "flex", justifyContent: "space-between" }}>


        <Fab color="secondary" aria-label="edit" onClick={handleUpdate} size='small' >

          <EditIcon />

        </Fab>
        <Fab color="success" aria-label="edit" onClick={handleView} size='small'  >

          <VisibilityIcon />

        </Fab>
        <Fab color="error" aria-label="edit" onClick={handleDelete} size='small'  >

          <DeleteIcon />

        </Fab>


      </CardActions>
    </Card>
  );
}
