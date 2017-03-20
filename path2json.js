var arr = [
	{
		path: 'a.b.c.d',
		value: 1
	},
	{
		path: 'a.b.x',
		value: true
	},
	{
		path: 'a.b.c.d.f',
		value: 4
	}
];

var resolver = function(list){
	var object = {};
	for(var i = 0; i<list.length; i++){
		(function(item){
			var paths = (item.path).split('.');
			var last = object;
			for(var j=0; j<paths.length; j++){
				var tmp = paths[j];
				if(paths[j+1]){
					last[tmp] = last[tmp] || {};
				}else{
					if( (/Boolean|Number|String/).test({}.toString.call(last[tmp])) ){
						throw new Error('结构冲突');
					};
					last[tmp] = item.value;
				};
				last = last[tmp];
			};
		})(list[i]);
	};
	return object;
};
var data = resolver(arr);
console.log(JSON.stringify(data));