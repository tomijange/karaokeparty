let origin = window.location.origin;

if (origin !== 'http://localhost:8080') {
  origin = `${origin}/`
} else {
  origin = 'http://localhost:3000/';
}

console.log(`%cbackend url: ${origin}`, 'color: red;');

export const API_URL = `${origin}api`
export { origin as BACKEND_URL }