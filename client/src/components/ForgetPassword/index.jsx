import { useState } from "react";
import axios from "axios";
import styles from "./styles.module.css";

const ForgotPassword = () => {
	const [email, setEmail] = useState("");
	const [msg, setMsg] = useState("");
	const [error, setError] = useState("");

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const url = `http://localhost:8080/api/password-reset`;
			const { data } = await axios.post(url, { email });
			setMsg(data.message);
			setError("");
		} catch (error) {
			if (
				error.response &&
				error.response.status >= 400 &&
				error.response.status <= 500
			) {
				setError(error.response.data.message);
				setMsg("");
			}
		}
	};

	return (
		<div className={styles.container}>
            {error && <div className={styles.error_msg}>{error}</div>}
			{msg && <div className={styles.success_msg}>{msg}</div>}
			<p>Welcome to</p><span>SpaceCord</span><p className={styles.txt2}>let's Begin...</p>
        <form className="row g-3 login border-start-0" onSubmit={handleSubmit} style={{height:'90px', width:'45%', marginLeft:'-5px'}}>
         <div className="col-12" id="col-12" style={{width:'647px'}}>
           <label  className="form-label" >Email Id:</label>
           <div className="input-group mb-3">
            <input type="email" className="form-control"  aria-label="Recipient's username" name="email" aria-describedby="basic-addon2" placeholder="Email" onChange={(e) => setEmail(e.target.value)} value={email} style={{background:'rgba(0,0,0,.6)',color:'white'}} required/>
            {/* <span className="input-group-text" id="basic-addon2" style={{fontSize:'16px', fontWeight:'100' , background:'rgba(0,0,0,.6)' ,color:'white', width:'95px', padding:'0px 23px'}}>Verify</span> */}
          </div>
         </div>
				<button type="submit" className={styles.green_btn}>
					Submit
				</button>
			</form>
		</div>
	);
};

export default ForgotPassword;
