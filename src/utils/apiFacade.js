const URL = "https://www.christoffermikkelsen.dk/tomcat/CA2_backend";

function handleHttpErrors(res) {
    if (!res.ok) {
        return Promise.reject({status: res.status, fullError: res.json()})
    }
    return res.json();
} 

function apiFacade() {

    const setToken = (token) => {
        localStorage.setItem('jwtToken', token)
    }

    const getToken = () => {
        return localStorage.getItem('jwtToken')
    }

    const loggedIn = () => {
        return getToken() != null;
    }

    const logout = () => {
        localStorage.removeItem("jwtToken");
    }

    const login = (user, password) => {
        const options = makeOptions("POST", true, {username: user, password: password});
        return fetch(URL + "/api/login", options)
            .then(handleHttpErrors)
            .then(res => {
                setToken(res.token)
            })
    }

    const fetchData = () => {
        const options = makeOptions("GET", true);
        return fetch(URL + "/api/info/user", options).then(handleHttpErrors);
    }

    function makeOptions(method, addToken, body) {
        method = method ? method : 'GET';
        const opts = {
            method: method,
            headers: {
                ...(['PUT', 'POST'].includes(method) && {
                    "Content-type": "application/json"
                }),
                "Accept": "application/json"
            }
        }
        if (addToken && loggedIn()) {
            opts.headers["x-access-token"] = getToken();
        }
        if (body) {
            opts.body = JSON.stringify(body);
        }
        return opts;
    }

    function fetchURL(URL, data) {
        return fetch(URL, data)
          .then((response) => response.json())
          .then((data) => {return data})
      }

    function getFacts() {
        return fetchURL(URL+"/api/facts")
      }
    
    function getCatFacts() {
        return fetchURL(URL+"/api/facts/cat")
    }

    function getDogFacts() {
        return fetchURL(URL+"/api/facts/dog")
    }

    return {
        makeOptions,
        setToken,
        getToken,
        loggedIn,
        login,
        logout,
        fetchData,
        getFacts,
        getCatFacts,
        getDogFacts
    }
}

const facade = apiFacade();
export default facade;