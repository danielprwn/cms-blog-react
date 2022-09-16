import React, { useEffect, useState } from "react";
import { createClient } from "contentful";
import { Link } from "react-router-dom";

const BlogList = () => {
  const [blogPosts, setBlogPosts] = useState([]);

  //Contenful API connection
  const client = createClient({
    space: "YOUR SPACE ID",
    accessToken: "YOUR API KEY",
  });

  useEffect(() => {
    const getAllEntries = async () => {
      try {
        await client.getEntries().then((entries) => {
          setBlogPosts(entries);
        });
      } catch (error) {
        console.log(`Houston, we have a problem - Error ${error}`);
      }
    };
    getAllEntries();
  }, []);

  return (
    <div id="layout" className="pure-g">
      <div className="content pure-u-1 pure-u-md-3-4">
        <div>
          <div className="posts">
            <h1 className="content-subhead">React Contentful Blog</h1>

            {blogPosts?.items?.map((post) => (
              <section className="post" key={post.sys.id}>
                <header className="post-header">
                  <img
                    src={post.fields.blogImage.fields.file.url}
                    title=""
                    alt={post.fields.title}
                    width="100%"
                    height="100%"
                  />
                  <h2 className="post-title pt-3">{post.fields.title}</h2>
                  <p className="post-meta">
                    Author Name ➡{" "}
                    <a href="https://reactjs.org/" className="post-author">
                      {post.fields.blogAuthor}
                    </a>{" "}
                    Date: <span></span>
                    <small>{post.fields.createdDate}</small>
                  </p>
                </header>
                <div className="post-description">
                  <p>{post.fields.blogSummary}</p>
                  <Link
                    to={`/blogDetails/${post.sys.id}`}
                    className="button button1"
                  >
                    Read More...
                  </Link>
                </div>
              </section>
            ))}
          </div>

          <div className="footer">
            <div className="pure-menu pure-menu-horizontal">
              <div className="pure-menu-item">
                <small>&copy; Copyright 2022 - Prwn</small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogList;
