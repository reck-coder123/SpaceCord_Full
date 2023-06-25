import { useState } from "react";
import styles from "./styles.module.css";
import axios from "axios";
import {Link} from "react-router-dom"
import Bcom from '../jpg/Bcom.logo1.jpg'
import bg from "../jpg/varun_rawat72_empty_deep_space_hyper_realistic_8k_1280x720_pixe_06fb12b4-7d15-47e3-b7ab-a2653d2c4154.png"
import { useMediaQuery } from 'react-responsive'
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
const Login=()=>{
  const isDesktopOrLaptop = useMediaQuery({
    query: '(min-width: 1000px)'
    })
    const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1000px)' })
    const [data, setData] = useState({
		email: "",
		password: "",

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
			const url = "http://localhost:8080/api/auth";
			const { data: res } = await axios.post(url, data);
			localStorage.setItem("token", res.data);
      localStorage.setItem("Id",res.id);
			window.location = "/";
      setMsg(res.message);
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
        <form className="row g-3 login border-start-0" onSubmit={handleSubmit} style={{height:'30%', width:'45%'}}>
         <div className="col-12" id="col-12" style={{width:'647px'}}>
           <label  className="form-label" >Email Id:</label>
           <div className="input-group mb-3">
            <input type="email" className="form-control"  aria-label="Recipient's username" name="email" aria-describedby="basic-addon2" placeholder="Email" onChange={handleChange} value={data.email} style={{background:'rgba(0,0,0,.6)',color:'white'}} required/>
            {/* <span className="input-group-text" id="basic-addon2" style={{fontSize:'16px', fontWeight:'100' , background:'rgba(0,0,0,.6)' ,color:'white', width:'95px', padding:'0px 23px'}}>Verify</span> */}
          </div>
         </div>
           
         <div className="col-12">
           <label  className="form-label" style={{width:"auto"}} >Password</label>
           <input type="password" name="password" placeholder="Password" className="form-control" id="inputPassword4" onChange={handleChange} value={data.password} style={{background:'rgba(0,0,0,.6)',color:'white', width:"39.5rem"}} required/>
         </div>
 
         <div className="forget"><Link to='/forgot-password'>Forget Password?</Link></div>
         
         <div className="col-12">
           <button type="submit" className="btn btn-dark" onSubmit={handleSubmit}>Login</button>
         </div>
       </form>
       <div style={{width:"55%",position:'relative',top:"14rem",display:"flex",justifyContent:"center"}}>
       <div className= {styles.vl}>
        <div className= {styles.line1}></div>
        <span className= {styles['vl-innertext']}>or</span>
        <div className={styles.line2}></div>
      </div>
       </div>
       
      
     </div>
     {/* <!-- <div className="img"><img src="entity-removebg-preview.png" alt="entity"></div> --> */}
     <div className={styles.question}><h6>New here?</h6> <Link to="/signup">Sign up here</Link></div>
    </div>
  </div>
  </div>}

  {isTabletOrMobile && <div style={{ position:"fixed",
              backgroundImage:`url(${bg})`,backgroundAttachment:"fixed",minHeight:"100vh", height:"100%", width:"100%", backgroundSize:"cover", backgroundRepeat:"no-repeat", backgroundPosition:"center"
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
        <div className="title" style={{fontSize:"5rem", scale:"0.8",marginLeft:"-2.7rem"}}>
        <p>Welcome to</p><span>SpaceCord</span><p className={styles.txt2}>let's Begin...</p>
        </div>
        
        <form className="row g-3 login border-start-0" onSubmit={handleSubmit} style={{height:'30%', width:'100%'}}>
         <div className="col-12" id="col-12">
           <label  className="form-label" >Email Id:</label>
           <div className="input-group mb-3">
            <input type="email" className="form-control"  aria-label="Recipient's username" name="email" aria-describedby="basic-addon2" placeholder="Email" onChange={handleChange} value={data.email} style={{background:'rgba(0,0,0,.6)',color:'white'}} required/>
            {/* <span className="input-group-text" id="basic-addon2" style={{fontSize:'16px', fontWeight:'100' , background:'rgba(0,0,0,.6)' ,color:'white', width:'95px', padding:'0px 23px'}}>Verify</span> */}
          </div>
         </div>
           
         <div className="col-12">
           <label  className="form-label" >Password</label>
           <input type="password" name="password" placeholder="Password" className="form-control" id="inputPassword4" onChange={handleChange} value={data.password} style={{background:'rgba(0,0,0,.6)',color:'white'}} required/>
         </div>
 
         <div className="forget"><Link to='/forgot-password'>Forget Password?</Link></div>
         
         <div className="col-12" style={{display:"flex",justifyContent:"flex-start"}}>
           <button type="submit" className="btn btn-dark" onSubmit={handleSubmit}>Login</button>
         </div>
       </form>
       <div style={{width:"160%",position:'relative',top:"14rem",display:"flex",justifyContent:"center"}}>
       <div className= {styles.vl}>
        <div className= {styles.line1}></div>
        <span className= {styles['vl-innertext']}>or</span>
        <div className={styles.line2}></div>
      </div>
       </div>
       
      
     </div>
     {/* <!-- <div className="img"><img src="entity-removebg-preview.png" alt="entity"></div> --> */}
     <div className={styles.question}><h6>New here?</h6> <Link to="/signup">Sign up here</Link></div>
    </div>
  </div>
  </div>}
            
            </>
            
            
    
        
    )
}
export default Login;