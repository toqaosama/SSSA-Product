import React, { useEffect, useState } from 'react';
import './Style/Categores.css';
import authApi from "../../api/authApi";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import {Link, useLocation} from 'react-router-dom';
import {Button} from "react-bootstrap";

const Services = () => {
    const [categories, setCategories] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const location = useLocation();

    const getCategories = async () => {
        try {
            setLoading(true);
            const res = await authApi.get('/category');
            setCategories(res.data.categories);
        } catch (e) {
            setError(e.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getCategories();
    }, []);

    // Scroll to section after loading categories
    useEffect(() => {
        if (categories.length > 0 && location.hash) {
            const id = location.hash.replace('#', '');
            const el = document.getElementById(id);
            if (el) {
                setTimeout(() => {
                    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }, 100); // Delay ensures DOM is painted
            }
        }
    }, [location.hash, categories]);

    return (
        <div className="categories-container">
            <h2 className="categories-title">Our Services</h2>
            {loading && <LoadingSpinner />}
            {!loading && (
                <div className="categories-list">
                    {categories.map((category, index) => (
                        <div
                            id={category.id}
                            className={`category-card ${index % 2 === 0 ? 'image-left' : 'image-right'}`}
                            key={category.id}
                        >
                            <div className="card-image-container">
                                <img
                                    src={process.env.REACT_APP_API_URL + "/uploads/" + category.img}
                                    alt={category.name}
                                    className="card-image"
                                    loading="lazy"
                                />
                            </div>
                            <div className="card-contents">
                                <h3 className="card-namess">{category.name}</h3>
                                <p className="card-description">{category.desc}</p>
                                <Link to={`/sales?category=${category.id}`} className="explore-btn">Explore More</Link>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Services;
