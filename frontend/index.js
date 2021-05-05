function httpService(method, data, endpoint) {
    console.log(endpoint);
    return new Promise((resolve, reject) => {
        if (method == "GET") {
            fetch(`http://localhost:3000/${ endpoint }`, { // REST Endpoint
                method,
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            }).then(serverData => serverData.json().then(response => resolve(response)).catch(err => reject(err)))
        } else {
            fetch(`http://localhost:3000/${ endpoint }`, { // REST Endpoint
                method,
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            }).then(serverData => serverData.json().then(response => resolve(response)).catch(err => reject(err)))
        }
    }).then(response => response)
    .catch(err => {
        throw new Error(err)
    })
}