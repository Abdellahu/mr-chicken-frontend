import { useEffect, useState, useRef } from "react";
import { ArrowLeft, ArrowRight, StarFill } from "react-bootstrap-icons";
import axios from "axios";

function FeedDataProvider() {
  const containerRef = useRef(null);
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setError(null);
      setLoading(true);
      try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/select_feed`);
        console.log("API Response feed data", response.data);
        setFeedbacks(response.data);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
        console.error("Error fetching data:", err);
      }
    };

    fetchData();
  }, []);

  const scrollLeft = () => {
    if (containerRef.current) {
      containerRef.current.scrollLeft -= 100;
    }
  };
  const scrollRight = () => {
    if (containerRef.current) {
      containerRef.current.scrollLeft += 100;
    }
  };
  if (loading) {
    return <div>Loading dishes...</div>;
  }
  if (error) {
    return <div>Error: {error.message}</div>;
  }
  if (!feedbacks) {
    return <div>No dishes available.</div>;
  }
  return (
    <div className="feeds">
      <div className="feeds-wraper">
        <div className="real-feeds" ref={containerRef}>
          {feedbacks.map((feed) => (
            <div key={feed.feed_id} className="feed">
              <div className="feed-wraper">
                <div className="feed-head">
                  <div className="name-letter">
                    <p className="circle-head">
                      {feed.feed_user_name.charAt(0)}
                    </p>
                    <p className="rating-pad">
                      <StarFill />
                      {feed.feed_rating}
                    </p>
                  </div>
                  <div className="name-feeder">
                    <p>{feed.feed_user_name}</p>
                  </div>
                </div>
                <div className="feed-desc">
                  <p className="italics grey">"{feed.feed_text}"</p>
                </div>
                <div className="feed-date">
                  <hr />
                  <p className="grey">{feed.feed_date}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="feedBtn">
          <div className="Ido">
            <button className="scrollBtn1" onClick={scrollLeft}>
              <ArrowLeft />
            </button>
            <button className="scrollBtn2" onClick={scrollRight}>
              <ArrowRight />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FeedDataProvider;
