import { useEffect, useState } from "react";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import logo from "../jpg/Bcom.logo1.jpg";
import bg from "../jpg/pic5.png";
import styles from "./styles.module.css";
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Accordion from 'react-bootstrap/Accordion';
import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';
import ArrowCircleDownIcon from '@mui/icons-material/ArrowCircleDown';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import axios from "axios";
import { useParams } from "react-router-dom";


const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [loggedinData, setLoggedinData]= useState(null);
  const { userId } = useParams();
  const [imageURL, setImageURL] = useState("");
  const [feedsData, setFeedsData] = useState([]);
  const [scrolled, SetScrolled]= useState(false);
  const [isloggedin, Setisloggedin]= useState(false);
  

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

    useEffect(() => {
      if (userId === localStorage.getItem("Id")) {
        Setisloggedin(true);
      }
    }, [userId]);
  

  const getUser = async () => {
    try {
      const url = `http://localhost:8080/api/profile/${userId}`;
      const response = await fetch(url, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch user data");
      }

      const data = await response.json();
      setUserData(data);

      const filenameBuffer = data.image.data.data;
      const uint8Array = new Uint8Array(filenameBuffer);
      const filename = String.fromCharCode.apply(null, uint8Array);
      setImageURL(`http://localhost:8080/api/profile/image/${filename}`);
    } catch (error) {
      console.error(error);
    }
  };

  const getLoggedUser = async () => {
    try {
      const url = `http://localhost:8080/api/profile/${localStorage.getItem("Id")}`;
      const response = await fetch(url, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch user data");
      }

      const data = await response.json();
      setLoggedinData(data);
      
    } catch (error) {
      console.error(error);
    }
  };

  const getUserFeeds = async () => {
    try {
      const url = `http://localhost:8080/api/profile/${userId}/posts`;
      const response = await fetch(url, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch user feeds");
      }

      const data = await response.json();
      setFeedsData(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getLoggedUser();
    getUser();
    getUserFeeds();
  }, []);



  const patchLike = async (_id, postId) => {
    const response = await fetch(
      `http://localhost:8080/api/posts/${_id}/upcord`,
      {
        method: "PATCH",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ postId: postId }),
      }
    );
    const updatedPost = await response.json();
    setFeedsData((prevData) =>
      prevData.map((feed) =>
        feed._id === updatedPost._id ? updatedPost : feed
      )
    );
  };

  const patchdisLike = async (_id, postId) => {
    const response = await fetch(
      `http://localhost:8080/api/posts/${_id}/downcord`,
      {
        method: "PATCH",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ postId: postId }),
      }
    );
    const updatedPost = await response.json();
    setFeedsData((prevData) =>
      prevData.map((feed) =>
        feed._id === updatedPost._id ? updatedPost : feed
      )
    );
  };

  const patchblinks= async()=>{
    const response= await fetch(
      `http://localhost:8080/api/profile/${userId}/blink`,
      {
        method:"PATCH",
        headers:{
          "Content-type": "application/json",
        },
        body: JSON.stringify({id:localStorage.getItem("Id")}),
      }
    );
    const updatedBlinks= await response.json();
    setLoggedinData(updatedBlinks);
  }

  // Assuming you have a separate state for the new comment
  const [newComment, setNewComment] = useState("");

  // Update the handleChange function to handle changes to the new comment input
  const handleChange = ({ currentTarget: input }) => {
    setNewComment(input.value);
  };

  // Update the post_comment function to send the new comment to the backend
  const post_comment = async (_id, event) => {
    try {
      event.preventDefault();
      const url = `http://localhost:8080/api/posts/${_id}/comment`;

      const commentData = {
        comment: newComment,
      };

      const { data: res } = await axios.post(url, commentData);
      window.location = "/feeds";
      const msg = res.message;
      console.log(msg);
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        console.log(error.response.data.message);

      }
    }
  };

  if (!userData) {
    return <div>Loading...</div>; // Display a loading indicator until the user is fetched.
  }

  return (
    <div className="profile" style={{
      backgroundImage:`url(${bg})`,backgroundAttachment:"fixed",minHeight:"100vh", width:"100%", backgroundSize:"cover", backgroundRepeat:"no-repeat", backgroundPosition:"center"
    }}>

        <Navbar className={scrolled ? styles.scrolled: ""} bg="dark" data-bs-theme="dark" style={{position:"sticky" ,top:"0", zIndex:"9999"}}>
        <Container style={{margin:"0 8px", padding:"0"}}>
          <Navbar.Brand href="/"><img src={logo} alt="logo" style={{width:"42px", height:"42px"}} />Profile</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/feeds">Feeds</Nav.Link>
            <Nav.Link href="/inscribe">inscribe</Nav.Link>
            <Nav.Link href="/">cluster</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    <div className={styles.profiledata}>
    <div className="upper" style={{width:"100%", height:"10rem", background:"#567C54", borderTopRightRadius:"6px", borderTopLeftRadius:"6px"}}></div>
    <Image src={imageURL} style={{width:"163px",height:"163px",zIndex:"999", position:"relative",bottom:"5rem", marginLeft:"2rem"}} roundedCircle />
    {isloggedin && (
    <Button style={{ float: "right", margin: "10px" }} variant="outline-light" href={"/updateProfile/"+localStorage.getItem("Id")}>
      Edit
    </Button>
  )}
  {console.log(loggedinData)}
  {console.log(userData)}
{!isloggedin && (
  <Button
    style={{ float: "right", margin: "10px" }}
    variant="primary"
    onClick={() => patchblinks()}
  >
    
  {loggedinData.blinks[userId]  ? (
      <>
        <PersonRemoveIcon />
        {" blinked"}
        
      </>
    ) : (
      <>
        <PersonAddIcon />
        {" blink"}
      </>
    )}
  </Button>
)}
  
    <div className="topInfo" style={{position:"relative",top:"-4rem", left:"4.5rem", width:"90%"}}>
    <h3 >{userData.name}</h3> 
    <p style={{fontSize:"14px"}}>{userData.city}</p>
    <div style={{display:"flex",justifyContent:"space-between",gap:"10px"}}>
    <p style={{background:"rgba(0, 0, 0, 0.15)",padding:"2rem", borderRadius:"10px", width:"70%"}}>{userData.describe} Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sequi id magni repellat numquam esse explicabo delectus sed cumque eius in laudantium maiores quia aperiam, ipsa nisi autem quo pariatur cupiditate.</p>
    <Card className={styles.infocard} border="light"  style={{ width: '18rem', paddingBottom:"3rem",textAlign:"center" }}>
      <Card.Body><Card.Title>{userData.course}:</Card.Title><Card.Text style={{fontSize:"1rem",display:"flex",alignItems:'center',justifyContent:"center"}}>
        {userData.college}<br />
              {userData.startyear} - {userData.completeyear}
            </Card.Text></Card.Body>
    </Card>
    </div>
    
    </div>
    <div className="bottomInfo">
      <div className="domain" style={{display:'flex',justifyContent:"center"}}>
      <Card className={styles.infocard} border="light"  style={{ width: '18rem', paddingBottom:"3rem",textAlign:"center" }}>
      <Card.Body><Card.Title>Interested Domains:</Card.Title><Card.Text style={{fontSize:"1rem"}}>
        {userData.domains}
              
            </Card.Text></Card.Body>
    </Card>
      </div>
    
<div className="others" style={{display:"flex",alignItems:"center",justifyContent:"space-around"}}>
<Card className={styles.infocard} border="light"  style={{ width: '18rem', paddingBottom:"3rem" }}>
      <Card.Body><Card.Title>Bio:</Card.Title><Card.Text style={{fontSize:"1rem"}}>
        {userData.bio}
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </Card.Text></Card.Body>
    </Card>

    <Card className={styles.infocard} border="light"  style={{ width: '20rem', paddingBottom:"3rem" }}>
      <Card.Body><Card.Title>Skills:</Card.Title><Card.Text style={{fontSize:"1rem"}}>
        {userData.skills}
              Javascript, React.js, html, css
            </Card.Text></Card.Body>
    </Card>

    <Card className={styles.infocard} border="light"  style={{ width: '18rem', paddingBottom:"3rem" }}>
      <Card.Body><Card.Title>Experience:</Card.Title><Card.Text style={{fontSize:"1rem"}}>
        {userData.experience}
              Frontend developer, backend developer, Javascript developer
            </Card.Text></Card.Body>
    </Card>
</div>
    
    </div>
    </div>

    <div className="myposts">
      <h1 style={{textAlign:"center"}}>{userData.name} Feeds</h1>
    {[...feedsData].reverse().map((feed) => {
    const filenameBuffer = feed.image.data.data;
    const uint8Array = new Uint8Array(filenameBuffer);
    const filename = String.fromCharCode.apply(null, uint8Array);
    const imagePURL = `http://localhost:8080/api/posts/image/${filename}`;

    return (
      <div className="post">
        <div className={styles.feeds} key={feed._id}>
          
        <h4>{feed.UserName}</h4>
        <p>{userData.college} {userData.city}</p>
        <hr />
        <p> {feed.title}</p>
        <div className={styles.content}>
        <p > {feed.content}</p>
        <img className={styles.image} src={imagePURL} alt="Profile" />
        </div>
        <div>
        <button className={styles.button} style={{marginRight:"10px"}} onClick={() => patchLike(feed._id, feed.postId)}>
          <ArrowCircleUpIcon /> upcord {Object.keys(feed.upcord).length}
        </button>
        <button className={styles.button} onClick={() => patchdisLike(feed._id, feed.postId)}>
         <ArrowCircleDownIcon /> downcord {Object.keys(feed.downcord).length}
        </button>
        </div>
        

        <Accordion data-bs-theme="dark">
      <Accordion.Item eventKey="0">
        <Accordion.Header>Comments</Accordion.Header>
        <Accordion.Body>
        <div className="comment">
          <div className="col-12">
            <label className="form-label">Post comment:</label>
            <input
              type="text"
              name="newComment"
              className="form-control"
              id="inputAddress"
              placeholder="Comment"
              onChange={handleChange}
              style={{ background: "rgba(0,0,0,.6)", color: "white" }}
              required
            />
          </div>
          <div className="col-12">
            <Button type="submit" style={{margin:"10px 0 10px 0"}} onClick={(event) => post_comment(feed._id, event)} variant="success">Post</Button>
          </div>
          <div className="viewcomment">
            
            {feed.comments.map((c) => (
              <div key={c._id}>
                <p>{c.senderName}</p>
                <p>{c.comment}</p>
              </div>
            ))}
          </div>
        </div>
        </Accordion.Body>
      </Accordion.Item>
      </Accordion>

        
      </div>
      </div>
      
    );
  })
}
    </div>
      
    </div>
  );
};

export default Profile;
