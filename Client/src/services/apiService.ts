import { store } from "../features/store";

const BASE_URL = 'http://localhost:3000'; //TODO Add to .env

type ApiService = {
  profile: Function,
  updateUsername: Function,
  createMaze:Function,
  updateSortLearning:Function,
  updatePathLearning:Function
}
const apiService: any = {};

apiService.profile = function (accessToken:any,user:any) {
  return fetch(`${BASE_URL}/profile`, {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`
    },
    body: JSON.stringify(user), 
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
};

apiService.updateUsername = function (accessToken:any,user:any) { //TODO solve type -> in redux userSlice
  return fetch(`${BASE_URL}/updateUsername`, {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`
    },
    body: JSON.stringify(user), 
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
}

apiService.createMaze = function () { 
  console.log('apiService roomId:', store.getState().game.roomId);
  return fetch(`${BASE_URL}/createMaze`, {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({roomId: store.getState().game.roomId}), 
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
}

apiService.updateSortLearning = function(accessToken:any,user:any){
  return fetch(`${BASE_URL}/updateSortingPath`, {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`
    },
    body: JSON.stringify(user), 
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));

}

apiService.updatePathLearning = function(accessToken:any,user:any){
  return fetch(`${BASE_URL}/updatePathLearning`, {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`
    },
    body: JSON.stringify(user), 
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));

}

export default apiService;