//helper function for fetch
function getJSON(url) {
    return fetch(url)
        .then(function(response) {
            if (!response.ok) {
                throw Error(response.statusText);
            }else {
                return response.json();
            }
        })
        .catch(function(error){
            console.log(error);
        });
}

//This was taken directly from the instructors example to account for growth of the code
function getShips(url) {
    return getJSON(url);
}

function renderShipList(ships, shipListElement) {
    //I liked the idea of using a table instead of a list to disply the ships better.
    const list = shipListElement.children[1];
    list.innerHTML = '';
    //sets loop to display ships
    ships.forEach(function(ship){
        let listItem = document.createElement('tr');
        listItem.innerHTML = ' <td><a href = "${ship.url}">${ship.name}</a></td> <td>${ship.length}</td> <td>${ship.crew}</td>';

        listItem.addEventListener('click', function(event){
            event.preventDefault();
            getShipDetails(ship.url);
        });

        list.appendChild(listItem);
    });
}

function renderShipDetails(shipData){
    console.log(shipData);
}

function showShips(url = 'https://swapi.co/api/starships/') {
    getShips(url).then(function(data){
        console.log(data);
        const results = data.results;

        const shipListElement = document.getElementById('shiplist');
        renderShipList(results, shipListElement);

        if (data.next) {
            const next = document.getElementById('next');
            next.ontouchend = () => {
                showShips(data.next);
            };
        }

        if (data.previous) {
            const prev = document.getElementById('prev');
            prev.ontouchend = () => {
                showShips(data.previous);
            };
        }
    });
}

function getShipDetails(url) {
    getShips(url).then(function(data){
        renderShipDetails(data);
    });
}
showShips();