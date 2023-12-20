var roleBuilder = {

    /** @param {Creep} creep **/
    run: function(creep) {

	    if(creep.memory.building && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.building = false;
            creep.say('🔄 harvest');
	    }
	    if(!creep.memory.building && creep.store.getFreeCapacity() == 0) {
	        creep.memory.building = true;
	        creep.say('🚧 build');
	    }

	    if(creep.memory.building) {
	        var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
			
            if(targets.length) {
				var nearest_target = useful.choose_nearest(creep, targets)

                if(creep.build(nearest_target) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(nearest_target, {visualizePathStyle: {stroke: '#ff0000'}});
                }
            }
	    }
	    else {
	        var sources = creep.room.find(FIND_SOURCES);
			
			var nearest_source = useful.choose_nearest(creep, sources)

            if(creep.harvest(nearest_source) == ERR_NOT_IN_RANGE) {
                creep.moveTo(nearest_source, {visualizePathStyle: {stroke: '#00ff00'}});
            }
	    }
	}
};

module.exports = roleBuilder;