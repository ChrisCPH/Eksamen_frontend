const URL = "http://localhost:8080/eksamen_backend_war_exploded";

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

    const getUserRoles = () => {
        const token = getToken()
        if (token != null) {
            const payloadBase64 = getToken().split('.')[1]
            const decodedClaims = JSON.parse(window.atob(payloadBase64))
            const roles = decodedClaims.roles
            return roles
        } else return ""
    }

    const hasUserAccess = (neededRole, loggedIn) => {
        const roles = getUserRoles().split(',')
        return loggedIn && roles.includes(neededRole)
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

    function getProjects() {
        return fetchURL(URL+"/api/project/getall")
    }

    function getProjectInvoice(projectName) {
        return fetchURL(URL+"/api/project_hour/get/" + projectName)
    }

    const createProject = (name, description) => {
        const options = makeOptions("POST", false, {description: description, name: name});
        return fetchURL(URL+"/api/project/create", options)
    }

    function getDevelopers() {
        return fetchURL(URL+"/api/developer/getall")
    }
    
    const assignDeveloper = (hoursSpent, userStory, description, developerId, projectId) => {
        const options = makeOptions("POST", false, {hoursSpent: hoursSpent, userStory: userStory, description: description});
        return fetchURL(URL+"/api/project_hour/assign/" + developerId + "/" + projectId, options)
    }

    const updateHours = (hoursSpent, userStory, description, developerId, projectId, id) => {
        const options = makeOptions("PUT", false, {hoursSpent: hoursSpent, userStory: userStory, description: description});
        return fetchURL(URL+"/api/project_hour/update/"  + id + "/" + developerId + "/" + projectId, options)
    }

    function getAllDevProjects (developerName) {
        return fetchURL(URL+"/api/project_hour/getdev/" + developerName)
    }

    function getSpecificDevProject(developerName, projectName) {
        return fetchURL(URL+"/api/project_hour/getdev/" + developerName + "/" + projectName)
    }

    function deleteProjectHour(projectHourId) {
        const options = makeOptions("DELETE", false);
        return fetchURL(URL+"/api/project_hour/delete/" + projectHourId, options)
    }

    return {
        makeOptions,
        setToken,
        getToken,
        loggedIn,
        login,
        logout,
        fetchData,
        getUserRoles,
        hasUserAccess,
        getProjects,
        getProjectInvoice,
        createProject,
        getDevelopers,
        assignDeveloper,
        updateHours,
        getAllDevProjects,
        getSpecificDevProject,
        deleteProjectHour
    }
}

const facade = apiFacade();
export default facade;