import { useState } from "react";
import styles from "./styles.module.css";
import axios from "axios";
import {Link} from "react-router-dom"
import Bcom from '../jpg/Bcom.logo1.jpg'
const Signup=()=>{
    const [data, setData] = useState({
		name: "",
		email: "",
    mobile:"",
		password: "",
    confirmpassword:"",

	});

  const [error, setError] = useState("");
	const [msg, setMsg] = useState("");

    const handleChange = ({ currentTarget: input }) => {
		setData({ ...data, [input.name]: input.value });
	};

    const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const url = "http://localhost:8080/api/users";
			const { data: res } = await axios.post(url, data);
			setMsg(res.message);
      console.log(res.json());
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
        <form method="post" autoComplete="off" className="row g-3 login border-start-0" onSubmit={handleSubmit} style={{height:'90px', width:'45%', marginLeft:'-5px'}}>
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
           <div className="col-md-6" style={{position:'relative', left:'8px'}}>
            <label  className="form-label" >Contact No:</label>
            <div className="input-group mb-3">
              <span className="input-group-text" id="basic-addon1" style={{fontSize:'16px', fontWeight:'100' , color:'white' , position:'relative', left:'3px', background:'rgba(0,0,0,.6)'}}>+91</span>
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
       <div className= {styles.vl}>
        <div className= {styles.line1}></div>
        <span className= {styles['vl-innertext']}>or</span>
        <div className={styles.line2}></div>
      </div>
      
     </div>
     {/* <!-- <div className="img"><img src="entity-removebg-preview.png" alt="entity"></div> --> */}
     <div className={styles.question}><h6>Already have an account?</h6> <Link to="/login">Login here</Link></div>
    </div>
  </div>
  </div>
    </>
        
    )
}
export default Signup;