import { useState } from "react";
import styles from "./styles.module.css";
import axios from "axios";
import {Link} from "react-router-dom"
import Bcom from '../jpg/Bcom.logo1.jpg'
const Login=()=>{
    const [data, setData] = useState({
		email: "",
		password: "",

	});

    const [error, setError] = useState("");
	const [msg, setMsg] = useState("");

    const handleChange = ({ currentTarget: input }) => {
		setData({ ...data, [input.name]: input.value });
	};

    const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const url = "http://localhost:8080/api/auth";
			const { data: res } = await axios.post(url, data);
			localStorage.setItem("token", res.data);
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
            
            <div className={styles.container}>
            {error && <div className={styles.error_msg}>{error}</div>}
            {msg && <div className={styles.success_msg}>{msg}</div>}
            <div className={styles.full}>
    <div className={styles.logo}><Link to='/'><img src={Bcom} alt="logo" height="50px"/></Link></div>
    <div className={styles.wrapper}>
      <div className={styles.login}>
        <p>Welcome to</p><span>SpaceCord</span><p className={styles.txt2}>let's Begin...</p>
        <form className="row g-3 login border-start-0" onSubmit={handleSubmit} style={{height:'90px', width:'45%', marginLeft:'-5px'}}>
         <div className="col-12" id="col-12" style={{width:'647px'}}>
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
 
         
         
         <div className="col-12">
           <button type="submit" className="btn btn-dark" onSubmit={handleSubmit}>Login</button>
         </div>
       </form>
       <div className="forget"><Link to='/forgot-password'>Forget Password?</Link></div>
       <div className= {styles.vl}>
        <div className= {styles.line1}></div>
        <span className= {styles['vl-innertext']}>or</span>
        <div className={styles.line2}></div>
      </div>
      
     </div>
     {/* <!-- <div className="img"><img src="entity-removebg-preview.png" alt="entity"></div> --> */}
     <div className={styles.question}><h6>New here?</h6> <Link to="/signup">Sign up here</Link></div>
    </div>
  </div>
  </div>
    </>
        
    )
}
export default Login;