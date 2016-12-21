//this is a test.

try {

	Plugin.Load("spp.behaviourlayer.jscript");
	Event.Send("application.open",true);

	var count = Event.InstallHelper('3d','frame');
    //加载factory
	Entities.LoadPropertyClassFactory('cel.pcfactory.input.standard');
	Entities.LoadPropertyClassFactory('cel.pcfactory.camera.old');
	Entities.LoadPropertyClassFactory('cel.pcfactory.object.mesh.collisiondetection');
	Entities.LoadPropertyClassFactory('cel.pcfactory.world.zonemanager');
	Entities.LoadPropertyClassFactory('cel.pcfactory.object.mesh');
	Entities.LoadPropertyClassFactory('cel.pcfactory.move.linear');
	Entities.LoadPropertyClassFactory('cel.pcfactory.move.actor.standard'); 
	Entities.LoadPropertyClassFactory('cel.pcfactory.object.light');
	Entities.LoadPropertyClassFactory('cel.pcfactory.logic.trigger');

	var nowrun = false;
	var nowturn = false;

	// 创建Player。
	var player = Entities.CreateEntity();
	player.name = 'player';
	
	prop_zone = Entities.CreatePropertyClass(player,'pczonemanager');
	prop_pm = Entities.CreatePropertyClass(player,'pcmesh');
	prop_cam = Entities.CreatePropertyClass(player,'pcdefaultcamera');
	prop_input = Entities.CreatePropertyClass(player,'pccommandinput');
	prop_ment = Entities.CreatePropertyClass(player,'pclinearmovement');
	prop_pcactor = Entities.CreatePropertyClass(player,'pcactormove');
	prop_collision = Entities.CreatePropertyClass(player,'pccollisiondetection');

	prop_zone.PerformAction('Load',['path','.'],['file','/art/world.xml']);
	prop_cam.PerformAction("SetCamera",['modename', 'firstperson']);
	prop_cam.PerformAction('SetZoneManager',['entity',player.name],['region','main'],['start','Camera']);
	
	prop_ment.SetProperty('gravity', 19.6);
	
	// 添加移动和旋转速度 
	prop_pcactor.PerformAction('SetSpeed',['movement',400],['running',2],['rotation',5],['jumping',3]);
	
	// 设定一个mesh的名称。
	prop_pm.PerformAction('SetMesh', ['name','Player']);
	//为消息绑定键位
	//向前走
	prop_input.PerformAction('Bind',['trigger','w'],['command','forward']);
	//向后走
	prop_input.PerformAction('Bind',['trigger','s'],['command','backward']);
	//左转
	prop_input.PerformAction('Bind',['trigger','a'],['command','rotateleft']);
	//右转
	prop_input.PerformAction('Bind',['trigger','d'],['command','rotateright']);
	//跳跃（并未实现）
	prop_input.PerformAction('Bind',['trigger','space'],['command','jump']);
	//系统退出
	prop_input.PerformAction('Bind',['trigger','q'],['command','TESTINGMYquit']);
	//控制视角
	prop_input.PerformAction('Bind',['trigger','e'],['command','rotateup']);
	prop_input.PerformAction('Bind',['trigger','c'],['command','rotatedown']);
	//切换不同的视角tab键
	prop_input.PerformAction('Bind',['trigger','tab'],['command','changeview']);
	//鼠标移动
	prop_input.PerformAction('Bind',['trigger','MouseAxis0'],['command','mousemove']);
	//消息函数及其实现动作
	player.behaviour = function(msgid,pc,p1,p2,p3,p4,p5){
	    //先前走
		if(msgid.indexOf('forward1')!=-1) {
			prop_pcactor.PerformAction('Forward', ['start', true]);
			prop_pm.PerformAction('SetAnimation',['animation','run'],['cycle',true],['reset', false]);
			nowrun = true;
		}else if(msgid.indexOf('forward0')!=-1) {
			prop_pcactor.PerformAction('Forward', ['start', false]);
			
			if(nowturn) {
				prop_pm.PerformAction('SetAnimation',['animation','run'],['cycle',true],['reset', false]);
			} else {
				prop_pm.PerformAction('SetAnimation',['animation','stand'],['cycle',true],['reset', true]);
			}
			
			nowrun = false;
		}
		//退出
		if(msgid.indexOf('TESTINGMYquit0')!=-1) {
			System.Quit();
		}
		if(msgid.indexOf('backward1')!=-1) {
			prop_pcactor.PerformAction('Backward', ['start', true]);
			prop_pm.PerformAction('SetAnimation',['animation','run'],['cycle',true],['reset', false]);
			nowrun = true;
		}
		//向后走
		if(msgid.indexOf('backward0')!=-1) {
			prop_pcactor.PerformAction('Backward', ['start', false]);
			if(nowturn) {
				prop_pm.PerformAction('SetAnimation',['animation','run'],['cycle',true],['reset', false]);
			} else {
				prop_pm.PerformAction('SetAnimation',['animation','stand'],['cycle',true],['reset', true]);
			}
			
			nowrun = false;
		}
        //左转
		if(msgid.indexOf('rotateleft1')!=-1) {
			prop_pcactor.PerformAction('RotateLeft', ['start', true]);

			prop_pm.PerformAction('SetAnimation',['animation','run'],['cycle',true],['reset', false]);

			nowturn = true;
		}
		if(msgid.indexOf('rotateleft0')!=-1) {
			prop_pcactor.PerformAction('RotateLeft', ['start', false]);

			if(nowrun) {
				prop_pm.PerformAction('SetAnimation',['animation','run'],['cycle',true],['reset', false]);
			} else {
				prop_pm.PerformAction('SetAnimation',['animation','stand'],['cycle',true],['reset', true]);
			}

			nowturn = false;

		}
        //右转
		if(msgid.indexOf('rotateright1')!=-1) {
			prop_pcactor.PerformAction('RotateRight', ['start', true]);

			prop_pm.PerformAction('SetAnimation',['animation','run'],['cycle',true],['reset', false]);

			nowturn = true;

		}
		if(msgid.indexOf('rotateright0')!=-1) {
			prop_pcactor.PerformAction('RotateRight', ['start', false]);
			if(nowrun) {
				prop_pm.PerformAction('SetAnimation',['animation','run'],['cycle',true],['reset', false]);
			} else {
				prop_pm.PerformAction('SetAnimation',['animation','stand'],['cycle',true],['reset', true]);
			}
			nowturn = false;
		}
		//向上调视角
		if(msgid.indexOf('rotateup1')!=-1) {
			prop_cam.SetProperty('pitchvelocity',1.0);
		}
		
		if(msgid.indexOf('rotateup0')!=-1) {
			prop_cam.SetProperty('pitchvelocity',0.0);

			alert(prop_pm.GetProperty("position"));
		}
		//向下调视角
		if(msgid.indexOf('rotatedown1')!=-1) {
			prop_cam.SetProperty('pitchvelocity',-1.0);
		}
		
		if(msgid.indexOf('rotatedown0')!=-1) {
			prop_cam.SetProperty('pitchvelocity',0.0);
		}
		//tab改变视角
		if(msgid.indexOf('changeview0')!=-1) {
			prop_pcactor.PerformAction('ToggleCameraMode',[]);
		}
		//鼠标移动改变视角
		if(msgid.indexOf('mousemove')!=-1) {
			prop_cam.SetProperty('pitch', -p2[1]); //调整摄像机上下角度
			prop_cam.SetProperty('yaw', p1[1]);
		}
	}

	
}catch(e){
	alert('error:',e);
}