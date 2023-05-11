import React, { useState, useEffect } from "react";
import { Form, Input, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Spinner from "../components/Spinner";
import { toast } from 'react-hot-toast';

const Register = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    //from submit
    const submitHandler = async (values) => {
        try {
            setLoading(true);
            await axios.post("/users/register", values);
            toast.success("Registeration Successfull");
            setLoading(false);
            navigate("/login");
        } catch (error) {
            setLoading(false);
            toast.error("something went wrong");
        }
    };

    //prevent for login user
    useEffect(() => {
        if (localStorage.getItem("user")) {
            navigate("/");
        }
    }, [navigate]);
    return (
        <>
            <div className="resgister-page ">
                {loading && <Spinner />}
                <Form layout="vertical" onFinish={submitHandler}>
                    <h1>Register Form</h1>
                    <Form.Item label="Name" name="name">
                        <Input />
                    </Form.Item>
                    <Form.Item label="Email" name="email">
                        <Input type="email" />
                    </Form.Item>
                    <Form.Item label="Password" name="password">
                        <Input type="password" />
                    </Form.Item>
                    <div className="d-flex justify-content-between">
                        <Link to="/login">Already Register ? Cleck Here to login</Link>
                        <button className="btn btn-primary">Resgiter</button>
                    </div>
                </Form>
            </div>
        </>
    );
};

export default Register;