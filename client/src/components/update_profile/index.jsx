import { useState,useEffect } from "react";
import styles from "./styles.module.css";
import axios from "axios";
import profile_logo from '../Main/Icon 4 (Users).png'
import logo from "../jpg/Bcom.logo1.jpg";
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import bg from "../jpg/pic5.png";
import Form from 'react-bootstrap/Form';
import { useParams } from "react-router-dom";
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';


const UpdateProfile= ()=>{
  

    const [data,setData]=useState({
        bio:"",
        domains:"",
        describe:"",
        experience:"",
        skills:"",
    })
    const { userId } = useParams();

    const [scrolled, SetScrolled]= useState(false);
    const [show, setShow] = useState(false);

    useEffect(()=>{
      const onScroll= ()=>{
          if(window.scrollY>50){
              SetScrolled(true)
          }
          else{
              SetScrolled(false);
          }
      }

      window.addEventListener('scroll',onScroll);
      return ()=> window.removeEventListener;
  }, [])

    const getUserdetails=async()=>{
        const url= `http://localhost:8080/api/profile/${userId}`;
        const response=await fetch(url,{
            method:"GET",
            headers:{
                Accept:"application/json",
                "Content-type": "application/json",
            },
        });
        const data = await response.json();
        setData(data);

        
    };
    
    useEffect(()=>{
        getUserdetails();
    },[]);

    const [error, setError]= useState("");
    const [msg,setMsg] = useState("");

    const handleChange= ({currentTarget: input})=>{
        if(input.type=== 'file') {
            setData({...data,image:input.files[0]});
        }
        else{
            setData({ ...data, [input.name]: input.value });
        }
    };


    const handleSubmit= async(e)=>{
        e.preventDefault();
        try {
            const url= `http://localhost:8080/api/profile/update_profile/${userId}`;
            const formData= new FormData();
            formData.append("name",data.name);
            formData.append("email",data.email);
            formData.append("mobile",data.mobile);
            formData.append("city", data.city);
            formData.append("image", data.image);
            formData.append("college", data.college);
            formData.append("startyear", data.startyear);
            formData.append("completeyear", data.completeyear);
            formData.append("course", data.course);
            formData.append("branch", data.branch);
            formData.append("bio",data.bio);
            formData.append("domains",data.domains);
            formData.append("describe",data.describe);
            formData.append("experience",data.experience);
            formData.append("skills",data.skills);


            const {data:res}= await axios.post(url, formData, {
                headers:{
                    "Content-Type": "multipart/form-data"
                }
            });
            window.location=`/updateProfile/${userId}`;
            setMsg(res.message);
            setShow(true);
        } catch (error) {
            if (
                error.response &&
                error.response.status >= 400 &&
                error.response.status <= 500
              ) {
                setError(error.response.data.message);
              }
        }
    };
    return(
        <div className="update" style={{
          backgroundImage:`url(${bg})`,backgroundAttachment:"fixed",minHeight:"100vh", width:"100%", backgroundSize:"cover", backgroundRepeat:"no-repeat", backgroundPosition:"center"
        }}>
          {show && (


        <Alert severity="success" 
        style={{position:"sticky" ,top:"0",height:"4rem",zIndex:999999}}
        variant="filled"
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setShow(false);
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
          sx={{ mb: 2 }}
        >
          Profile updated successfully
        </Alert>
      )}

<Navbar bg="dark" style={{position:"sticky" ,top:"0"}} className={scrolled ? styles.scrolled: ""} expand="lg" data-bs-theme="dark">
      <Container fluid>
        <Navbar.Brand href="/"><img src={logo} alt="logo" style={{width:"42px",height:"42px"}} /> update profile</Navbar.Brand>
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
          <Navbar.Text>
          <a href={"/profile/"+localStorage.getItem("Id")}><img src={profile_logo} alt="profile" /></a>

        </Navbar.Text>
          
        </Navbar.Collapse>
      </Container>
    </Navbar>
        <div className={styles.container}>
              <form method="post" autoComplete="off" className="row g-3 login border-start-0" onSubmit={handleSubmit} >
                <div className="col-12">
                  <label className="form-label" >Update Your Image</label>
                  <input type="file" className="form-control" id="customFile" name="image" onChange={handleChange} />
                </div>
                <div className="col-12">
                  <label className="form-label"  >Name:</label>
                  <input type="text" name="name" className="form-control" id="inputAddress" placeholder="College" onChange={handleChange} value={data.name} style={{ background: 'rgba(0,0,0,.6)', color: 'white' }} required />
                </div>
                <div className="col-12">
                  <label className="form-label"  >Email Id:</label>
                  <input type="text" name="email" className="form-control" id="inputAddress" placeholder="email" onChange={handleChange} value={data.email} style={{ background: 'rgba(0,0,0,.6)', color: 'white' }} required />
                </div>

                <div className="col-md-6" style={{position:'relative', left:'8px'}}>
            <label  className="form-label" >Contact No:</label>
            <div className="input-group mb-3">
              <span className="input-group-text" id="basic-addon1" style={{fontSize:'16px', fontWeight:'100' , color:'white' , position:'relative', left:'3px', background:'rgba(0,0,0,.6)'}}>+91</span>
              <input type="text" name="mobile" className="form-control"  aria-label="Username" aria-describedby="basic-addon1" placeholder="mobile" onChange={handleChange} value={data.mobile} style={{background:'rgba(0,0,0,.6)',color:'white'}}/>
            </div>
           </div>

                <div className="col-12" id="col-12" style={{ width: '647px' }}>
                  <label className="form-label" >Where you live?</label>

                  <input type="text" name="city" className="form-control" aria-label="Recipient's username" aria-describedby="basic-addon2" onChange={handleChange} value={data.city} style={{ background: 'rgba(0,0,0,.6)', color: 'white' }} placeholder="Where you live?" required />

                </div>
                <div className="col-12">
                  <label className="form-label"  >Your Institute:</label>
                  <input type="text" name="college" className="form-control" id="inputAddress" placeholder="College" onChange={handleChange} value={data.college} style={{ background: 'rgba(0,0,0,.6)', color: 'white' }} required />
                </div>
                <div className="col-12" style={{ position: 'relative', left: '8px' }}>
                  <label className="form-label" >course:</label>
                  {/* <div className="input-group mb-3"> */}
                  <input type="text" name="course" className="form-control" aria-label="Username" aria-describedby="basic-addon1" placeholder="course" onChange={handleChange} value={data.course} style={{ background: 'rgba(0,0,0,.6)', color: 'white' }} />
                  {/* </div> */}
                </div>
                <div className="col-12">
                  <label className="form-label" >Branch:</label>
                  <input type="text" name="branch" className="form-control" id="inputAddress" placeholder="Branch" onChange={handleChange} value={data.branch} style={{ background: 'rgba(0,0,0,.6)', color: 'white' }} required />
                </div>

                <div className="col-md-6">
                  {/* 
                  <input type="text" name="startyear" className="form-control" id="inputAddress" placeholder="Start Year" onChange={handleChange} value={data.startyear} style={{ background: 'rgba(0,0,0,.6)', color: 'white' }} required /> */}
                  <label className="form-label" >Start Year:</label>
                  <Form.Select aria-label="Default select example" name="startyear" className="form-control" id="inputAddress" placeholder="Start Year" onChange={handleChange} value={data.startyear} style={{ background: 'rgba(0,0,0,.6)', color: 'white' }} required>
      <option>Open this select menu</option>
      <option value="1970">1970</option>
    <option value="1971">1971</option>
    <option value="1972">1972</option>
    <option value="1973">1973</option>
    <option value="1974">1974</option>
    <option value="1975">1975</option>
    <option value="1976">1976</option>
    <option value="1977">1977</option>
    <option value="1978">1978</option>
    <option value="1979">1979</option>
    <option value="1980">1980</option>
    <option value="1981">1981</option>
    <option value="1982">1982</option>
    <option value="1983">1983</option>
    <option value="1984">1984</option>
    <option value="1985">1985</option>
    <option value="1986">1986</option>
    <option value="1987">1987</option>
    <option value="1988">1988</option>
    <option value="1989">1989</option>
    <option value="1990">1990</option>
    <option value="1991">1991</option>
    <option value="1992">1992</option>
    <option value="1993">1993</option>
    <option value="1994">1994</option>
    <option value="1995">1995</option>
    <option value="1996">1996</option>
    <option value="1997">1997</option>
    <option value="1998">1998</option>
    <option value="1999">1999</option>
    <option value="2000">2000</option>
    <option value="2001">2001</option>
    <option value="2002">2002</option>
    <option value="2003">2003</option>
    <option value="2004">2004</option>
    <option value="2005">2005</option>
    <option value="2006">2006</option>
    <option value="2007">2007</option>
    <option value="2008">2008</option>
    <option value="2009">2009</option>
    <option value="2010">2010</option>
    <option value="2011">2011</option>
    <option value="2012">2012</option>
    <option value="2013">2013</option>
    <option value="2014">2014</option>
    <option value="2015">2015</option>
    <option value="2016">2016</option>
    <option value="2017">2017</option>
    <option value="2018">2018</option>
    <option value="2019">2019</option>
    <option value="2020">2020</option>
    <option value="2021">2021</option>
    <option value="2022">2022</option>
    <option value="2023">2023</option>
    </Form.Select>
                </div>

                <div className="col-md-6">
                  <label className="form-label" >Complete Year:</label>
                  {/* <input type="text" name="completeyear" className="form-control" id="inputAddress" placeholder="complete year" onChange={handleChange} value={data.completeyear} style={{ background: 'rgba(0,0,0,.6)', color: 'white' }} required /> */}
                  <Form.Select aria-label="Default select example" name="completeyear" className="form-control" id="inputAddress" placeholder="complete year" onChange={handleChange} value={data.completeyear} style={{ background: 'rgba(0,0,0,.6)', color: 'white' }} required>
      <option>Open this select menu</option>
      <option value="1970">1970</option>
    <option value="1971">1971</option>
    <option value="1972">1972</option>
    <option value="1973">1973</option>
    <option value="1974">1974</option>
    <option value="1975">1975</option>
    <option value="1976">1976</option>
    <option value="1977">1977</option>
    <option value="1978">1978</option>
    <option value="1979">1979</option>
    <option value="1980">1980</option>
    <option value="1981">1981</option>
    <option value="1982">1982</option>
    <option value="1983">1983</option>
    <option value="1984">1984</option>
    <option value="1985">1985</option>
    <option value="1986">1986</option>
    <option value="1987">1987</option>
    <option value="1988">1988</option>
    <option value="1989">1989</option>
    <option value="1990">1990</option>
    <option value="1991">1991</option>
    <option value="1992">1992</option>
    <option value="1993">1993</option>
    <option value="1994">1994</option>
    <option value="1995">1995</option>
    <option value="1996">1996</option>
    <option value="1997">1997</option>
    <option value="1998">1998</option>
    <option value="1999">1999</option>
    <option value="2000">2000</option>
    <option value="2001">2001</option>
    <option value="2002">2002</option>
    <option value="2003">2003</option>
    <option value="2004">2004</option>
    <option value="2005">2005</option>
    <option value="2006">2006</option>
    <option value="2007">2007</option>
    <option value="2008">2008</option>
    <option value="2009">2009</option>
    <option value="2010">2010</option>
    <option value="2011">2011</option>
    <option value="2012">2012</option>
    <option value="2013">2013</option>
    <option value="2014">2014</option>
    <option value="2015">2015</option>
    <option value="2016">2016</option>
    <option value="2017">2017</option>
    <option value="2018">2018</option>
    <option value="2019">2019</option>
    <option value="2020">2020</option>
    <option value="2021">2021</option>
    <option value="2022">2022</option>
    <option value="2023">2023</option>
    <option value="2024">2024</option>
    <option value="2025">2025</option>
    <option value="2026">2026</option>
    <option value="2027">2027</option>
    </Form.Select>
                </div>

                <div className="col-12">
                  <label className="form-label" >Bio:</label>
                  <textarea type="text" name="bio" className="form-control" id="inputAddress" placeholder="bio" onChange={handleChange} value={data.bio} style={{ background: 'rgba(0,0,0,.6)', color: 'white' }} required />
                </div>

                <div className="col-12">
                  <label className="form-label" >Domains:</label>
                  <textarea type="text" name="domains" className="form-control" id="inputAddress" placeholder="domains" onChange={handleChange} value={data.domains} style={{ background: 'rgba(0,0,0,.6)', color: 'white' }} required />
                </div>

                <div className="col-12">
                  <label className="form-label" >Describe yourself:</label>
                  <textarea type="text" name="describe" className="form-control" id="inputAddress" placeholder="describe" onChange={handleChange} value={data.describe} style={{ background: 'rgba(0,0,0,.6)', color: 'white' }} required />
                </div>

                <div className="col-12">
                  <label className="form-label" >Your experience:</label>
                  <textarea type="text" name="experience" className="form-control" id="inputAddress" placeholder="experience" onChange={handleChange} value={data.experience} style={{ background: 'rgba(0,0,0,.6)', color: 'white' }} required />
                </div>

                <div className="col-12">
                  <label className="form-label" >Your skills:</label>
                  <textarea type="text" name="skills" className="form-control" id="inputAddress" placeholder="skills" onChange={handleChange} value={data.skills} style={{ background: 'rgba(0,0,0,.6)', color: 'white' }} required />
                </div>

                <div className="col-12">
                  <button type="submit" className="btn btn-dark" onSubmit={handleSubmit}>next</button>
                </div>
              </form>


            </div>
            {/* <!-- <div className="img"><img src="entity-removebg-preview.png" alt="entity"></div> --> */}
            {/* <div className={styles.question}><h6>Already have an account?</h6> <Link to="/login">Login here</Link></div> */}
          
          
         </div>
    )
}

export default UpdateProfile;