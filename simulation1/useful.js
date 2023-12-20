function choose_nearest(creep, locations){
    if(locations.length == 0){
        return null
    }

    var min_distance = 9999999
    var min_i = -1

    for (let i = 0; i < locations.length; i++){
        let path = creep.pos.findPathTo(locations[i])

        if(path.length < min_distance){
            min_distance = path.length
            min_i = i
        }
    }

    return locations[min_i]
}

module.exports = {choose_nearest}