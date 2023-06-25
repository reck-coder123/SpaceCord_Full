import { useState } from "react";
import styles from "./styles.module.css";
import axios from "axios";
import bg from "../jpg/Pointers2.png"
import Container from 'react-bootstrap/Container';
// import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import logo from "../jpg/Bcom.logo1.jpg";
import profile_logo from '../Main/Icon 4 (Users).png'
// import { TypeAnimation } from 'react-type-animation';
import Form from 'react-bootstrap/Form';
import Input from '@mui/joy/Input';
import Textarea from '@mui/joy/Textarea';
import Button from '@mui/joy/Button';
import Vertical from "components/flexbetween/horizontal";

const Inscribe=()=>{

    
    const [data, setData]=useState({
        title:"",
        content:"",
        image:null,
    });

    const [error, setError] = useState("");
	const [msg, setMsg] = useState("");

    const handleChange=({currentTarget:input})=>{
        if (input.type === 'file') {
            setData({ ...data, image: input.files[0] });
          } else {
            setData({ ...data, [input.name]: input.value });
          }
        
    }

    const handleSubmit=async(e)=>{
        e.preventDefault();
        try {
           const url= "http://localhost:8080/api/inscribe";
           const { data: res } = await axios.post(url, data,{
            headers: {
                "Content-Type": "multipart/form-data"
              }
           });
           setMsg(res.message);
           window.location = "/";
        } catch (error) {
            if (
				error.response &&
				error.response.status >= 400 &&
				error.response.status <= 500
			) {
				setError(error.response.data.message);
			}
        }
    }
    return(
        <div className="full" style={{
            backgroundImage:`url(${bg})`,backgroundAttachment:"fixed",minHeight:"100vh", height:"100%", width:"100%", backgroundSize:"cover", backgroundRepeat:"no-repeat", backgroundPosition:"center"
          }}>
        <Navbar style={{position:"sticky" ,top:"0",background:"transparent",zIndex:"999"}} expand="lg" data-bs-theme="dark">
      <Container fluid>
        <Navbar.Brand href="/"><img src={logo} alt="logo" style={{width:"42px",height:"42px"}} />Inscribe</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll" style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/inscribe">inscribe</Nav.Link>
            <Nav.Link href="/">cluster</Nav.Link>
            <Nav.Link href="/feeds">Feeds</Nav.Link>
          </Nav>
          
{/* <Vertical />
<Vertical />
<Vertical />
<Vertical />
<Horizontal1 /> */}
          
              
            
          <Navbar.Text>
          <a href={"/profile/"+localStorage.getItem("Id")}><img src={profile_logo} alt="profile" /></a>

        </Navbar.Text>
          
          
        </Navbar.Collapse>
      </Container>
    </Navbar>


    

        <div className={styles.container}>  
        <form method="post" onSubmit={handleSubmit}>
        
            {/* <input type="text"  name="title" onChange={handleChange} value={data.title} placeholder="Enter title" required /> */}
            {/* <Form.Control type="text" name="title" onChange={handleChange} value={data.title} placeholder="Enter title" required /> */}
            <div className="title">
            <Input
  color="neutral"
  placeholder="Title"
  variant="outlined"
  type="text" name="title" onChange={handleChange} value={data.title}
  style={{background:"rgba(0, 0, 0, 0.6)",color:"white"}}
  required
/>
            </div>
            

            <div className="col-12">
                  
                  {/* <input type="file" className="form-control" id="customFile" name="image" onChange={handleChange} /> */}
                  <Form.Control type="file" name="image" style={{background:"rgba(0, 0, 0, 0.6)",color:"white"}} onChange={handleChange}/>
                </div>

            
            {/* <textarea type="text" name="content" onChange={handleChange} value={data.content} placeholder="write your content" required /> */}
            <div className="content">
            <Textarea
  color="neutral"
  minRows={2}
  placeholder="Inscribe it..."
  size="md"
  name="content" onChange={handleChange} value={data.content}
  style={{background:"rgba(0, 0, 0, 0.6)",color:"white",height:"18rem"}}
  required
/>
            </div>
            
            

            {/* <button type="submit" className="btn btn-dark" onSubmit={handleSubmit}>inscribe</button> */}
            <Button type="submit" style={{width:"5rem",marginTop:"6px", color:"white"}} color="info" onSubmit={handleSubmit} >Inscribe</Button>
        </form>
            </div>
            <Vertical />
            <Vertical />
            <Vertical />
        </div>
        
        
    )
}
export default Inscribe;