import React, { useEffect, useState } from "react";
import { createClient } from "contentful";
import { Link, useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";

const BlogDetails = () => {
  const [detailsBlogPost, setDetailsBlogPost] = useState([]);

  let { id } = useParams();

  //Contenful API connection
  const client = createClient({
    space: "YOUR SPACE ID",
    accessToken: "YOUR API KEY",
  });

  useEffect(() => {
    const getEntryById = async () => {
      try {
        await client.getEntry(id).then((entries) => {
          setDetailsBlogPost(entries);
        });
      } catch (error) {
        console.log(`Houston, we have a problem - Error ${error}`);
      }
    };
    getEntryById();
  }, [id]);

  return (
    <div id="layout" className="pure-g">
      <div className="content pure-u-1 pure-u-md-3-4">
        <div>
          <div className="posts">
            <Link to="/blogList" className="content-subhead">
              ↩ Return to Blog Posts!
            </Link>

            <section className="post">
              <header className="post-header">
                <img
                  src={detailsBlogPost?.fields?.blogImage?.fields?.file?.url}
                  title=""
                  alt={detailsBlogPost?.fields?.title}
                  width="100%"
                  height="100%"
                />
                <h2 className="post-title pt-3">
                  {detailsBlogPost?.fields?.title}
                </h2>
                <p className="post-meta">
                  Author Name ➡{" "}
                  <a href="https://reactjs.org/" className="post-author">
                    {detailsBlogPost?.fields?.blogAuthor}
                  </a>{" "}
                  Date: <span></span>
                  <small>{detailsBlogPost?.fields?.createdDate}</small>
                </p>
              </header>
              <div className="post-description">
                <ReactMarkdown
                  children={detailsBlogPost?.fields?.postContent}
                />
              </div>
            </section>
          </div>
          <div className="footer">
            <div className="pure-menu pure-menu-horizontal">
              <div className="pure-menu pure-menu-horizontal">
                <div className="pure-menu-item">
                  <small>&copy; Copyright 2022 - Prwn</small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogDetails;
