const apiBase = 'https://api.spacexdata.com/v3';

export const fetchLandingPads = () => {
  return fetch(`${apiBase}/landpads`).then(response => response.json());
};

export const fetchLandingPad = id => {
  return fetch(`${apiBase}/landpads/${id}`).then(response => response.json());
};
