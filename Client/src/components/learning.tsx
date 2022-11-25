import '../css/learning.css';
import theNut from '../assets/learning/nut.png';
import treePic from '../assets/learning/tree.png';
import grassPic from '../assets/learning/grass.png';
import tallGrassPic from '../assets/learning/tall_grass.png';
// import squirrel from '../assets/learning/squirrel.png';

export default function LearningPage () {



  return (
    <>
    <div className='initial-view'>
      <div className='initial-view-text'>
        <p>Welcome to the amazing learning experience.</p>
        <p>There is going to be some more text here very soon.</p>
        <p>For now, just scroll.</p>
      </div>
    </div>
    <div className='all-algs'>
      <div className='path-finding-algs'>
        <h3>PATH FINDING ALGORITHMS</h3>
        <div className='curve-1'>
          <svg viewBox='-10 4 150 24'>
            {/* L - line, Q - curve */}
            <path d='
              M -10, 15
              L 15, 15
            '/>
            <path d='
              M 15, 15
              Q 20, 15
                20, 20
            '/>

            <path d='
              M 20, 20
              L 20, 25
            '/>

            <path d='
              M 20, 25
              Q 20, 30
                25, 30
            '/>

            <path d='
              M 25, 30
              L 35, 30
            '/>

            <path d='
              M 35, 30
              Q 40, 30
                40, 25
            '/>

            <path d='
              M 40, 25
              L 40, 10
            '/>

            <path d='
              M 40, 10
              Q 40, 5
                45, 5
            '/>

            <path d='
              M 45, 5
              L 60, 5
            '/>

            <path d='
              M 60, 5

              Q 65, 5
                65, 10
            '/>

            <path d='
              M 65, 10
              L 65, 15
            '/>

            <path d='
              M 65, 15
              Q 65, 20
                70, 20
            '/>

            <path d='
              M 70, 20
              L 140, 20
            '/>

            <circle className='circles' cx="13.2" cy="14.6" r="3" />
            {/* +3.2, + 2.6 */}
            <image className='nuts' onClick={(() => alert('Are you nuts??'))} x="10" y="12" href={theNut} height='6' width='6' />

            <circle className='circles' cx="20.2" cy="21.6" r="3" />
            <image className='nuts' onClick={(() => alert('Are you nuts??'))} x="17" y="19" href={theNut} height='6' width='6' />

            <circle className='circles' cx="30.2" cy="29.6" r="3" />
            <image className='nuts' onClick={(() => alert('Are you nuts??'))} x="27" y="27" href={theNut} height='6' width='6' />

            <circle className='circles' cx="40.2" cy="17.6" r="3" />
            <image className='nuts' onClick={(() => alert('Are you nuts??'))} x="37" y="15" href={theNut} height='6' width='6' />

            <circle className='circles' cx="53.2" cy="4.6" r="3" />
            <image className='nuts' onClick={(() => alert('Are you nuts??'))} x="50" y="2" href={theNut} height='6' width='6' />

            <circle className='circles' cx="65.2" cy="12.6" r="3" />
            <image className='nuts' onClick={(() => alert('Are you nuts??'))} x="62" y="10" href={theNut} height='6' width='6' />

            <circle className='circles' cx="77.2" cy="19.6" r="3" />
            <image className='nuts' onClick={(() => alert('Are you nuts??'))} x="74" y="17" href={theNut} height='6' width='6' />

            <image className='decorations' x="-2" y="20" href={treePic} height='15' width='15' />
            <image className='decorations' x="90" y="0" href={treePic} height='15' width='15' />

            <image className='decorations' x="-2" y="9" href={tallGrassPic} height='5' width='5' />
            <image className='decorations' x="-7" y="35" href={tallGrassPic} height='5' width='5' />
            <image className='decorations' x="33" y="3" href={tallGrassPic} height='5' width='5' />

            <image className='decorations' x="-2" y="36" href={grassPic} height='4' width='4' />
            <image className='decorations' x="55" y="25" href={grassPic} height='5' width='5' />
          </svg>
        </div>
      </div>
    </div>
    </>
  );
}
