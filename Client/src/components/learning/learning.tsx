import '../../css/learning.css';
import CurveSort from './curveSortSVG';
import CurvePath from './curvePathSVG';
import { useDispatch } from 'react-redux';
import { useAuth0 } from '@auth0/auth0-react';
import { useAppSelector } from '../../features/hooks';
import MediaQuery from 'react-responsive';

export default function LearningPage() {
  const { getAccessTokenSilently, isAuthenticated } = useAuth0();
  const dispatch = useDispatch();
  const user = useAppSelector((state) => state.user);

  return (
    <div className="disable-horizontal-scroll">
      <div className="initial-view">
        <div>
          <MediaQuery minWidth={601}>
            <h1>Welcome to the amazing learning experience.</h1>
            <h1>Learn sorting and path finding algorithms.</h1>
          </MediaQuery>
          <MediaQuery maxWidth={600}>
            <h1 className="title-small">
              Welcome to the amazing learning experience.
            </h1>
            <h1 className="title-small">
              Learn sorting and path finding algorithms.
            </h1>
          </MediaQuery>
        </div>
        <button
          className="scroll-learning"
          onClick={() => window.scrollBy(0, window.innerHeight * 0.9)}
        >
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
                Sorting Algorithms are used to arrange elements in a list into a
                specific order, often either ascending or descending.
              </p>
              <p className="explanation-text">
                Sorts are most commonly used with numerical or a form of
                alphabetical elements.
              </p>
              <p className="explanation-text">
                There are many sorting algorithms, but some are better than
                others.
              </p>
            </div>
            <MediaQuery minWidth={601}>
              <CurveSort />
            </MediaQuery>
            <MediaQuery maxWidth={600}>
              <div className='curve-small'>
                <CurveSort/>
              </div>
            </MediaQuery>
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
        <MediaQuery minWidth={601}>
              <CurvePath />
            </MediaQuery>
            <MediaQuery maxWidth={600}>
              <div className='curve-small'>
                <CurvePath/>
              </div>
            </MediaQuery>
        </div>
      </div>
    </div>
  );
}
