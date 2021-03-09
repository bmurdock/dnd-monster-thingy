const searchForm = document.getElementById('searchForm');
const query = document.getElementById('query');
const monsterDisplay = document.getElementById('monsterDisplay');

// create our own monster block element
const statLine = (title, value) =>
{
    const line = document.createElement('div');
    const titleSpan = document.createElement('span');
    titleSpan.classList = 'statTitle';
    titleSpan.textContent = title;

    const stat = document.createElement('span');
    stat.textContent = value;

    line.appendChild(titleSpan);
    line.appendChild(stat);

    return line;
}

const attributeBlock = (stats) =>
{
    // I expect stats to be an object with keys = to attr names
    const container = document.createElement('div');
    container.classList = 'attributeBlock';
    
    const keys = Object.keys(stats);

    keys.forEach((key) =>
    {
        const attrBlock = document.createElement('div');
        const attrTitle = document.createElement('h3');
        attrTitle.classList = 'attrTitle';
        attrTitle.textContent = key.substring(0, 3).toUpperCase();

        const attrValue = document.createElement('div');
        attrValue.textContent = stats[key];
        
        attrBlock.appendChild(attrTitle);
        attrBlock.appendChild(attrValue);
        container.appendChild(attrBlock);
    });

    return container;

}

const createMonsterBlock = (data) =>
{
    // the main holder div
    const holder = document.createElement('div');
    holder.classList = 'holder';

    const name = document.createElement('h2');
    name.classList = 'monsterName';
    name.textContent = data.name;

    const statBlock = document.createElement('div');
    statBlock.classList = 'statBlock';

    const armorLine = statLine('Armor Class', data.armor_class);
    const hpLine = statLine('Hit Points', `${data.hit_points} (${data.hit_dice})`);
    const speedLine = statLine('Speed', data.speed);


    statBlock.appendChild(armorLine);
    statBlock.appendChild(hpLine);
    statBlock.appendChild(speedLine);

    const {strength, dexterity, constitution, intelligence, wisdom, charisma } = data;
    const attrBlock = attributeBlock({
        strength,
        dexterity,
        constitution,
        intelligence,
        wisdom,
        charisma,
    });

    holder.appendChild(name);
    holder.appendChild(statBlock);
    holder.appendChild(attrBlock);

    return holder;

}




const search = (e) =>
{
    e.preventDefault();
    const searchError = document.getElementById('searchError');
    // clear the error message each time we search
    searchError.textContent = '';

    const baseRoute = `https://www.dnd5eapi.co/api/monsters`;
    // split the query into an array of words, and immediately
    // rejoin those words with dashes...or something...
    const term = query.value.split(' ').join('-');
    const fetchRoute = `${baseRoute}/${term}`;

    console.log('We are going to request: ', fetchRoute);

    fetch(fetchRoute)
    .then((response) =>
    {
        if (response.status === 200)
        {
            return response.json();
        }
        else
        {
            console.log('response: ', response);
            console.log('we will handle this later');
('searchError');
            searchError.textContent = 'Error searching...';
        }
    })
    .then((data) =>
    {
        // what do you do with it?
        console.log('data: ', data);
        monsterDisplay.appendChild(createMonsterBlock(data));
    })
    .catch((err) =>
    {
        console.log('Could not fetch: ', err);
    })
}

// when the search submits
searchForm.addEventListener('submit', search);