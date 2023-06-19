import { useState,useEffect } from "react";
import styles from "./styles.module.css";
import axios from "axios";
import Bcom from '../jpg/HomeBG.png';
import { Link } from "react-router-dom";

const UpdateProfile= ()=>{

    const [data,setData]=useState({
        bio:"",
        domains:"",
        describe:"",
        experience:"",
        skills:"",
    })

    const getUserdetails=async()=>{
        const url= `http://localhost:8080/api/profile`;
        const response=await fetch(url,{
            method:"GET",
            headers:{
                Accept:"application/json",
                "Content-type": "application/json",
            },
        });
        const data = await response.json();
        setData(data);

        // const filenameBuffer = data.image.data.data;
        // const uint8Array = new Uint8Array(filenameBuffer);
        // const filename = String.fromCharCode.apply(null, uint8Array);
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
            const url= "http://localhost:8080/api/profile/update_profile";
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
            window.location="/profile";
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
          <div className={styles.logo}><Link to='/'><img src={Bcom} alt="logo" height="50px" /></Link></div>
          <div className={styles.wrapper}>
            <div className={styles.login}>
              <p>Welcome to</p><span>SpaceCord</span><p className={styles.txt2}>{data.name}</p>
              <form method="post" autoComplete="off" className="row g-3 login border-start-0" onSubmit={handleSubmit} style={{ height: '90px', width: '45%', marginLeft: '-5px' }}>
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
                  <label className="form-label" >Start Year:</label>
                  <input type="text" name="startyear" className="form-control" id="inputAddress" placeholder="Start Year" onChange={handleChange} value={data.startyear} style={{ background: 'rgba(0,0,0,.6)', color: 'white' }} required />
                </div>

                <div className="col-md-6">
                  <label className="form-label" >Complete Year:</label>
                  <input type="text" name="completeyear" className="form-control" id="inputAddress" placeholder="complete year" onChange={handleChange} value={data.completeyear} style={{ background: 'rgba(0,0,0,.6)', color: 'white' }} required />
                </div>

                <div className="col-12">
                  <label className="form-label" >Bio:</label>
                  <input type="text" name="bio" className="form-control" id="inputAddress" placeholder="bio" onChange={handleChange} value={data.bio} style={{ background: 'rgba(0,0,0,.6)', color: 'white' }} required />
                </div>

                <div className="col-12">
                  <label className="form-label" >Domains:</label>
                  <input type="text" name="domains" className="form-control" id="inputAddress" placeholder="domains" onChange={handleChange} value={data.domains} style={{ background: 'rgba(0,0,0,.6)', color: 'white' }} required />
                </div>

                <div className="col-12">
                  <label className="form-label" >Describe yourself:</label>
                  <input type="text" name="describe" className="form-control" id="inputAddress" placeholder="describe" onChange={handleChange} value={data.describe} style={{ background: 'rgba(0,0,0,.6)', color: 'white' }} required />
                </div>

                <div className="col-12">
                  <label className="form-label" >Your experience:</label>
                  <input type="text" name="experience" className="form-control" id="inputAddress" placeholder="experience" onChange={handleChange} value={data.experience} style={{ background: 'rgba(0,0,0,.6)', color: 'white' }} required />
                </div>

                <div className="col-12">
                  <label className="form-label" >Your skills:</label>
                  <input type="text" name="skills" className="form-control" id="inputAddress" placeholder="skills" onChange={handleChange} value={data.skills} style={{ background: 'rgba(0,0,0,.6)', color: 'white' }} required />
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

export default UpdateProfile;