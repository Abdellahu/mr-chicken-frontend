import { useEffect, useState } from "react";
import "./FeedbackCollector.css";
import { Trash } from "react-bootstrap-icons";
import { useTheme } from "./../Header/Brightness";
import axios from "axios";
import TimeAgo from "../Home/TimeAgo";


function StarRating({ rating }) {
  const stars = Array.from({ length: rating }, (_, index) => (
    <p key={index} className="feederRating">⭐️</p>  
  ));
  return <div>{stars}</div>;
}

function FeedbackCollector() {
  const { theme } = useTheme();
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

 
 

  if (loading) {
    return <div>Loading feedbacks...</div>;
  }
  if (error) {
    return <div>Error: {error.message}</div>;
  }
  if (!feedbacks) {
    return <div>No feedbacks available.</div>;
  }
  return (
    <div className={`feedbackCollector ${theme === "dark" ? "toDimFed" : ""}`}>
      <div className="feedbackCollector-wraper">
        <div className="recentFeed">
          <p className="recentTextFeed">Recent Feedbacks</p>
        </div>
        <div>
          {feedbacks.map((feed) => (
            <div key={feed.feed_id} className="r_feedbacks">
              <hr />
              <div className="nameFlex">
                <div className="profile">
                  <p className="roundText">{feed.feed_user_name.charAt(0)}</p>
                  <p className="feederName">{feed.feed_user_name}</p>
                </div>
                <div className="mminute">
                  <TimeAgo pastTime={feed.feed_time} />
                  </div>
              </div>
              <div className="rating-wraper">
                 <StarRating rating={feed.feed_rating}/>
              </div>
              <p className="feederCescription">"{feed.feed_text}"</p>
              <p className="feederEmail">Email: {feed.feed_user_email}</p>
              <p className="feederYear">{feed.feed_date}</p>
            </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default FeedbackCollector;
