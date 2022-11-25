import '../css/learning.css';
import theNut from '../assets/learning/Ellipse_6.png';

export default function LearningPage () {



  return (
    <>
    <div className='initial-view'>
      {/* <h1>Learning page</h1> */}
      <div className='initial-view-text'>
        <p>Welcome to the amazing learning experience.</p>
        <p>There is going to be some more text here very soon.</p>
        <p>For now, just scroll.</p>
      </div>
    </div>
    <div className='path-finding-algs'>
      <div className='curve-1'>
        <svg viewBox='-10 -1 150 24'>
          <path d='
            M -10, 15
            L 15, 15
          '/>
          {/* <circle id='theNut' cx="28" cy="1" r="2" /> */}

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

          <image className='nuts' onClick={(() => alert('Are you nuts??'))} x="10" y="12" href={theNut} height='6' width='6' />
          <image className='nuts' onClick={(() => alert('Are you nuts??'))} x="17" y="19" href={theNut} height='6' width='6' />
          <image className='nuts' onClick={(() => alert('Are you nuts??'))} x="27" y="27" href={theNut} height='6' width='6' />
          <image className='nuts' onClick={(() => alert('Are you nuts??'))} x="37" y="15" href={theNut} height='6' width='6' />
          <image className='nuts' onClick={(() => alert('Are you nuts??'))} x="50" y="2" href={theNut} height='6' width='6' />
          <image className='nuts' onClick={(() => alert('Are you nuts??'))} x="62" y="10" href={theNut} height='6' width='6' />
          <image className='nuts' onClick={(() => alert('Are you nuts??'))} x="74" y="17" href={theNut} height='6' width='6' />


        </svg>
      </div>
    </div>
    </>
  );
}
