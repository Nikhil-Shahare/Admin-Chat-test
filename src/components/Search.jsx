import React, { useContext, useState } from "react";
import {
  collection,
  query,
  where,
  getDocs,
  setDoc,
  doc,
  updateDoc,
  serverTimestamp,
  getDoc,
} from "firebase/firestore";
import { db } from "../firebase";
import { AuthContext } from "../context/AuthContext";
const Search = () => {
  const [username, setUsername] = useState("");
  const [user, setUser] = useState(null);
  const [err, setErr] = useState(false);
  
  const { currentUser } = useContext(AuthContext);
  
  const handleSearch = async () => {
    const q = query(
      collection(db, "users"),
      where("displayName", "==", username)
      );
      
      try {
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          console.log("this one is doc",doc.data())
          setUser(doc.data());
        });
      } catch (err) {
        setErr(true);
      }
    };
    
    const handleKey = (e) => {
      e.code === "Enter" && handleSearch();
    };
    
    const handleSelect = async () => {
      //check whether the group(chats in firestore) exists, if not create
      const combinedId =
      currentUser.uid > user.uid
      ? currentUser.uid + user.uid
      : user.uid + currentUser.uid;
      
      console.log("this is the combineid",combinedId)
      try {
        const res = await getDoc(doc(db, "chats", combinedId));
        console.log("this is res in search",res.data())
        
        if (!res.exists()) {
          //create a chat in chats collection
          await setDoc(doc(db, "chats", combinedId), { messages: [] });
          console.log("didnt get response")  
          //create user chats
          await updateDoc(doc(db, "userChats", currentUser.uid), {
            [combinedId + ".userInfo"]: {
              uid: user.uid,
              displayName: user.displayName,
              photoURL: user.photoURL,
            },
            [combinedId + ".date"]: serverTimestamp(),
          });
          
        await updateDoc(doc(db, "userChats", user.uid), {
          [combinedId + ".userInfo"]: {
            uid: currentUser.uid,
            displayName: currentUser.displayName,
            photoURL: currentUser.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });
      }
    } catch (err) {}
    
    setUser(null);
    setUsername("")
    console.log("this is user uid",user.uid)
  };
  return (
    <div className="search">
      <div className="searchForm">
        <input
          type="text"
          placeholder="Find a user"
          onKeyDown={handleKey}
          onChange={(e) => setUsername(e.target.value)}
          value={username}
        />
      </div>
      {err && <span>User not found!</span>}
      {user && (
        <div className="userChat" onClick={handleSelect}>
          <img src={user.photoURL} alt="" />
          <div className="userChatInfo">
            <span>{user.displayName}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Search;
