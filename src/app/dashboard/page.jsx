"use client";
import React, { useEffect, useState } from "react";
import styles from "./page.module.css";
// import useSWR from "swr";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import useSWR from "swr";
import axios from "axios";
require('dotenv').config();
const Dashboard = () => {
  const [email, setEmail] = useState('');
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('/api/auth/register');
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users: ', error);
      }
    };

    fetchUsers();
  }, []);
  console.log(users);
        //OLD WAY TO FETCH DATA
        // const [data, setData] = useState([]);
        // const [err, setErr] = useState(false);
        // const [isLoading, setIsLoading] = useState(false);
        // useEffect(() => {
        //   const getData = async () => {
        //     setIsLoading(true);
        //     const res = await fetch("https://jsonplaceholder.typicode.com/posts", {
        //       cache: "no-store",
        //     });

        //     if (!res.ok) {
        //       setErr(true);
        //     }

        //     const data = await res.json()

        //     setData(data);
        //     setIsLoading(false);
        //   };
        //   getData()
        // }, []);
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const res = await fetch('/api/config');
  //       const data = await res.json();
  //       setEmail(data.email);
  //     } catch (error) {
  //       console.error("Error fetching data: ", error);
  //     }
  //   };
    
  
  //   fetchData();
  // }, []);
  const session = useSession();

  const router = useRouter();

  //NEW WAY TO FETCH DATA
  const fetcher = (...args) => fetch(...args).then((res) => res.json());

  const { data, mutate, error, isLoading } = useSWR(
    `/api/posts?username=${session?.data?.user.name}`,
    fetcher
  );
  if (session.status === "loading") {
    return <p>Loading...</p>;
  }

  if (session.status === "unauthenticated") {
    router?.push("/dashboard/login");
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const title = e.target[0].value;
    const desc = e.target[1].value;
    const img = e.target[2].value;
    const content = e.target[3].value;

    try {
      await fetch("/api/posts", {
        method: "POST",
        body: JSON.stringify({
          title,
          desc,
          img,
          content,
          username: session.data.user.name,
        }),
      });
      mutate();
      e.target.reset()
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`/api/posts/${id}`, {
        method: "DELETE",
      });
      mutate();
    } catch (err) {
      console.log(err);
    }
  };


  if (session.status === "authenticated") {
    if (session.data.user.email === "shamshodnurmurodov119@gmail.com") {    
      return (
       <>
        <div className={styles.container}>
          <div   className={styles.posts} style={{overflowY:"auto",height:"500px",padding:"30px"}} >
            {isLoading
              ? "loading"
              : data?.map((post) => (
                 <>
                  <div key={post._id}>
  
                  <div className={styles.post} key={post._id}>
                    <div className={styles.imgContainer}>
                      <Image src={post.img} alt="" width={200} height={100} />
                    </div>
                    <h2 className={styles.postTitle}>{post.title}</h2>
                    <span
                      className={styles.delete}
                      
                      onClick={() => handleDelete(post._id)}
                    >
                      X
                    </span>
                  </div>
                  </div>
                 </>
                ))}
          </div>
          <form className={styles.new} onSubmit={handleSubmit}>
            <h1>Add New Post</h1>
            <input type="text" placeholder="Title" className={styles.input} />
            <input type="number" placeholder="price" className={styles.input} />
            <input type="text" placeholder="Image" className={styles.input} />
            <textarea
              placeholder="Content"
              className={styles.textArea}
              cols="30"
              rows="10"
            ></textarea>
            <button className={styles.button}>Send</button>
          </form>
        </div>
        <div className={styles.container}>
                <div  className={styles.posts}>
                  {
                    console.log(session.data)
                  }
                </div>
        </div>
       </>
      );
    }else{
      router.push('/'); // Redirect to the home page
      return null;
    }
  }
};

export default Dashboard;
