import { Container, Button, Form, Card, Col } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';


const ProductForm = ({ createButton, deleteButton, updateButton }) => {


    const [productFormData, setProductFormData] = useState({
        _id: "",
        title: "",
        price: "",
        description: "",
        category: "",
        image: "",
        quantity: 0
    });

    const [imageList, setImageList] = useState([]);

    useEffect(() => {
        fetch("http://localhost:4000/images")
            .then((response) => response.json())
            .then((data) => setImageList(data));
    }, []);

    const handleFind = () => {
        const fetchProduct = async () => {
            const response = await fetch(`http://localhost:4000/product/${productFormData._id}`);
            const product = await response.json();
            console.log(product)
            setProductFormData(product);
        };
        fetchProduct();

    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(productFormData);
        fetch("http://localhost:4000/product/insert", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                ...productFormData,
                image: "/images/" + productFormData.image + ".jpg",
            }),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log("Post a new product completed");
                console.log(data);
                if (data) {
                    const value = Object.values(data);
                    alert(value);
                }
            });

        clearForm();


    }

    const handleSubmitUpdate = (e) => {
        e.preventDefault();
        fetch(`http://localhost:4000/product/update/${productFormData._id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(productFormData),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log("Updating the product completed");
                console.log(data);
                if (data) {
                    const value = Object.values(data);
                    alert(value);
                }
            });
    }


    const handleSubmitDelete = (e) => {
        e.preventDefault();
        deleteOneProduct(productFormData._id);
    };

    function deleteOneProduct(deleteid) {
        console.log("Product to delete :", deleteid);
        fetch("http://localhost:4000/product/delete/", {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ _id: deleteid }),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log("Delete a product completed : ", deleteid);
                console.log(data);
                if (data) {
                    //const keys = Object.keys(data);
                    const value = Object.values(data);
                    alert(value);
                }
            });

        clearForm();
    }


    const handleInputChange = (event, selectedImage) => {

        const { name, value } = event.target;
        if (selectedImage !== undefined) {
            setProductFormData((formData) => ({
                ...formData,
                image: selectedImage,
            }));

        } else {
            setProductFormData((formData) => ({
                ...formData,
                [name]: value,
            }));
        }
    };

    const clearForm = () => {
        setProductFormData({
            _id: "",
            title: "",
            price: "",
            description: "",
            category: "",
            image: "",
            quantity: 0
        })
    }


    return (
        <Container className='bg-light mx-auto my-5'>

            <h1 className="display-6" hidden={!createButton}>Add New Product</h1>
            <h1 className="display-6" hidden={!deleteButton}>Delete Product</h1>
            <h1 className="display-6" hidden={!updateButton}>Update Product</h1>
            <Form onSubmit={createButton ? handleSubmit : deleteButton ? handleSubmitDelete : handleSubmitUpdate}>

                <Form.Group controlId="_id" className="mb-3" hidden={createButton}>
                    <Form.Label>Item Id</Form.Label>
                    <div className="input-group">
                        <Form.Control
                            type="text"
                            name="_id"
                            value={productFormData._id}
                            onChange={handleInputChange}
                        />
                        <Button variant="outline-secondary" onClick={handleFind}>Find</Button>
                    </div>
                </Form.Group>


                <Form.Group controlId="title" className="mb-3">
                    <Form.Label>Title</Form.Label>
                    <Form.Control
                        type="text"
                        name="title"
                        value={productFormData.title}
                        onChange={handleInputChange}
                        disabled={deleteButton} // Disable the field if createButton is false
                    />
                </Form.Group>

                <Form.Group controlId="price" className="mb-3">
                    <Form.Label>Price ($)</Form.Label>
                    <Form.Control
                        type="number"
                        name="price"
                        value={productFormData.price}
                        onChange={handleInputChange}
                        step="0.01"
                        min="0"
                        disabled={deleteButton}
                    />
                </Form.Group>


                <Form.Group controlId="description" className="mb-3">
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={3}
                        name="description"
                        value={productFormData.description}
                        onChange={handleInputChange}
                        disabled={deleteButton}
                    />
                </Form.Group>

                <Form.Group controlId="category" className="mb-3">
                    <Form.Label>Category</Form.Label>
                    <Form.Control
                        type="text"
                        name="category"
                        value={productFormData.category}
                        onChange={handleInputChange}
                        disabled={deleteButton} // Disable the field if createButton is false
                    />
                </Form.Group>

                <Form.Group controlId="image" className="mb-3">
                    <Form.Label>Image</Form.Label>
                    <Form.Select
                        name="image"
                        value={productFormData.image}
                        onChange={(event) => handleInputChange(event, event.target.value)}
                        disabled={deleteButton}
                    >
                        <option value="">Choose an image</option>
                        {imageList.map((image) => (
                            <option key={image} value={image}>
                                {image}
                            </option>
                        ))}
                    </Form.Select>
                </Form.Group>

                <Button type="submit" variant={deleteButton ? "danger" : "primary"} >{deleteButton ? "Delete" : "Submit"}</Button>
            </Form>
        </Container>
    );
}

export default ProductForm;