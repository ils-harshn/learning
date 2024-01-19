// Import necessary libraries
import React from "react";
import InfiniteScroll from "react-infinite-scroller";
import { useInfiniteQuery } from "react-query";
import "../css/InfiniteScrollPage.css";

// Function to fetch data from the API
const fetchPhotos = async (page) => {
  //   console.log(page);
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts?_page=${page}`
  );
  return response.json();
};

// InfiniteScrollComponent
const InfiniteScrollPage = () => {
  const { data, isLoading, fetchNextPage, hasNextPage } = useInfiniteQuery(
    "photos",
    ({ pageParam = 1 }) => fetchPhotos(pageParam),
    {
      getNextPageParam: (lastPage, pages) => {
        return lastPage.length > 0 ? pages.length + 1 : undefined;
      },
    }
  );

  if (isLoading)
    return (
      <div className="full-loader">
        <div className="loader"></div>
      </div>
    );

  return (
    <InfiniteScroll
      pageStart={0}
      loadMore={fetchNextPage}
      hasMore={hasNextPage}
      loader={
        <div className="bottom-loader">
          <div className="loader"></div>
        </div>
      }
      threshold={400}
    >
      {data?.pages.map((page, pageNumber) => (
        <React.Fragment key={pageNumber}>
          {page.map((post) => (
            <div key={post.id}>
              <h2>{post.title}</h2>
              <p>{post.body}</p>
            </div>
          ))}
        </React.Fragment>
      ))}
    </InfiniteScroll>
  );
};

export default InfiniteScrollPage;
