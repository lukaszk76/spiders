//import of level data (spiders and lines between)
import level1DataJSON from '../levels/level1.json';
import level2DataJSON from '../levels/level2.json';
import level3DataJSON from '../levels/level3.json';
import level4DataJSON from '../levels/level4.json';
import level5DataJSON from '../levels/level5.json';
import level6DataJSON from '../levels/level6.json';
import level7DataJSON from '../levels/level7.json';
import level8DataJSON from '../levels/level8.json';
import level9DataJSON from '../levels/level9.json';
import level10DataJSON from '../levels/level10.json';
import level11DataJSON from '../levels/level11.json';
import level12DataJSON from '../levels/level12.json';
import level13DataJSON from '../levels/level13.json';


// loads spiders and lines from JSON file for the current level (level defined in state)
const loadLevelData = (level) => {
    
    let levelDataJSON = level6DataJSON;
    switch(level) {
        case 1: {
            levelDataJSON = level1DataJSON;
            break;
        }
        case 2: {
            levelDataJSON = level2DataJSON;
            break;
        }
        case 3: {
            levelDataJSON = level3DataJSON;
            break;
        }
        case 4: {
            levelDataJSON = level4DataJSON;
            break;
        }
        case 5: {
            levelDataJSON = level5DataJSON;
            break;
        }
        case 6: {
            levelDataJSON = level6DataJSON;
            break;
        }
        case 7: {
            levelDataJSON = level7DataJSON;
            break;
        }
        case 8: {
            levelDataJSON = level8DataJSON;
            break;
        }
        case 9: {
            levelDataJSON = level9DataJSON;
            break;
        }
        case 10: {
            levelDataJSON = level10DataJSON;
            break;
        }
        case 11: {
            levelDataJSON = level11DataJSON;
            break;
        }
        case 12: {
            levelDataJSON = level12DataJSON;
            break;
        }
        case 13: {
            levelDataJSON = level13DataJSON;
            break;
        }
    }

    const levelData = JSON.parse(JSON.stringify(levelDataJSON));    //parse JSON -> Object
    return levelData;
}

  export default loadLevelData;