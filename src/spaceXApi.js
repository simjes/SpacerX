const apiBase = 'https://api.spacexdata.com/v3';

export const fetchLandingPads = () => {
  return fetch(`${apiBase}/landpads`).then(response => response.json());
};

export const fetchNextLaunch = () => {
  return fetch(`${apiBase}/launches/next`).then(response => response.json());
};

export const fetchLaunchPads = () => {
  return fetch(`${apiBase}/launchpads`).then(response => response.json());
};
