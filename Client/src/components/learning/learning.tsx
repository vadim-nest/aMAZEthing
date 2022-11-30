import '../../css/learning.css';
import { Outlet } from 'react-router-dom';
import { Squirrel } from '../svg/animalsSVG';
import CurveSort from './curveSortSVG';
import CurvePath from './curvePathSVG';
import { useAppDispatch } from '../../features/hooks';
import { useDispatch } from 'react-redux';
import { refreshSortingPath } from '../../features/user_slice';

export default function LearningPage() {

  return (
    <>
      <div className="initial-view">
        <div>
          <h1>Welcome to the amazing learning experience.</h1>
          <h1>Learn sorting and path finding algorithms.</h1>
        </div>
        <button className="scroll-learning" onClick={() => window.scrollBy(0, window.innerHeight*0.9)}>
          <h3>Scroll to learn more.</h3>
          <h3>↓</h3>
        </button>
      </div>
      <div className="all-algs">
        <div className="sorting-algs">
          <div className="explanation">
            <div className="sorting-algo">
              <h3 className="explanation-title">Sorting algorithms</h3>
              <p className="explanation-text">
                {/* Puts elements of a list into an order. It can be numerical and
                lexicographical, and either ascending or descending. */}
                Sorting Algorithms are used to arrange elements in a list into a specific order, often either ascending or descending. 
              </p>
              <p className="explanation-text">
                There are many sorting algorithms, but some are better than others.
                
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
