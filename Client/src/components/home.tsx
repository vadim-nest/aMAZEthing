import P1Home from "./svg/p1Home";
import P2Home from "./svg/p2Home";
import '../css/home.css';

function home({ xPos, yPos, boxSize, player }: { xPos: number, yPos: number, boxSize: number, player: 'p1' | 'p2' }) {
  return (
    <div style={{width: `${boxSize*3}px`, top: `${yPos*boxSize}px`, left: `${(xPos)*boxSize}px`}} className='home'>
      {player === 'p1' ? <P1Home/> : <P2Home/>}
    </div>
  )
}

export default home;