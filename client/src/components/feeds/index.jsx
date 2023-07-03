import { useState, useEffect } from "react";
import axios from "axios";
import styles from "./styles.module.css";
import logo from "../jpg/Bcom.logo1.jpg";
import bg from "../jpg/pic5.png";
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import profile_logo from '../Main/Icon 4 (Users).png'
import Horizontal from "components/flexbetween/horizontal";
import Horizontal1 from "components/flexbetween/horizontal1";
import Accordion from 'react-bootstrap/Accordion';
import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';
import ArrowCircleDownIcon from '@mui/icons-material/ArrowCircleDown';
// import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import Avatar from '@mui/material/Avatar';
import { useNavigate } from "react-router-dom";
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Button from '@mui/material/Button';




const Feeds = () => {
  const [feedsData, setFeedsData] = useState([]);
  const [userData,setUserData]=useState([]);
  const [error, setError] = useState("");
  // const [imageURL, setImageURL] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [scrolled, SetScrolled]= useState(false);
  const [show, setShow] = useState(false);
  const [loading,setLoading] =useState(false);
  const navigate = useNavigate();



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

  const isLocalstorageempty = () => {
    if (localStorage.getItem('token') === null) {
      return true;
    }
    return false;
  };

  const getFeeds = async () => {
    try {
      const url = "http://localhost:8080/api/posts";
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

  

  const getusers= async()=>{
    try {
      const url= `http://localhost:8080/api/profile/fullData`;
      const response= await fetch(url, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch user details");
      }
      const data = await response.json();
      setUserData(data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getFeeds();
    getusers();
  }, []);

  const filterPosts = () => {
    if (searchInput.length > 0) {
      return feedsData.filter((post) =>
        post.title.toLowerCase().includes(searchInput.toLowerCase())
      );
    } else {
      return feedsData;
    }
  };

  const patchLike = async (_id) => {
    const postId = localStorage.getItem("Id"); // Use "postId" instead of "Id"

    if(postId===null){
      setShow(true);
      setError("login to like post!!")
      return;
    }
  
    const response = await fetch(
      `http://localhost:8080/api/posts/${_id}/upcord`,
      {
        method: "PATCH",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ postId }), // Use "postId" as the key
      }
    );
  
    const updatedPost = await response.json();
    setFeedsData((prevData) =>
      prevData.map((feed) =>
        feed._id === updatedPost._id ? updatedPost : feed
      )
    );
  };
  

  const patchdisLike = async (_id) => {
    const postId = localStorage.getItem("Id");

    if(postId===null){
      setShow(true);
      setError("login to dislike post!!")
      return;
    }

    const response = await fetch(
      `http://localhost:8080/api/posts/${_id}/downcord`,
      {
        method: "PATCH",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ postId}),
      }
    );
    const updatedPost = await response.json();
    setFeedsData((prevData) =>
      prevData.map((feed) =>
        feed._id === updatedPost._id ? updatedPost : feed
      )
    );
  };

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

    // Check if the new comment is empty
    if (newComment.trim() === "") {
      setShow(true);
      setError("Comment can't be empty!!");
      return; // Stop execution if comment is empty
    }

    setLoading(true);

    const url = `http://localhost:8080/api/posts/${_id}/comment`;

    const commentData = {
      senderid: localStorage.getItem("Id"),
      comment: newComment,
    };

    const { data: res } = await axios.post(url, commentData);

    setLoading(false);
    setNewComment("");

    const freshComment = res.data; // Assuming the response contains the updated comment data

    // Update feedsData with the freshComment at the given _id
    const updatedFeedsData = feedsData.map((post) => {
      if (post._id === _id) {
        return {
          ...post,
          freshComment,
        };
      }
      return post;
    });

    setFeedsData(updatedFeedsData);

    const msg = res.message;
    console.log(msg);

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
    <div className="feedsfull" style={{
      backgroundImage:`url(${bg})`,backgroundAttachment:"fixed",minHeight:"100vh", width:"100%", backgroundSize:"cover", backgroundRepeat:"no-repeat", backgroundPosition:"center"
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




      <Navbar style={{position:"sticky" ,top:"0"}} className={scrolled ? styles.scrolled: ""} expand="lg" data-bs-theme="dark">
      <Container fluid>
        <Navbar.Brand href="/"><img src={logo} alt="logo" style={{width:"42px",height:"42px"}} />feeds</Navbar.Brand>
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
          </Nav>
          <div className={styles.searchcontainer + " searchcontainer"}>
  <Form className="d-flex">
    <Form.Control
      type="search"
      placeholder="what's on your mind today?.."
      onChange={(e) => setSearchInput(e.target.value)}
      value={searchInput}
      className="me-2"
      aria-label="Search"
    />
  </Form>
  
</div>
<Horizontal />
<Horizontal />
<Horizontal />
<Horizontal />
<Horizontal1 />
          {isLocalstorageempty() ? (
              
            
          <Navbar.Text>
          
          <a href="/login"><span style={{color:"blue"}}><Button variant="contained" color="success">
  login
</Button></span></a>
        </Navbar.Text>
          ):(
            <Navbar.Text>
           <a href={"/profile/"+localStorage.getItem("Id")}><img src={profile_logo} alt="profile" /></a>
          </Navbar.Text>
          )}
          
        </Navbar.Collapse>
      </Container>
    </Navbar>
      
    {Array.isArray(feedsData) ? (
  [...filterPosts()].reverse().map((feed) => {
    const user = userData.find((user) => user._id === feed.postId);

    const fileUKnameBuffer = feed.UserImage.data.data;
    const UKuint8Array = new Uint8Array(fileUKnameBuffer);
    const fileUKname = String.fromCharCode.apply(null, UKuint8Array);
    const iUKmageURL = `http://localhost:8080/api/profile/image/${fileUKname}`;

    let imageURL = null;
    if (feed.image) {
      const filenameBuffer = feed.image.data.data;
      const uint8Array = new Uint8Array(filenameBuffer);
      const filename = String.fromCharCode.apply(null, uint8Array);
      imageURL = `http://localhost:8080/api/posts/image/${filename}`;
    }

    return (
      <div className={styles.feeds} key={feed._id}>
        <div className="prsnal" style={{display:"flex", gap:"10px"}}>
          <Avatar onClick={() => navigate(`/profile/${feed.postId}`)} alt={feed.UserName} src={iUKmageURL} /> <h4>{feed.UserName}</h4>
        </div>
        {user && <p>{user.college} {user.city}</p>}
        
        <hr />
        <p>{feed.title}</p>
        <div className={styles.content}>
          <p>{feed.content}</p>
          {imageURL && <img className={styles.image} src={imageURL} alt="Profile" />}
        </div>
        <div>
          <button className={styles.button} style={{ marginRight: "10px" }} onClick={() => patchLike(feed._id)}>
            <ArrowCircleUpIcon /> upcord {Object.keys(feed.upcord).length}
          </button>
          <button className={styles.button} onClick={() => patchdisLike(feed._id)}>
            <ArrowCircleDownIcon /> downcord {Object.keys(feed.downcord).length}
          </button>
        </div>

        <Accordion data-bs-theme="dark">
          <Accordion.Item eventKey="0">
            <Accordion.Header>Comments</Accordion.Header>
            <Accordion.Body>
              <div className="comment" id="comment-section">
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
                    value={newComment}
                    required
                  />
                </div>
                <div className="col-12">
                  {/* <button
                    type="submit"
                    className="btn btn-dark"
                    onClick={(event) => post_comment(feed._id, event)}
                  >
                    Post
                  </button> */}
                  <Button type="submit" style={{ margin: "10px 0 10px 0" }} onClick={(event) => post_comment(feed._id, event)} variant="contained" color="success" disabled={loading}>
                  {loading ? (
                <Spinner
                  animation="border"
                  role="status"
                  size="sm"
                  className="me-2"
                >
                  <span className="visually-hidden">Loading...</span>
                </Spinner>
              ) : (
                "Post"
              )}</Button>
                </div>
                <div className="viewcomment">
                  {[...feed.comments].reverse().map((c) => (
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
    );
  })
) : (
    <div className="loading">Loading...</div>
)}


    </div>
  );
};


export default Feeds;
