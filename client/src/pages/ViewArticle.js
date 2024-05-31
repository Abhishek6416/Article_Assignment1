import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useParams } from "react-router-dom"
import { SINGLE_ARTICLES } from '../Api/article-api';
import { useNavigate } from 'react-router-dom'


export default function ViewArticle() {
    const [singleArticle, setSingleArticle] = React.useState({})
    const { id } = useParams()
    const fetchSingleArticle = async () => {
        const result = await SINGLE_ARTICLES(id)
        result?.status === 200 ? setSingleArticle(result?.data?.article) : alert("something went wrong")
    }

    React.useEffect(() => {
        fetchSingleArticle()
    }, [])
    const navigate = useNavigate()
    const createdAt = singleArticle?.createdAt
    const date = new Date(createdAt);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = date.toLocaleDateString('en-US', options);
    console.log(formattedDate);
    return (
        <Card sx={{ minWidth: 275, width: "80%", mt: 15, m: 'auto' }}>
            <CardContent>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    {formattedDate}
                </Typography>
                <Typography variant="h5" component="div">
                    {singleArticle?.title}
                </Typography>

                <Typography variant="body2">
                    {singleArticle?.content}

                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small" variant="contained" onClick={() => navigate("/")}>BACK TO HOME</Button>
            </CardActions>
        </Card>
    );
}
