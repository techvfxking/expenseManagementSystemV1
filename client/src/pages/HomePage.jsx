import React, { useState, useEffect } from 'react'
import { Form, Input, Modal, Select, Table, Button, message } from "antd";
import Layout from '../components/layout/Layout.jsx'
import Spinner from './../components/Spinner.jsx';
import axios from 'axios';

const HomePage = () => {
    const [showModal, setShowModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [allTransection, setAllTransection] = useState([]);
    const columns = [
        {
            title: "Date",
            dataIndex: "date",
        },
        {
            title: "Amount",
            dataIndex: "amount",
        },
        {
            title: "Type",
            dataIndex: "type",
        },
        {
            title: "Category",
            dataIndex: "category",
        },
        {
            title: "Refrence",
            dataIndex: "refrence",
        },
        {
            title: "Actions",
        },
    ];

    const getAllTransactions = async () => {
        try {
            const user = JSON.parse(localStorage.getItem("user"));
            setLoading(true);
            const res = await axios.post("/transactions/get-transaction", {
                userid: user._id,
            });
            setLoading(false);
            setAllTransection(res.data);
            console.log(res.data);
        } catch (error) {
            setLoading(false);
            console.log(error);
            message.error("Ftech Issue With Tranction");
        }
    };

    //useEffect Hook
    useEffect(() => {
        getAllTransactions();
    }, []);

    // form handling
    const handleSubmit = async (values) => {
        try {
            const user = JSON.parse(localStorage.getItem("user"));
            setLoading(true);
            await axios.post("/transactions/add-transaction", {
                ...values,
                userid: user._id,
            });
            setLoading(false);
            message.success("Transaction Added Successfully");
            setShowModal(false);
            getAllTransactions();
        } catch (error) {
            setLoading(false);
            message.error("Faild to add transection");
        }
    };
    return (
        <Layout>
            {loading && <Spinner />}
            <div className="filters">
                <div>Range filters</div>
                <div>
                    <button
                        className="btn btn-primary"
                        onClick={() => setShowModal(true)}
                    >
                        Add New
                    </button>
                </div>
            </div>
            <div className="content">
                <Table columns={columns} dataSource={allTransection} />
            </div>
            <Modal
                title="Add Transection"
                open={showModal}
                onCancel={() => setShowModal(false)}
                footer={false}
            >
                <Form layout="vertical" onFinish={handleSubmit}>
                    <Form.Item label="Amount" name="amount">
                        <Input type="text" />
                    </Form.Item>
                    <Form.Item label="type" name="type">
                        <Select>
                            <Select.Option value="income">Income</Select.Option>
                            <Select.Option value="expense">Expense</Select.Option>
                        </Select>
                    </Form.Item>
                    <Form.Item label="Category" name="category">
                        <Select>
                            <Select.Option value="salary">Salary</Select.Option>
                            <Select.Option value="tip">Tip</Select.Option>
                            <Select.Option value="project">Project</Select.Option>
                            <Select.Option value="food">Food</Select.Option>
                            <Select.Option value="movie">Movie</Select.Option>
                            <Select.Option value="bills">Bills</Select.Option>
                            <Select.Option value="medical">Medical</Select.Option>
                            <Select.Option value="fee">Fee</Select.Option>
                            <Select.Option value="tax">TAX</Select.Option>
                        </Select>
                    </Form.Item>
                    <Form.Item label="Date" name="date">
                        <Input type="date" />
                    </Form.Item>
                    <Form.Item label="Refrence" name="refrence">
                        <Input type="text" />
                    </Form.Item>
                    <Form.Item label="Description" name="description">
                        <Input type="text" />
                    </Form.Item>
                    <div className="d-flex justify-content-end">
                        <button type="submit" className="btn btn-primary">
                            {" "}
                            SAVE
                        </button>
                    </div>
                </Form>
            </Modal>
        </Layout>
    )
}

export default HomePage