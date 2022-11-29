import '../../css/learning.css';
import { useNavigate } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import { Squirrel } from '../svg/animalsSVG';
import CurveSort from './curveSortSVG';
import CurvePath from './curvePathSVG';

export default function LearningPage() {
  const navigate = useNavigate();

  return (
    <>
      <div className="initial-view">
        <div>
          <h1>Welcome to the amazing learning experience.</h1>
          <h1>Learn sorting and path finding algorithms.</h1>
        </div>
        <div className="scroll-learning">
          <h3>Scroll to learn more.</h3>
          <h3>↓</h3>
        </div>
      </div>
      <div className="all-algs">
        <div className="sorting-algs">
          <div className="explanation">
            <div className="sorting-algo">
              <h3 className="explanation-title">Sorting algorithms</h3>
              <p className="explanation-text">
                Puts elements of a list into an order. It can be numerical and
                lexicographical, and either ascending or descending.
              </p>
              <p className="explanation-text">
                The output of any sorting algorithm must include a reordering,
                retaining all of the original elements and each element has to
                be no smaller/larger than the previous element, according to the
                required order.
              </p>
            </div>
            <CurveSort />
            <div className="path-algo">
              <h3 className="explanation-title">Path finding algorithms</h3>
              <p className="explanation-text">
                Takes a start point (also known as a node) and a goal and
                attempts to make the shortest path between the two given
                possible obstacles blocking the way.
              </p>
              <p className="explanation-text">
                The simplest example of path finding is a 2D grid in a game,
                that can be used to find a path from A to B on any type of
                graph.
              </p>
              <p className="explanation-text">
                What you will soon see used here!
              </p>
            </div>
          </div>
        </div>
        <div className="path-finding-algs">
          <CurvePath />
        </div>
      </div>
      <Outlet />
    </>
  );
}
