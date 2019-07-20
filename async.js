//return data in JSON format
async function getJSON(url) {
    try{
        const response = await fetch(url);
        if(!response.ok){
            throw Error(response.statusText);
        }else{
            const fetchJson = await response.json();
            return fetchJson;
        }
    }catch(error){
        console.log(error);
    }
}

//allowing for growth
function getShips(url){
    return getJSON(url);
}

//copied over from promise file
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

async function showShips(url = 'https://swapi.co/api/starships/'){
    const results = await getShips(url);

    const shipListElement = document.getElementById('shiplist');
    renderShipList(results.results, shipListElement);

    if(results.next){
        const next = document.getElementById('next');
        next.ontouchend = () => {
            showShips(data.previous);
        };
    }
}

async function getShipDetails(url) {
    const ship = await getShips(url);
    renderShipDetails(ship);
}

showShips();