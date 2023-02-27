import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { HeartFilled, EditOutlined, DeleteOutlined, HeartOutlined, MailOutlined, PhoneOutlined, GlobalOutlined, } from '@ant-design/icons';
import { Card } from 'antd';
import { useState } from 'react';
import { deleteData, getposts, likeButton, updateData } from "../redux/feature/dataSlice";
import FormData from "./FormData";




function CardData() {
    const [istoggle, setIstoggle] = useState(true)
    const [loading, setLoading] = useState(false);
    const { posts } = useSelector((state) => state.data);
    const [open, setOpen] = useState(false)
    const [person, setPerson] = useState({})
    const dispatch = useDispatch();


    const handleEdit = (element) => {
        setPerson({})
        setOpen(!open)
        if (element) {
            setPerson(element)
        }
    }
    const handleheart = (item) => {
        dispatch(likeButton(item))
        setIstoggle(!istoggle)
        console.log(item)
    }

    const deleteCard = (id) => {
        dispatch(deleteData(id))
    }


    useEffect(() => {
        dispatch(getposts());
    }, []);

    return (
        <>
            {posts.map((element) => (

                <div className="row">
                    <div className="col-md-3">
                        <Card
                            key={element.id}
                            style={{
                                width: 300,
                                marginTop: 16,
                            }}
                            actions={[
                                !element.like ? <HeartOutlined style={{ color: "#ff0000" }} onClick={() => handleheart(element.id)} />
                                    : <HeartFilled onClick={() => handleheart(element.id)} style={{ color: "#ff0000" }} />,


                                <EditOutlined key="edit" onClick={() => handleEdit(element)} />,
                                <DeleteOutlined key="Delete" onClick={() => deleteCard(element.id)} />,
                            ]}
                            cover={<img alt="example" src={`https://avatars.dicebear.com/v2/avataaars/${element.username}.svg?options[mood][]=happy`} />}
                        >
                            <div className="persondata">
                                <h4>{element.name}</h4>
                                <div>
                                    <span>
                                        <MailOutlined /> {element.email}
                                    </span>
                                </div>
                                <div>
                                    <span>
                                        <PhoneOutlined />{element.phone}
                                    </span>
                                </div>
                                <div>
                                    <span>
                                        <GlobalOutlined /> {element.website}
                                    </span>
                                </div>

                            </div>


                         

                        </Card>
                    </div>
                    <FormData open={open} toggleModel={handleEdit} person={person} />
                </div>

            ))
            }

        </>
    );
};


export default CardData