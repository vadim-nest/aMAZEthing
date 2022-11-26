const BASE_URL = 'http://localhost:3000'; //TODO Add to .env

type ApiService = {
  profile: Function,
  updateProfile: Function,
}
const apiService: any = {};

apiService.profile = function () {
  return fetch(`${BASE_URL}/profile`, {
    method: 'GET',
    credentials: 'include',
    headers: { "Access-Control-Allow-Origin": '*', 'Content-Type': 'application/json' }
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
};

apiService.updateProfile = function (user:any) { //TODO solve type ->in redux userSlice
  return fetch(`${BASE_URL}/updateProfile`, {
    method: 'POST',
    credentials: 'include',
    headers: { "Access-Control-Allow-Origin": '*','Content-Type': 'application/json' },
    body: JSON.stringify(user),
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
}


export default apiService;