import '../css/profileGameHistory.css'
import { User } from '@auth0/auth0-react';
import { useAppSelector } from '../features/hooks';
import SVG from './svg';
import { useEffect, useState} from 'react';

export default function ProfileGameHistory() {
    const user = useAppSelector((state) => state.user);
    //Im hard coding the data
    const games =  [{amountMinions:7,
    result:"VICTORY",
    goldAmount:200,
    opponentID:"string",
    towersTaken:2,
    winner:true,
    startedAt: new Date(),
    finishedAt: new Date(),
    duration: '5:00'},
    {amountMinions:7,
        result:"VICTORY",
        goldAmount:200,
        opponentID:"string",
        towersTaken:2,
        winner:true,
        startedAt: new Date(),
        finishedAt: new Date(),
        duration: '5:00'}]

    return(
        <div className="gameDashboard">
            {games.map((element) => {
                return (
                <div className="match">
                    <div className="gameDuration">
                        <div className="result">
                            <span className='resultSpan'>
                            <b>{element.result}</b>
                            </span>
                        </div>
                        <div className="duration">
                            {element.duration} min
                        </div>
                        <div className="date">
                          
                        </div>
                    </div>
                    <div className="minionStats">
                    </div>
                    <div className="towerStats">

                    </div>
                    <div className="goldStats">

                    </div>
                </div>
                )
            })}
        </div>
    )

}