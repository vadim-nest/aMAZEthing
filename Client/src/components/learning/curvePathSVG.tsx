import '../../css/curvePathSVG.css';
import { useNavigate } from 'react-router-dom';
import treePic from '../../assets/learning/tree.png';
import grassPic from '../../assets/learning/grass.png';
import tallGrassPic from '../../assets/learning/tall_grass.png';
import NutSVG from './learningNut';

function CurvePath() {
  const navigate = useNavigate();
  return (
    <div className="curve">
      <svg viewBox="-10 4 140 24">
        {/* L - line, Q - curve */}
        <path
          className="learning-path"
          d="
              M -10, 15
              L 15, 15
            "
        />
        <path
          className="learning-path"
          d="
              M 15, 15
              Q 20, 15
                20, 10
            "
        />
        <path
          className="learning-path"
          d="
              M 20, 10
              L 20, 5
            "
        />
        <path
          className="learning-path"
          d="
              M 20, 5
              Q 20, 0
                25, 0
            "
        />
        <path
          className="learning-path"
          d="
              M 25, 0
              L 40, 0
            "
        />
        <path
          className="learning-path"
          d="
              M 40, 0
              Q 45, 0
                45, 5
            "
        />
        <path
          className="learning-path"
          d="
              M 45, 5
              Q 45, 10
                50, 10
            "
        />
        <path
          className="learning-path"
          d="
              M 50, 10
              L 60, 10
            "
        />
        <path
          className="learning-path"
          d="
              M 60, 10
              Q 65, 10
                65, 15
            "
        />
        <path
          className="learning-path"
          d="
              M 65, 15
              Q 65, 20
                70, 20
            "
        />
        <path
          className="learning-path"
          d="
              M 70, 20
              L 90, 20
            "
        />
        <path
          className="learning-path"
          d="
              M 90, 20
              Q 95, 20
                95, 15
            "
        />
        <path
          className="learning-path"
          d="
              M 95, 15
              L 95, 10
            "
        />
        <path
          className="learning-path"
          d="
              M 95, 10
              Q 95, 5
                100, 5
            "
        />
        <path
          className="learning-path"
          d="
              M 100, 5
              L 130, 5
            "
        />
        <circle
          className="circles"
          id="circle-bubble-sort"
          onClick={() => navigate('/learning/BFS')}
          cx="10"
          cy="14.6"
          r="3"
        />
        <svg className="nut" x="7.75" y="12.25">
          <NutSVG />
        </svg>{' '}
        <text x="8" y="10" className="lesson-name">
          BFS
        </text>
        <circle
          className="circles"
          onClick={() => navigate('/learning/DFS')}
          cx="40"
          cy="0"
          r="3"
        />
        <svg className="nut" x="37.75" y="-2.25">
          <NutSVG />
        </svg>{' '}
        <text x="38" y="-5" className="lesson-name">
          DFS
        </text>
        <circle
          className="circles"
          onClick={() => navigate('/learning/Dijkstra')}
          cx="65.2"
          cy="12.6"
          r="3"
        />
        <svg className="nut" x="63" y="10.5">
          <NutSVG />
        </svg>{' '}
        <text x="62" y="8" className="lesson-name">
          Dijkstra
        </text>
        <circle
          className="circles"
          onClick={() => navigate('/learning/AStar')}
          cx="102"
          cy="6"
          r="3"
        />
        <svg className="nut" x="99.75" y="3.75">
          <NutSVG />
        </svg>
        <text x="101" y="0" className="lesson-name">
          A*
        </text>
        {/* <image className='decorations' x="-2" y="20" href={treePic} height='15' width='15' />
            <image className='decorations' x="90" y="0" href={treePic} height='15' width='15' />

            <image className='decorations' x="-2" y="9" href={tallGrassPic} height='5' width='5' />
            <image className='decorations' x="-7" y="35" href={tallGrassPic} height='5' width='5' />
            <image className='decorations' x="33" y="3" href={tallGrassPic} height='5' width='5' />

            <image className='decorations' x="-2" y="36" href={grassPic} height='4' width='4' />
            <image className='decorations' x="55" y="25" href={grassPic} height='5' width='5' /> */}
      </svg>
    </div>
  );
}

export default CurvePath;
