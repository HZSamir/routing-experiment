import {useNavigate,} from "react-router-dom";

const FeedPage = () => {

  const navigate = useNavigate();
  return (
    <div>
      <button onClick={() => navigate(-1)}>Go back</button>
      <h2>Profile Page</h2>
    </div>
  );
}

export default FeedPage;