/**************************************************************************
 *
 *  This file is part of the UGE(Uniform Game Engine).
 *  Copyright (C) by SanPolo Co.Ltd. 
 *  All rights reserved.
 *
 *  See http://uge.spolo.org/ for more information.
 *
 *  SanPolo Co.Ltd
 *  http://uge.spolo.org/  sales@spolo.org uge-support@spolo.org
 *
**************************************************************************/

try {
	// 全局变量，方便调试。
	var CONSOLE = Registry.Get("iConsole");
	
	// 加载Object Layout库，这是UGE的核心库。
	require("objlayout.js");
	require("meshgen.js")
	
	// 初始化object layout中各个对象。
	load("/camera.js");
	load("/player.js");
	load("/effect.js");
	
	Event.Send("application.open", true);
	camera = Entities.CreateEntity(CAMERA);
	player = Entities.CreateEntity(PLAYER);
	
	var actor = camera.pcarray['pcactormove'].QueryInterface("iPcActorMove");
	
	var id = C3D.engine.SubscribeFrame(function(){
		if(!actor.IsMoving())
		{
			camera.pcarray['pcmesh'].PerformAction('SetAnimation',['animation','stand'],['cycle',true],['reset', false]);
			return;
		} else {
			if (actor.IsMovingForward())
			{
				camera.pcarray['pcmesh'].PerformAction('SetAnimation',['animation','run'],['cycle',true],['reset', false]);
			} else if (actor.IsMovingBackward()) {
				camera.pcarray['pcmesh'].PerformAction('SetAnimation',['animation','walk'],['cycle',true],['reset', false]);
			}
		}
	});
	var count = Event.InstallHelper('3d','frame');
	
	MeshGen.SetMeshGenerate(player.pcarray['pcactormove'], player.pcarray['pcmesh'], 5);
	MeshGen.SetMeshGenerate(camera.pcarray['pcactormove'], camera.pcarray['pcmesh'], 5);
	
}catch(e){
	alert('error:',e);
}