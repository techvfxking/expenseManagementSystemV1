import React, { useState, useEffect } from 'react'
import { Form, Input, Modal, Select, Table, message, DatePicker } from "antd";
import Layout from '../components/layout/Layout.jsx'
import Spinner from './../components/Spinner.jsx';
import axios from 'axios';
import moment from 'moment';
import { UnorderedListOutlined, AreaChartOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons'
import Analytics from '../components/Analytics.jsx';
const { RangePicker } = DatePicker;

const HomePage = () => {
    const [showModal, setShowModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [allTransection, setAllTransection] = useState([]);
    const [frequency, setFrequency] = useState('7');
    const [selectedDate, setSelectedDate] = useState([]);
    const [type, setType] = useState('all');
    const [viewData, setViewData] = useState('table');
    const [editable, setEditable] = useState(null);
    const columns = [
        {
            title: "Date",
            dataIndex: "date",
            render: (text) => <span>{moment(text).format('YYYY-MM-DD')}</span>
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
            render: (text, record) => (
                <div>
                    <EditOutlined className='mx-4'
                        onClick={() => {
                            setEditable(record),
                                setShowModal(true);
                        }}
                    />
                    <DeleteOutlined
                        className="mx-4"
                        onClick={() => {
                            handleDelete(record);
                        }}
                    />
                </div>
            )
        },
    ];

    const getAllTransactions = async () => {
        try {
            const user = JSON.parse(localStorage.getItem("user"));
            setLoading(true);
            const res = await axios.post("/transactions/get-transaction", {
                userid: user._id,
                frequency,
                selectedDate,
                type
            });
            setLoading(false);
            let result = res.data.map((element) => ({
                ...element,
                key: `${element._id}`,
            }));
            setAllTransection(result);
            console.log(result);
        } catch (error) {
            setLoading(false);
            console.log(error);
            message.error("Ftech Issue With Tranction");
        }
    };

    //useEffect Hook
    useEffect(() => {
        getAllTransactions();
    }, [frequency, selectedDate, type]);

    // form handling
    const handleSubmit = async (values) => {
        try {
            const user = JSON.parse(localStorage.getItem("user"));
            setLoading(true);
            if (editable) {
                await axios.post("/transactions/edit-transaction", {
                    payload: {
                        ...values,
                        userId: user._id
                    },
                    transacrionid: editable._id
                })
                setLoading(false);
                message.success("Transaction Updated Successfully");
            } else {
                await axios.post("/transactions/add-transaction", {
                    ...values,
                    userid: user._id,
                });
                setLoading(false);
                message.success("Transaction Added Successfully");
            }
            setShowModal(false);
            setEditable(null);
            getAllTransactions();
        } catch (error) {
            setLoading(false);
            message.error("Faild to add transection");
        }
    };
    const handleChange = (value) => {
        setFrequency(value);
    };
    const handleDelete = async (record) => {
        try {
            setLoading(true);
            await axios.post("/transactions/delete-transaction", {
                transacationId: record._id,
            });
            setLoading(false);
            message.success("Transaction Deleted!");
            getAllTransactions()
        } catch (error) {
            setLoading(false);
            console.log(error);
            message.error("unable to delete");
        }
    };
    return (
        <Layout>
            {loading && <Spinner />}
            <div className="filters">
                <h6>Select Frequency</h6>
                <Select
                    defaultValue={frequency}
                    style={{
                        width: 120,
                    }}
                    onChange={handleChange}
                    options={[
                        {
                            value: '7',
                            label: 'Last 1 Week',
                        },
                        {
                            value: '30',
                            label: 'Last 1 Month',
                        },
                        {
                            value: '365',
                            label: 'Last 1 Year',
                        },
                        {
                            value: 'custom',
                            label: 'Custom',
                        },
                    ]}
                />
                {frequency === 'custom' && <RangePicker value={selectedDate} onChange={(values) => setSelectedDate(values)} />}
                <h6>Select Type</h6>
                <Select
                    defaultValue={type}
                    style={{
                        width: 120,
                    }}
                    onChange={(values) => { setType(values) }}
                    options={[
                        {
                            value: 'all',
                            label: 'All',
                        },
                        {
                            value: 'income',
                            label: 'Income',
                        },
                        {
                            value: 'expense',
                            label: 'Expense',
                        },
                    ]}
                />
                <div className='switch-icons'>
                    <div className='max-2'>
                        <UnorderedListOutlined className={`mx-4 ${viewData === 'table' ? 'active-icon' : 'inactive-icon'}`} onClick={() => setViewData('table')} />
                        <AreaChartOutlined className={`mx-4 ${viewData === 'analytics' ? 'active-icon' : 'inactive-icon'}`} onClick={() => setViewData('analytics')} />
                    </div>
                </div>
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
                {viewData === 'table' ? <Table columns={columns} dataSource={allTransection} /> : <Analytics allTransection={allTransection} />}

            </div>
            <Modal
                title={editable ? 'Edit Transaction' : 'Add Transaction'}
                open={showModal}
                onCancel={() => setShowModal(false)}
                footer={false}
            >
                <Form layout="vertical" onFinish={handleSubmit} initialValues={editable}>
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