var roleRepairer = {

    /** @param {Creep} creep **/
    run: function(creep) {

	    if(creep.memory.repairing && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.repairing = false;
            creep.say('🔄 harvest');
	    }
	    if(!creep.memory.repairing && creep.store.getFreeCapacity() == 0) {
	        creep.memory.repairing = true;
	        creep.say('🚧 repair');
	    }
		

		// console.log(Object.keys(targets[0]))
		// console.log(targets[0].structureType)

		// var roads = targets.filter((target) => target.structureType == 'road');
		// // console.log(roads)

		// console.log(roads[0].ticksToDecay)


	    if(creep.memory.repairing) {
			var targets = creep.room.find(FIND_STRUCTURES);
			targets = targets.filter((target) =>target.hits < target.hitsMax)//(target.hitsMax/2));
			targets_below_1M = targets.filter((target) => target.hits < 1000000)
			
			if(targets_below_1M.length > 0){
				targets = targets_below_1M
			}

			//pegar o menor target.hits - target.hitsMax
			// console.log(targets)
            if(targets.length) {
                if(creep.repair(targets[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ff0000'}});
                }
            }
	    }
	    else {
	        var sources = creep.room.find(FIND_SOURCES);
            if(creep.harvest(sources[1]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[1], {visualizePathStyle: {stroke: '#00ff00'}});
            }
	    }
	}
};

module.exports = roleRepairer;