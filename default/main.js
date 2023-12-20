var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleRepairer = require('role.repairer');

module.exports.loop = function () {

    function population_control(Game, creeps, limit, role, parts){
        
        if(creeps.length < limit) {
            var newName = role + Game.time;
            // console.log('Spawning new '+role+': ' + newName);
            Game.spawns['MyFirstSpawn'].spawnCreep(parts, newName, 
                {memory: {role: role}});
        }
    
        if(creeps.length > limit){
            for(i = 0; i < creeps.length - limit; i++){
                creeps[i].suicide()
            }
        }
        
        // console.log(role + ': ' + creeps.length);
    }

    for(var name in Memory.creeps) {
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory:', name);
        }
    }

    var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
    var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
    var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
    var repairers = _.filter(Game.creeps, (creep) => creep.memory.role == 'repairer');

    var harversters_limit = 4
    var builders_limit = 0
    var repairers_limit = 5
    var upgraders_limit = 10

    console.log('harvester:\t' + harvesters.length + '/' + harversters_limit);
    console.log('builder:\t' + builders.length + '/' + builders_limit);
    console.log('repairer:\t' + repairers.length + '/' + repairers_limit);
    console.log('upgrader:\t' + upgraders.length + '/' + upgraders_limit);

    if(harvesters.length == 0){
        population_control(Game, harvesters, harversters_limit, 'harvester', [WORK,CARRY,MOVE])
    }else if(harvesters.length != harversters_limit && harvesters.length > 3){
        population_control(Game, harvesters, harversters_limit, 'harvester', [WORK,WORK,CARRY,MOVE,CARRY,MOVE,CARRY,CARRY,MOVE])
    }else if(harvesters.length != harversters_limit){
        population_control(Game, harvesters, harversters_limit, 'harvester', [WORK,CARRY,MOVE,CARRY,MOVE])
    }else if(builders.length != builders_limit || repairers.length != repairers_limit){
        population_control(Game, builders, builders_limit, 'builder', [WORK,CARRY,MOVE,CARRY,MOVE,MOVE,MOVE])
        population_control(Game, repairers, repairers_limit, 'repairer', [WORK,WORK,CARRY,MOVE,CARRY,MOVE,CARRY,CARRY,MOVE])
    }else{
        population_control(Game, upgraders, upgraders_limit, 'upgrader', [WORK,CARRY,WORK,CARRY,MOVE,MOVE])
    }

    if(Game.spawns['MyFirstSpawn'].spawning) { 
        var spawningCreep = Game.creeps[Game.spawns['MyFirstSpawn'].spawning.name];
        Game.spawns['MyFirstSpawn'].room.visual.text(
            '🛠️' + spawningCreep.memory.role,
            Game.spawns['MyFirstSpawn'].pos.x + 1, 
            Game.spawns['MyFirstSpawn'].pos.y, 
            {align: 'left', opacity: 0.8});
    }

    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        if(creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
        }
        if(creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
        }
        if(creep.memory.role == 'builder') {
            roleBuilder.run(creep);
        }
        if(creep.memory.role == 'repairer') {
            roleRepairer.run(creep);
        }
    }

    for(var name in Game.rooms) {
        console.log('Room "'+name+'" has '+Game.rooms[name].energyAvailable+' energy');
    }
}