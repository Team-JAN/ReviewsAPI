import http from "k6/http";
import { sleep } from "k6";

// const products = ['2', '11', '101', '1001', '10001', '100001', '1000001'];
const servers = ['13.58.176.208:5000', '13.59.130.62:5000', '18.188.132.96:5000'];

export let options = {
  vus: 100,
  duration: "30s",
  rps: 1000
};

export default function() {
  const product = Math.floor(Math.random() * 1000000 + 1);

  //through ELB
  http.get(`http://sdcLB-1824053846.us-east-2.elb.amazonaws.com:80/reviews/${product}/list`);

  //through single server
  // http.get(`http://18.188.132.96:5000/reviews/${product}/list`);

  //thru random server
  // const server = servers[Math.floor(Math.random() * 3)];
  // http.get(`http://${server}/reviews/${product}/list`);
  // sleep(1);
};
