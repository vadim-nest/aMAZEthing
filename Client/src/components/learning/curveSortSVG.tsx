import '../../css/curveSortSVG.css';
import { useNavigate } from 'react-router-dom';
import theNut from '../../assets/learning/nut.png';
import treePic from '../../assets/learning/tree.png';
import grassPic from '../../assets/learning/grass.png';
import tallGrassPic from '../../assets/learning/tall_grass.png';

function CurveSort () {
  const navigate = useNavigate();
    return (
        <div className='curve'>
          <svg viewBox='-10 4 140 24'>
            {/* L - line, Q - curve */}
            <path className='learning-path' d='
              M -10, 15
              L 15, 15
            '/>
            <path className='learning-path' d='
              M 15, 15
              Q 20, 15
                20, 20
            '/>

            <path className='learning-path' d='
              M 20, 20
              L 20, 25
            '/>

            <path className='learning-path' d='
              M 20, 25
              Q 20, 30
                25, 30
            '/>

            <path className='learning-path' d='
              M 25, 30
              L 35, 30
            '/>

            <path className='learning-path' d='
              M 35, 30
              Q 40, 30
                40, 25
            '/>

            <path className='learning-path' d='
              M 40, 25
              L 40, 10
            '/>

            <path className='learning-path' d='
              M 40, 10
              Q 40, 5
                45, 5
            '/>

            <path className='learning-path' d='
              M 45, 5
              L 60, 5
            '/>

            <path className='learning-path' d='
              M 60, 5

              Q 65, 5
                65, 10
            '/>

            <path className='learning-path' d='
              M 65, 10
              L 65, 15
            '/>

            <path className='learning-path' d='
              M 65, 15
              Q 65, 20
                70, 20
            '/>

            <path className='learning-path' d='
              M 70, 20
              L 90, 20
            '/>

            <path className='learning-path' d='
              M 90, 20
              Q 95, 20
                95, 25
            '/>

            <path className='learning-path' d='
              M 95, 25
              L 95, 30
            '/>

            <path className='learning-path' d='
              M 95, 30
              Q 95, 35
                100, 35
            '/>

            <path className='learning-path' d='
              M 100, 35
              L 130, 35
            '/>

            <circle className='circles' id='circle-bubble-sort' onClick={(() => navigate('/learning/bubbleLesson'))} cx="10" cy="14.6" r="3" />
            <image className='nuts' x="6.75" y="12" href={theNut} height='6' width='6' />
            <text x="5" y="10" className="lesson-name">Bubble sort</text>

            <circle className='circles' onClick={(() =>navigate('/learning/insertionLesson'))} cx="30.2" cy="29.6" r="3" />
            <image className='nuts'  x="27" y="27" href={theNut} height='6' width='6' />
            <text x="25" y="36" className="lesson-name">Insertion sort</text>

            <circle className='circles' onClick={(() =>navigate('/learning/selectionLesson'))} cx="43" cy="6" r="3" />
            <image className='nuts'  x="39.75" y="3.5" href={theNut} height='6' width='6' />
            <text x="37" y="1" className="lesson-name">Selection sort</text>

            <circle className='circles' onClick={(() =>navigate('/learning/mergeLesson'))} cx="65.2" cy="12.6" r="3" />
            <image className='nuts'  x="62" y="10" href={theNut} height='6' width='6' />
            <text x="53" y="18" className="lesson-name">Merge sort</text>

            <circle className='circles' onClick={(() =>navigate('/learning/heapLesson'))} cx="85" cy="20" r="3" />
            <image className='nuts'  x="81.75" y="17.5" href={theNut} height='6' width='6' />
            <text x="81" y="15" className="lesson-name">Heap sort</text>

            <circle className='circles' onClick={(() =>navigate('/learning/quickLesson'))} cx="103.25" cy="34.5" r="3" />
            <image className='nuts'  x="100" y="32" href={theNut} height='6' width='6' />
            <text x="99" y="30" className="lesson-name">Quick sort</text>

            {/* <image className='decorations' x="-2" y="20" href={treePic} height='15' width='15' />
            <image className='decorations' x="90" y="0" href={treePic} height='15' width='15' />

            <image className='decorations' x="-2" y="9" href={tallGrassPic} height='5' width='5' />
            <image className='decorations' x="-7" y="35" href={tallGrassPic} height='5' width='5' />
            <image className='decorations' x="33" y="3" href={tallGrassPic} height='5' width='5' />

            <image className='decorations' x="-2" y="36" href={grassPic} height='4' width='4' />
            <image className='decorations' x="55" y="25" href={grassPic} height='5' width='5' /> */}
          </svg>
        </div>
    )
}

export default CurveSort;