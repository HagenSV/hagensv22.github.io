const project_list = [
    "boxedup games",
    "portfolio",
    "localchat"
]

function search(input){
    const RETURN_SIZE = 5;

    input = input.toLowerCase();

    let results_map = {};
    for (let i = 0; i < project_list.length; i++){
        let dist = edit_distance(project_list[i],input)

        //Add a penalty if the string does not contain the input string
        if (project_list[i].indexOf(input) == -1){ dist += 10; }
        if (results_map[dist] === undefined){ results_map[dist] = []; }
        results_map[dist].push(project_list[i])
    }

    let results_list = []
    for (key in results_map){
        results_list = results_list.concat(results_map[key]);
        if (results_list.length > RETURN_SIZE){ break; }
    }

    return results_list.slice(0,Math.min(results_list.length,RETURN_SIZE-1));
}


function min_edit_distance(s1,s2){
    return Math.abs(s1.length-s2.length);
}

/**
 * Calculates the levenshtein distance of 2 strings using the wagner fisher approach
 * @param {string} s1 
 * @param {string} s2
 * @returns {int}
 */
function edit_distance(s1, s2){
    let l1 = s1.length
    let l2 = s2.length

    let current_row = []
    //Generates array with values 0..l1
    for (let i = 0; i < l1+1; i++){
        current_row[i] = i;
    }

    //Calculate
    for (let i = 0; i < l2+1; i++){
        let previous_row = current_row
        current_row = new Array(l1+1);
        current_row[0] = i;
        for (let j = 1; j < l1+1; j++){
            let add = previous_row[j] + 1;
            let remove = current_row[j-1] + 1;
            let change = previous_row[j-1];
            if (s1[j-1] != s2[i-1]){
                change += 1;
            }
            current_row[j] = Math.min(add,remove,change);

        }
    }

    return current_row[l1];
}