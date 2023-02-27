import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { HeartFilled, EditOutlined, DeleteFilled, HeartOutlined, MailOutlined, PhoneOutlined, GlobalOutlined, } from '@ant-design/icons';
import { Card } from 'antd';
import { useState } from 'react';
import { deleteData, getposts, likeButton } from "../redux/feature/dataSlice";
import FormData from "./FormData";




function CardData() {
    const [istoggle, setIstoggle] = useState(true)
    const { posts } = useSelector((state) => state.data);
    const [show, setShow] = useState(false);
    const [person, setPerson] = useState({})

    const dispatch = useDispatch();

//handle edit for pass data in form 
    const handleEdit = (element) => {
        setPerson({})
        setShow(!show)
        if (element) {
            setPerson(element)
        }
    }


    // handle heart for handle like 


    const handleheart = (item) => {
        dispatch(likeButton(item))
        setIstoggle(!istoggle)
    }



    //deletecard for delete particular card

    const deleteCard = (id) => {
        dispatch(deleteData(id))
    }

//get data and dispatch in useeffect
    useEffect(() => {
        dispatch(getposts());
    },[]);

    return (
        <>
            <div className="row">
                {posts.map((element) => (
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
                                <DeleteFilled key="Delete" onClick={() => deleteCard(element.id)} />,
                            ]}

                            cover={<img alt="example" src={`https://avatars.dicebear.com/v2/avataaars/${element.username}.svg?options[mood][]=happy`} />}
                        >
                            <div className="persondata">
                                <h4>{element.name}</h4>

                                <div>
                                    <span>  <MailOutlined />  </span> {element.email}
                                </div>

                                <div>
                                    <span>  <PhoneOutlined />  </span> {element.phone}
                                </div>

                                <div>
                                    <span>   <GlobalOutlined /> {element.website} </span>
                                </div>

                            </div>




                        </Card>
                        <FormData show={show} toggleModel={handleEdit} person={person} />
                    </div>

                ))
                }
            </div>

        </>
    );
};


export default CardData