import axios from 'axios';
const apiUrl = `https://api.rawg.io/api/games?key=${process.env.REACT_APP_API_KEY}`
const LookupService = {
    getData: function() {
        const response = axios(`${apiUrl}&page=1&page_size=20`);
        return response
    },
    getGenre: function(genre) {
        const response = axios(`${apiUrl}&page=1&page_size=20&genres=${genre}`);
        return response
    },
}
export default LookupService;