import { useState } from "react";
import styles from "./styles.module.css";
import axios from "axios";
import { Link } from "react-router-dom"
import Bcom from '../jpg/Bcom.logo1.jpg'

const Educationdetails = () => {
  const [data, setData] = useState({
    city: "",
    image: null,
    college: "",
    startyear: "",
    completeyear: "",
    course: "",
    branch: ""
  })

  const [error, setError] = useState("");
  const [msg, setMsg] = useState("");

  const handleChange = ({ currentTarget: input }) => {
    if (input.type === 'file') {
      setData({ ...data, image: input.files[0] });
    } else {
      setData({ ...data, [input.name]: input.value });
    }
  };




  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = "http://localhost:8080/api/users/educationdetails";
      const formData = new FormData();
      formData.append("city", data.city);
      formData.append("image", data.image);
      formData.append("college", data.college);
      formData.append("startyear", data.startyear);
      formData.append("completeyear", data.completeyear);
      formData.append("course", data.course);
      formData.append("branch", data.branch);


      const { data: res } = await axios.post(url, formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });
      // localStorage.setItem("city", data.city);
      window.location = "/login";
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
  return (
    <>
      <div className={styles.container}>
        {error && <div className={styles.error_msg}>{error}</div>}
        {msg && <div className={styles.success_msg}>{msg}</div>}
        <div className={styles.full}>
          <div className={styles.logo}><Link to='/'><img src={Bcom} alt="logo" height="50px" /></Link></div>
          <div className={styles.wrapper}>
            <div className={styles.login}>
              <p>Welcome to</p><span>SpaceCord</span><p className={styles.txt2}>{data.city}</p>
              <form method="post" autoComplete="off" className="row g-3 login border-start-0" onSubmit={handleSubmit} style={{ height: '90px', width: '45%', marginLeft: '-5px' }}>
                <div className="col-12">
                  <label className="form-label" >Add Your Image</label>
                  <input type="file" className="form-control" id="customFile" name="image" onChange={handleChange} />
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
                  <label className="form-label" >Start Year:</label>
                  <input type="text" name="startyear" className="form-control" id="inputAddress" placeholder="Start Year" onChange={handleChange} value={data.startyear} style={{ background: 'rgba(0,0,0,.6)', color: 'white' }} required />
                </div>

                <div className="col-md-6">
                  <label className="form-label" >Complete Year:</label>
                  <input type="text" name="completeyear" className="form-control" id="inputAddress" placeholder="complete year" onChange={handleChange} value={data.completeyear} style={{ background: 'rgba(0,0,0,.6)', color: 'white' }} required />
                </div>


                <div className="col-12">
                  <button type="submit" className="btn btn-dark" onSubmit={handleSubmit}>next</button>
                </div>
              </form>


            </div>
            {/* <!-- <div className="img"><img src="entity-removebg-preview.png" alt="entity"></div> --> */}
            {/* <div className={styles.question}><h6>Already have an account?</h6> <Link to="/login">Login here</Link></div> */}
          </div>
        </div>
      </div>
    </>
  )
}
export default Educationdetails;