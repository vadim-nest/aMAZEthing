import '../../css/game/mud.css';
import { useAppSelector } from '../../features/hooks';
import ObstacleSVG from '../svg/obstacleSVG';

function Mud ({xPos, yPos}: {xPos: number, yPos: number}) {
  const {boxSize} = useAppSelector(state => state.game);
  return (
    <div className="mud" style={{left: `${(xPos + 0.25) * boxSize}px`, top: `${(yPos + 0.25) * boxSize}px`, width: `${boxSize*0.5}px`, height: `${boxSize*0.5}px`}}>
      <ObstacleSVG />
    </div>
  )
}

export default Mud;