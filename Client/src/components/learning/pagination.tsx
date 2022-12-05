import { useNavigate } from "react-router-dom";
import "../../css/learning/learning.css";

function Pagination({
  leftName,
  rightName,  
  leftLink,
  rightLink,
  children,
}: {
    leftName:string;
    rightName:string;
  leftLink: string;
  rightLink: string;
  children: any;
}) {
  const navigate = useNavigate();
  return (
    <div className="page-layout">
      <div className="pagination-left">
        <button
          className="scroll-learning"
          onClick={() => navigate(`/${leftLink}`)}
        >
          <h3> ← </h3>
          <h4>Go to {leftName} </h4>
        </button>
      </div>
      {children}
      <div className="pagination-right">
        <button
          className="scroll-learning"
          onClick={() => {
            navigate(`/${rightLink}`);
          }}
        >
          <h3> → </h3>
          <h4>Go to {rightName} </h4>
        </button>
      </div>
    </div>
  );
}

export default Pagination;
