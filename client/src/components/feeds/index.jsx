import { useState, useEffect } from "react";
import axios from "axios";
import styles from "./styles.module.css";
import logo from "../jpg/Bcom.logo1.jpg";
import Horizontal from "components/flexbetween/horizontal";
import Horizontal1 from "components/flexbetween/horizontal1";


const Feeds = () => {
  const [feedsData, setFeedsData] = useState([]);
  const [error, setError] = useState("");
  // const [imageURL, setImageURL] = useState("");
  const [searchInput, setSearchInput] = useState("");

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
      data.forEach((item) => {
        console.log("Item:", item);
        console.log("Image:", item.image);
        console.log("UserName:", item.image.data.data);
        // Access other fields as needed
      });
      
      
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getFeeds();
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
        setError(error.response.data.message);
      }
    }
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg" data-bs-theme="dark">
        <div className={styles.container + " container-fluid"}>
          <div className="logo">
            <a className="navbar-brand" href="/">
              <img src={logo} alt="logo" width="44px" height="63px" />
              feeds
            </a>
          </div>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div
            className={styles.navside + " collapse navbar-collapse"}
            id="navbarSupportedContent"
          >
            <Horizontal />
            <div className={styles.nav}>
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <a className="nav-link active" aria-current="page" href="/">
                    Home
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/">
                    Scoop
                  </a>
                </li>
                <li className="nav-item ">
                  <a
                    className="nav-link"
                    href="/inscribe"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Inscribe
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/">
                    logout
                  </a>
                </li>
              </ul>
            </div>
            <div className="form">
              <form className="d-flex" role="search">
                <input
                  className="form-control me-2"
                  type="search"
                  placeholder="what's on your mind today?"
                  onChange={(e) => setSearchInput(e.target.value)}
                  value={searchInput}
                  aria-label="Search"
                />
                {/* <!-- <button className="btn btn-outline-success" type="submit">Search</button> --> */}
              </form>
            </div>
            <Horizontal />
          </div>
          <div
            className="login"
            style={{ display: "flex", justifyContent: "space-between" }}
          >
            <p>Already have an account?</p>
            <a href="#">login here</a>
          </div>
          <Horizontal1 />
        </div>
      </nav>
      {error && <div className="error">{error}</div>}
      {Array.isArray(feedsData) ? (
  filterPosts().map((feed) => {
    const filenameBuffer = feed.image.data.data;
    const uint8Array = new Uint8Array(filenameBuffer);
    const filename = String.fromCharCode.apply(null, uint8Array);
    const imageURL = `http://localhost:8080/api/posts/image/${filename}`;

    return (
      <div key={feed._id}>
        <h3>Title: {feed.title}</h3>
        <h4>Content: {feed.content}</h4>
        <img src={imageURL} alt="Profile" />
        <button onClick={() => patchLike(feed._id, feed.postId)}>
          Like
        </button>
        <button onClick={() => patchdisLike(feed._id, feed.postId)}>
          Dislike
        </button>

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
            <button
              type="submit"
              className="btn btn-dark"
              onClick={(event) => post_comment(feed._id, event)}
            >
              Post
            </button>
          </div>
          <div className="viewcomment">
            {feed.comments.map((c) => (
              <div key={c._id}>
                <h4>{c.senderName}</h4>
                <h5>{c.comment}</h5>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  })
) : (
  <div className="loading">Loading...</div>
)}

    </>
  );
};

export default Feeds;
