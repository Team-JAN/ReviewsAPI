import http from "k6/http";
import { sleep } from "k6";

// const products = ['2', '11', '101', '1001', '10001', '100001', '1000001'];

export let options = {
  // vus: 5,
  duration: "30s",
  rps: 100
};

export default function() {
  // const product = products[Math.floor(Math.random() * 7)];
  const product = Math.floor(Math.random() * 1000000);
  // const product = 12345;
  http.get(`http://sdcLB-1824053846.us-east-2.elb.amazonaws.com:80/reviews/${product}/list`);
  // sleep(1);
};
