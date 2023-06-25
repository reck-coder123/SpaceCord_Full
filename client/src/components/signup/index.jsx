import { useState } from "react";
import styles from "./styles.module.css";
import axios from "axios";
import {Link} from "react-router-dom"
import Bcom from '../jpg/Bcom.logo1.jpg'
import bg from "../jpg/varun_rawat72_empty_deep_space_hyper_realistic_8k_1280x720_pixe_06fb12b4-7d15-47e3-b7ab-a2653d2c4154.png"
import { useMediaQuery } from 'react-responsive';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

const Signup=()=>{
  const isDesktopOrLaptop = useMediaQuery({
    query: '(min-width: 1000px)'
    })
    const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1000px)' })
    const [data, setData] = useState({
		name: "",
		email: "",
    mobile:"",
		password: "",
    confirmpassword:"",

	});

  const [error, setError] = useState("");
	const [msg, setMsg] = useState("");
  const [show, setShow] = useState(false);

    const handleChange = ({ currentTarget: input }) => {
		setData({ ...data, [input.name]: input.value });
	};

    const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const url = "http://localhost:8080/api/users";
			const { data: res } = await axios.post(url, data);
      setShow(true);
			setMsg(res.message);
      console.log(res.json());
		} catch (error) {
			if (
				error.response &&
				error.response.status >= 400 &&
				error.response.status <= 500
			) {
        setShow(true);
				setError(error.response.data.message);
			}
		}
	};

    return(
        <>
        {isDesktopOrLaptop && <div style={{ position:"fixed",
            backgroundImage:`url(${bg})`,backgroundAttachment:"fixed",minHeight:"100vh", height:"100%", overflowY:"hidden", width:"100%", backgroundSize:"cover", backgroundRepeat:"no-repeat", backgroundPosition:"center"
          }}>
            {show && (

<Alert severity="error" 
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
  {error}
</Alert>


)}
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
  {msg}
</Alert>


)}
            <div className={styles.full}>
    <div className={styles.logo}><Link to='/'><img src={Bcom} alt="logo" height="50px"/></Link></div>
    <div className={styles.wrapper}>
      <div className={styles.login}>
        <p>Welcome to</p><span>SpaceCord</span><p className={styles.txt2}>let's Begin...</p>
        <form method="post" autoComplete="off" className="row g-3 login border-start-0" onSubmit={handleSubmit} style={{height:'90px', width:'45%'}}>
         <div className="col-12" id="col-12">
           <label  className="form-label" >Email Id:</label>
           <div className="input-group mb-3">
            <input type="email" name="email" className="form-control"  aria-label="Recipient's username" aria-describedby="basic-addon2" onChange={handleChange} value={data.email} style={{background:'rgba(0,0,0,.6)',color:'white'}} placeholder="Email" required/>
            <span className="input-group-text" id="basic-addon2" style={{fontSize:'16px', fontWeight:'100' , background:'rgba(0,0,0,.6)' ,color:'white', width:'95px', padding:'0px 23px'}}>Verify</span>
          </div>
         </div>
         <div className="col-md-6">
             <label  className="form-label"  >Name:</label>
             <input type="text" name="name" className="form-control" id="inputAddress" placeholder="Name" onChange={handleChange} value={data.name} style={{background:'rgba(0,0,0,.6)',color:'white'}} required/>
           </div>
           <div className="col-md-6">
            <label  className="form-label" >Contact No:</label>
            <div className="input-group mb-3">
              <span className="input-group-text" id="basic-addon1" style={{fontSize:'16px', fontWeight:'100' , color:'white', background:'rgba(0,0,0,.6)'}}>+91</span>
              <input type="text" name="mobile" className="form-control"  aria-label="Username" aria-describedby="basic-addon1" placeholder="mobile" onChange={handleChange} value={data.mobile} style={{background:'rgba(0,0,0,.6)',color:'white'}}/>
            </div>
           </div>
         <div className="col-12">
           <label  className="form-label" >Password</label>
           <input type="password" name="password" className="form-control" id="inputPassword4" placeholder="password" onChange={handleChange} value={data.password} style={{background:'rgba(0,0,0,.6)',color:'white'}} required/>
         </div>
 
         <div className="col-12">
           <label  className="form-label" >Re-Enter Password:</label>
           <input type="password" name="confirmpassword" className="form-control" id="inputPassword4" placeholder="confirm password" onChange={handleChange} value={data.confirmpassword} style={{background:'rgba(0,0,0,.6)',color:'white'}} required/>
         </div>
         
         <div className="col-12">
           <button type="submit" className="btn btn-dark" onSubmit={handleSubmit}>sign up</button>
         </div>
       </form>
       <div style={{width:"55%",position:'relative',top:"24rem",display:"flex",justifyContent:"center"}}>
       <div className= {styles.vl}>
        <div className= {styles.line1}></div>
        <span className= {styles['vl-innertext']}>or</span>
        <div className={styles.line2}></div>
      </div>
       </div>
      
     </div>
     {/* <!-- <div className="img"><img src="entity-removebg-preview.png" alt="entity"></div> --> */}
     <div className={styles.question}><h6>Already have an account?</h6> <Link to="/login">Login here</Link></div>
    </div>
  </div>
  </div>}


  {isTabletOrMobile && <div style={{
            backgroundImage:`url(${bg})`,backgroundAttachment:"fixed",minHeight:"100vh", height:"100%", overflowY:"hidden", width:"100%", backgroundSize:"cover", backgroundRepeat:"no-repeat", backgroundPosition:"center"
          }}>
            {show && (<Alert severity="error" 
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
          {error}
        </Alert>)}
            {show && (<Alert severity="success" 
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
          {msg}
        </Alert>)}
            <div className={styles.full}>
    <div className={styles.logo}><Link to='/'><img src={Bcom} alt="logo" height="50px"/></Link></div>
    <div className={styles.wrapper}>
      <div className={styles.login}>
      <div className="title" style={{fontSize:"5rem", scale:"0.8",marginLeft:"-3.8rem",width:"100%"}}>
        <p>Welcome to</p><span>SpaceCord</span><p className={styles.txt2}>let's Begin...</p>
        </div>
        <form method="post" autoComplete="off" className="row g-3 login border-start-0" onSubmit={handleSubmit} style={{height:'90px', width:'100%'}}>
         <div className="col-12" id="col-12" style={{width:'647px'}}>
           <label  className="form-label" >Email Id:</label>
           <div className="input-group mb-3">
            <input type="email" name="email" className="form-control"  aria-label="Recipient's username" aria-describedby="basic-addon2" onChange={handleChange} value={data.email} style={{background:'rgba(0,0,0,.6)',color:'white'}} placeholder="Email" required/>
            <span className="input-group-text" id="basic-addon2" style={{fontSize:'16px', fontWeight:'100' , background:'rgba(0,0,0,.6)' ,color:'white', width:'95px', padding:'0px 23px'}}>Verify</span>
          </div>
         </div>
         <div className="col-md-6">
             <label  className="form-label"  >Name:</label>
             <input type="text" name="name" className="form-control" id="inputAddress" placeholder="Name" onChange={handleChange} value={data.name} style={{background:'rgba(0,0,0,.6)',color:'white'}} required/>
           </div>
           <div className="col-md-6">
            <label  className="form-label" >Contact No:</label>
            <div className="input-group mb-3">
              <span className="input-group-text" id="basic-addon1" style={{fontSize:'16px', fontWeight:'100' , color:'white', background:'rgba(0,0,0,.6)'}}>+91</span>
              <input type="text" name="mobile" className="form-control"  aria-label="Username" aria-describedby="basic-addon1" placeholder="mobile" onChange={handleChange} value={data.mobile} style={{background:'rgba(0,0,0,.6)',color:'white'}}/>
            </div>
           </div>
         <div className="col-12">
           <label  className="form-label" >Password</label>
           <input type="password" name="password" className="form-control" id="inputPassword4" placeholder="password" onChange={handleChange} value={data.password} style={{background:'rgba(0,0,0,.6)',color:'white'}} required/>
         </div>
 
         <div className="col-12">
           <label  className="form-label" >Re-Enter Password:</label>
           <input type="password" name="confirmpassword" className="form-control" id="inputPassword4" placeholder="confirm password" onChange={handleChange} value={data.confirmpassword} style={{background:'rgba(0,0,0,.6)',color:'white'}} required/>
         </div>
         
         <div className="col-12" style={{marginTop:"3rem",display:"flex",justifyContent:"center",width:'62.5%'}}>
           <button type="submit" className="btn btn-dark" onSubmit={handleSubmit}>sign up</button>
         </div>
       </form>
       <div style={{width:"155%",position:'relative',top:"33rem",display:"flex",justifyContent:"center"}}>
       <div className= {styles.vl}>
        <div className= {styles.line1}></div>
        <span className= {styles['vl-innertext']}>or</span>
        <div className={styles.line2}></div>
      </div>
       </div>
      
     </div>
     {/* <!-- <div className="img"><img src="entity-removebg-preview.png" alt="entity"></div> --> */}
     <div className={styles.question}><h6>Already have an account?</h6> <Link to="/login">Login here</Link></div>
    </div>
  </div>
  </div>}
        
        </>
            
            
        
    )
}
export default Signup;