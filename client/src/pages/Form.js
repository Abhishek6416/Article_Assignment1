import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom"
import { ADD_ARTICLES, SINGLE_ARTICLES, UPDATE_ARTICLES } from '../Api/article-api';

import { useNavigate } from "react-router-dom"
const Form = () => {
    const [formData, setFormData] = useState({
        title: '',
        content: ''
    });
    const navigate = useNavigate()
    const { id } = useParams()
    console.log("id", id)
    const fetchSingleData = async () => {
        const result = await SINGLE_ARTICLES(id)
        console.log(result)
        let obj = { title: result?.data?.article.title, content: result?.data?.article?.content }
        setFormData(obj)
    }
    useEffect(() => {
        fetchSingleData()

    }, [])
    console.log(formData)
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
       
        console.log(formData);
      
        const addContent = await ADD_ARTICLES(formData)
        setFormData({
            title: '',
            content: ''
        });
        return addContent.status === 200 ? (alert("article added successfully"), navigate("/")) : alert("Some thing wend wrong")
    };

    const updateFormSubmit = async (e) => {
        e.preventDefault();
        
        console.log(formData);
      
        const addContent = await UPDATE_ARTICLES(formData, id)
        setFormData({
            title: '',
            content: ''
        });
        return addContent.status === 200 ? (alert("article update successfully"), navigate("/")) : alert("Some thing wend wrong")
    }

    return (
        <div className="form-container">
            <h2>{id ? "UPDATE ARTICLE" : "ADD ARTICLE"}</h2>
            <form onSubmit={id ? updateFormSubmit : handleSubmit}>
                <div className="form-group">
                    <label htmlFor="title">Title</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        placeholder="Enter title"
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="content">Content</label>
                    <textarea
                        id="content"
                        name="content"
                        value={formData.content}
                        onChange={handleChange}
                        placeholder="Enter description"
                        required
                    ></textarea>
                </div>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default Form;
