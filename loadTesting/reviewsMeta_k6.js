import http from "k6/http";

export let options = {
  // vus: 5,
  duration: "30s",
  rps: 100
};

export default function() {
  const product = Math.floor(Math.random() * 1000000);
  http.get(`http://localhost:8080/reviews/${product}/meta`);
};
