import axios from 'axios';

export async function getHabitableExoplanets() {
  try {
    // Consulta de exoplanetas en zona habitable y con radios similares a la Tierra
    const res = await axios.get('https://exoplanetarchive.ipac.caltech.edu/TAP/sync?query=select+pl_name,hostname,pl_orbper,pl_rade,pl_eqt,pl_bmasse,st_dist,st_teff,st_rad,st_mass,pl_orbsmax,pl_orbeccen,pl_insol,pl_tranflag,pl_habitable+from+ps+where+pl_habitable=1&format=json');
    return res.data;
  } catch (error) {
    console.error('Error obteniendo exoplanetas habitables:', error);
    return null;
  }
} 