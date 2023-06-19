import { useEffect, useState, Fragment } from "react";
import { useParams,Link } from "react-router-dom";
import axios from "axios";
import styles from "./styles.module.css";
import Bcom from '../jpg/Bcom.logo1.jpg'

const PasswordReset = () => {
	const [validUrl, setValidUrl] = useState(false);
	const [password, setPassword] = useState("");
    const [confirmpassword,setCPassword]=useState("");
	const [msg, setMsg] = useState("");
	const [error, setError] = useState("");
	const param = useParams();
	const url = `http://localhost:8080/api/password-reset/${param.id}/${param.token}`;

	useEffect(() => {
		const verifyUrl = async () => {
			try {
				await axios.get(url);
				setValidUrl(true);
			} catch (error) {
				setValidUrl(false);
			}
		};
		verifyUrl();
	}, [param, url]);

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const { data } = await axios.post(url, { password,confirmpassword });
			setMsg(data.message);
			setError("");
			window.location = "/login";
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
    return(
        <Fragment>
			{validUrl ? (
				<div className={styles.container}>
                    {error && <div className={styles.error_msg}>{error}</div>}
						{msg && <div className={styles.success_msg}>{msg}</div>}
                        <div className={styles.logo}><Link to='/'><img src={Bcom} alt="logo" height="50px"/></Link></div>
					<form className="row g-3 login border-start-0" style={{height:'90px', width:'45%', marginLeft:'-5px'}} onSubmit={handleSubmit}>
                    <div className="col-12">
           <label  className="form-label" >Password</label>
						<input
							type="password"
							placeholder="Password"
							name="password"
							onChange={(e) => setPassword(e.target.value)}
							value={password}
							required
							className="form-control"
                            id="inputPassword4" 
						/></div>
                        
						<div className="col-12">
                        <label  className="form-label" >Confirm Password:</label>
						<input
							type="password"
							placeholder="Confirm Password"
							name="confirmpassword"
							onChange={(e) => setCPassword(e.target.value)}
							value={confirmpassword}
							required
							className="form-control"
                            id="inputPassword4" 
						/></div>
                        <div className="col-12">
                        <button type="submit" className="btn btn-dark">
							Submit
						</button>
                        </div>
						
					</form>
				</div>
			) : (
				<h1>404 Not Found</h1>
			)}
		</Fragment>
	);
};

export default PasswordReset;
    