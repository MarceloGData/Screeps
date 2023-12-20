var useful = require('useful');

var roleHarvester = {

    /** @param {Creep} creep **/
    run: function(creep) {
	    if(creep.store.getFreeCapacity() > 0) {
            var sources = creep.room.find(FIND_SOURCES);

            var nearest_source = useful.choose_nearest(creep, sources)

            if(creep.harvest(nearest_source) == ERR_NOT_IN_RANGE) {
                creep.moveTo(nearest_source, {visualizePathStyle: {stroke: '#00ff00'}});
            }
        }
        else {
            var targets = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_EXTENSION ||
                                structure.structureType == STRUCTURE_SPAWN ||
                                structure.structureType == STRUCTURE_TOWER) && 
                                structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
                    }
            });
            if(targets.length > 0) {
                
                var nearest_target = useful.choose_nearest(creep, targets)

                if(creep.transfer(nearest_target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(nearest_target, {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }
            else{
                // console.log('indo pra Harvesters Rest')
                var target;
                if(!(Game.flags.HarvestersRest === undefined)){
                    target = Game.flags.HarvestersRest;
                }else{
                    target = creep.room.find(FIND_STRUCTURES, {
                        filter: (structure) => {return (structure.structureType == STRUCTURE_SPAWN)}
                    })
                }
                creep.moveTo(target[0]);
            }
        }
	}
};

module.exports = roleHarvester;