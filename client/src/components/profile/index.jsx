import { useEffect, useState } from "react";

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [imageURL, setImageURL] = useState("");
  const [feedsData, setFeedsData] = useState([]);

  const getUser = async () => {
    try {
      const url = `http://localhost:8080/api/profile`;
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

  const getUserFeeds = async () => {
    try {
      const url = `http://localhost:8080/api/profile/posts`;
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
    getUser();
    getUserFeeds();
  }, []);

  if (!userData) {
    return <div>Loading...</div>; // Display a loading indicator until the user is fetched.
  }

  return (
    <>
      <h3>Name: {userData.name}</h3>
      <h3>Email: {userData.email}</h3>
      <h3>College: {userData.college}</h3>
      <h3>City: {userData.city}</h3>
      <h3>Course: {userData.course}</h3>
      <img src={imageURL} alt="Profile" />
      {feedsData.map((feed) => (
        <h3 key={feed._id}>Post: {feed.title}</h3>
      ))}
    </>
  );
};

export default Profile;
