import React, { useEffect, useState } from "react";
import "./Feedback.css";
import { Star, StarFill, X } from "react-bootstrap-icons";
import { useTheme } from "./../Header/Brightness";
import axios from "axios";

function FeedBack({ onMessage }) {
  const { theme } = useTheme();

  const [feed_user_name, setFeedUserName] = useState("");
  const [feed_user_email, setFeedUserEmail] = useState("");
  const [feed_text, setFeedText] = useState("");
  const [feed_rating, setFeedRating] = useState();
  const [feed_time, setFeedTime] = useState({});
  const [feed_date, setFeedDate] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const [star1, setStar1] = useState(false);
  const [star2, setStar2] = useState(false);
  const [star3, setStar3] = useState(false);
  const [star4, setStar4] = useState(false);
  const [star5, setStar5] = useState(false);

  useEffect(() => {
    const today = new Date();
    const currentDay = String(today.getDate()).padStart(2, "0");
    const currentMonth = String(
      today.toLocaleString("default", { month: "short" })
    );
    const currentYear = today.getFullYear();
    setFeedDate(currentMonth + " " + currentDay + ", " + currentYear);
    setFeedTime(today);
    console.log(today);
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post("http://localhost:3011/add-new-feed/", {
        feed_user_name: feed_user_name,
        feed_user_email: feed_user_email,
        feed_text: feed_text,
        feed_rating: feed_rating,
        feed_time: feed_time,
        feed_date: feed_date,
      });

      setMessage("Data submitted successfully!");
      setError("");
      setFeedUserName("");
      setFeedUserEmail("");
      setFeedText("");
      setFeedRating();
    } catch (err) {
      setError(`Error submitting data: ${err.message}`);
      setMessage("");
      console.error(err);
    }
  };

  const handleClick = () => {
    onMessage(false);
  };

  //customize it

  const fiveStar = () => {
    setStar1(true);
    setStar2(true);
    setStar3(true);
    setStar4(true);
    setStar5(true);

    setFeedRating(5);
  };
  const fourStar = () => {
    setStar1(true);
    setStar2(true);
    setStar3(true);
    setStar4(true);
    setStar5(false);

    setFeedRating(4);
  };
  const threeStar = () => {
    setStar1(true);
    setStar2(true);
    setStar3(true);
    setStar4(false);
    setStar5(false);

    setFeedRating(3);
  };
  const twoStar = () => {
    setStar1(true);
    setStar2(true);
    setStar3(false);
    setStar4(false);
    setStar5(false);

    setFeedRating(2);
  };
  const oneStar = () => {
    setStar1(true);
    setStar2(false);
    setStar3(false);
    setStar4(false);
    setStar5(false);

    setFeedRating(1);
  };

  return (
    <div
      className={
        theme === "dark"
          ? "feeedbackComponent toDimFeed container"
          : "feeedbackComponent container"
      }
    >
      <div className="feeedbackComponent-wraper">
        <X onClick={handleClick} className="toSide" size={26} />
        <p className="largeFont">Share Your Feedback</p>
        <p className="grey">
          We value your openion and would love to hear your toughts
        </p>
        <form onSubmit={handleSubmit}>
          {message && <div style={{ color: "green" }}>{message}</div>}
          {error && <div style={{ color: "red" }}>{error}</div>}
          <label>Your Name</label>
          <br />
          <input
            type="text"
            placeholder="John Doe"
            name="feed_user_name"
            value={feed_user_name}
            onChange={(e) => setFeedUserName(e.target.value)}
            required
          />
          <br />
          <label>Email Adress</label>
          <br />
          <input
            type="email"
            placeholder="your@email.com"
            name="feed_user_email"
            value={feed_user_email}
            onChange={(e) => setFeedUserEmail(e.target.value)}
            required
          />
          <br />
          <label>Your Feedback</label>
          <br />
          <textarea
            type="text"
            placeholder="What did you like or what could we improve?"
            name="feed_text"
            value={feed_text}
            onChange={(e) => setFeedText(e.target.value)}
            required
          />
          <br />
          <label>Your Rating</label>
          <br />
          <div className="stars">
            <Star size={27} onClick={oneStar} className={star1 ? "to1" : ""} />
            <Star size={27} onClick={twoStar} className={star2 ? "to2" : ""} />
            <Star
              size={27}
              onClick={threeStar}
              className={star3 ? "to3" : ""}
            />
            <Star size={27} onClick={fourStar} className={star4 ? "to4" : ""} />
            <Star size={27} onClick={fiveStar} className={star5 ? "to5" : ""} />
          </div>
          <div className="row">
            <p className="col red">Not satisfied</p>
            <p className="col green">Very satisfied</p>
          </div>
          <br />
          <button type="submit" className="DeefBtn">
            Submit Feedback
          </button>
        </form>
      </div>
    </div>
  );
}

export default FeedBack;
