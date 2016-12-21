/**************************************************************************
 *  This file is part of the UGE(Uniform Game Engine) of SPP.
 *  Copyright (C) by SanPolo Co.Ltd. 
 *  All rights reserved.
 *  See http://spp.spolo.org/ for more information.
 *
 *  SanPolo Co.Ltd
 *  http://spp.spolo.org/  sales@spolo.org spp-support@spolo.org
**************************************************************************/
try{
	(function(){
		//W键按下，前走
		Event.Subscribe(function(e) {
			var actor = e.self;
			actor.pcarray['pcactormove'].Forward(true);
			actor.pcarray['pcmesh'].SetAnimation("run", true, false);
		}, "effect.forward1");
		//W键抬起，前停
		Event.Subscribe(function(e){
			var actor = e.self;
			actor.pcarray['pcactormove'].Forward(false);
			actor.pcarray['pcmesh'].SetAnimation("stand", true, false);
		}, "effect.forward0");
		//S键按下，后走
		Event.Subscribe(function(e){
			var actor = e.self;
			actor.pcarray['pcactormove'].Backward(true);
			actor.pcarray['pcmesh'].SetAnimation("run", true, false);
		}, "effect.backward1");
		//S键抬起，后停
		Event.Subscribe(function(e){
			var actor = e.self;
			actor.pcarray['pcactormove'].Backward(false);
			actor.pcarray['pcmesh'].SetAnimation("stand", true, false);
		}, "effect.backward0");
		//A键按下，左转
		Event.Subscribe(function(e){
			var actor = e.self;
			actor.pcarray['pcactormove'].RotateLeft(true);
			actor.pcarray['pcmesh'].SetAnimation("run", true, false);
		}, "effect.rotateleft1");
		//A键抬起，转停
		Event.Subscribe(function(e){
			var actor = e.self;
			actor.pcarray['pcactormove'].RotateLeft(false);
			actor.pcarray['pcmesh'].SetAnimation("stand", true, false);
		}, "effect.rotateleft0");
		//D键按下，右转
		Event.Subscribe(function(e){
			var actor = e.self;
			actor.pcarray['pcactormove'].RotateRight(true);
			actor.pcarray['pcmesh'].SetAnimation("run", true, false);
		}, "effect.rotateright1");
		//D键抬起，转停
		Event.Subscribe(function(e){
			var actor = e.self;
			actor.pcarray['pcactormove'].RotateRight(false);
			actor.pcarray['pcmesh'].SetAnimation("stand", true, false);
		}, "effect.rotateright0");
		
		//获得当时的点的坐标
		Event.Subscribe(function(e){
			var actor = e.self;
			var pos = actor.pcarray['pcmesh'].position;
			if(actor.name == "player")
			{
				CONSOLE.Write("player   x = " + pos.x + "   y = " + pos.y + "   z = " + pos.z + ".\n");
			}else if(actor.name == "camera")
			{
				CONSOLE.Write("camera   x = " + pos.x + "   y = " + pos.y + "   z = " + pos.z + ".\n");
			}
			
		}, "effect.getpos");
		
		//开始XXXX的测试代码
		Event.Subscribe(function(e){
			//TODO  需要添加的功能方案
			camera.pcarray['pcdefaultcamera'].SetFollowEntity("player");
			// camera.pcarray['pcdefaultcamera'].SetCamera("firstperson");
		}, "effect.test");
	})();

} catch(e){
	alert(e);
}