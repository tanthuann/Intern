import axios from 'axios';

export function callAPI(startPhoto = 0, link) {
  let data;
  axios.get(link).then(res => {
    data = res.data;
  });
  return data;
}
