import axios from 'axios';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { IoIosStarOutline } from "react-icons/io";
import { API } from '../API/API';
import {  toast } from 'react-toastify';

function Modalpopup({show,setShow,productid}) {
const [ind,setInd] = useState(null);
const [comments,setComments] = useState('')
const postedBy = JSON.parse(localStorage.getItem("userdata"));
const handleClose = () => setShow(false);

const Submitcomments = async()=>{
  console.log(comments,ind,postedBy?.user?._id,"comments")

 await axios.post(API+`comments/${productid}`,{
    postedBy:postedBy?.user?._id,
    comment:comments
  }).then((res)=>{console.log(res.data); 
    toast.success(`comments successfully updated`, {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
    })}).catch((error)=>console.log(error.message));
  setInd(null);
  setComments('')
}

 const fillstars =(index) =>{
    console.log("ppppppp")
  setInd(index)
 
 }

  return (
    <>
 

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Rating and Comments</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Add Rating</Form.Label>
              <div style={{display:"flex"}}>
             {[1,2,3,4,5].map((star,index)=>{
                return (
                    <div style={{  color: star <= ind ? 'gold' : 'gray',}} key={index}>
                        <IoIosStarOutline onClick={()=>fillstars(star)}/>
                    </div>
                )
             })}
             </div>
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Add Comments</Form.Label>
              <Form.Control as="textarea" rows={3} value={comments} onChange={(e)=>setComments(e.target.value)}/>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={Submitcomments}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Modalpopup;