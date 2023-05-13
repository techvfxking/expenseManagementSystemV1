import React, { useState, useEffect } from "react";
import { Form, Input, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Spinner from "../components/Spinner.jsx";
import { toast } from 'react-hot-toast';

const LoginPage = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    //from submit
    const submitHandler = async (values) => {
        try {
            setLoading(true);
            const { data } = await axios.post("/users/login", values);
            setLoading(false);
            toast.success("login success");
            localStorage.setItem(
                "user",
                JSON.stringify({ ...data.data, password: "" })
            );
            navigate("/");
        } catch (error) {
            setLoading(false);
            toast.error(error.message);
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
                    <h1>Login / Sign In</h1>

                    <Form.Item label="Email" name="email">
                        <Input/>
                    </Form.Item>
                    <Form.Item label="Password" name="password">
                        <Input.Password/>
                    </Form.Item>
                    <div className="d-flex justify-content-between">
                        <Link to="/register">Not a user ? <br/>Click to regsiter</Link>
                        <button className="btn btn-primary">Login</button>
                    </div>
                </Form>
            </div>
        </>
    );
};

export default LoginPage;