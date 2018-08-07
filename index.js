const huntingZone = [713],
	template = [81342,81341],
	resetZone = [9714];
	
module.exports = function TuturuGG(dispatch) {
	let finished,
		boxId = 0;

	const alert = (msg) => {
		dispatch.toClient('S_DUNGEON_EVENT_MESSAGE', 2, {
        	type: 2, //31
        	chat: 0,
        	channel: 27,
            message: msg
        });
	};

	dispatch.game.on('enter_game', () => {
		finished = false;
    });

    dispatch.hook('S_LOAD_TOPO', 3, event => {
    	if(finished && resetZone.includes(event.zone)) {
			dispatch.toServer('C_RESET_ALL_DUNGEON',1,{}),
			finished = false,
			setTimeout(() => {alert('Reseted Ghiliglade')}, 3000);
		}
    });

	dispatch.hook('S_SPAWN_NPC',7,(event) => { 
		if(huntingZone.includes(event.huntingZoneId) && template.includes(event.templateId)) boxId = event.gameId;
	});

	dispatch.hook('S_DESPAWN_NPC',3,(event) => { 
		if(JSON.stringify(event.gameId) === JSON.stringify(boxId)) finished = true;
	});
}
