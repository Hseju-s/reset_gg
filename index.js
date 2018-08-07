const huntingZone = [713],
	template = [81342,81341],
	resetZone = [9714];
	
module.exports = function TuturuGG(dispatch) {
	let finished,
		boxId = 0;

	const alert = (msg) => {
	 	dispatch.toClient('S_DUNGEON_EVENT_MESSAGE', 1, {
            unk1: 2,
            unk2: 0,
            unk3: 0,
            message: msg
        });
	};

    dispatch.hook('S_LOGIN', 'raw', event => {
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
