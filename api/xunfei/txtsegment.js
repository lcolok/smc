module.exports = function(tempItemData) {
	//本地断句
	if (!/[\u4e00-\u9fa5]/.test(tempItemData)) {
		tempItemData = tempItemData.replace(/\./g, ' ' + '.\n');
	} else {
		tempItemData = tempItemData
			.replace(/\r/g, '')
			.replace(/\n/g, ' \n')
			.replace(/!/g, '!\n')
			.replace(/！/g, '！\n')
			.replace(/？/g, '？\n')
			.replace(/\?/g, '?\n')
			.replace(/(\.{3,})/g, '...\n')
			.replace(/……/g, '……\n')
			.replace(/。/g, '。\n')
			.replace(/;/g, ';\n')
			.replace(/；/g, '；\n')
			.replace(/</g, '<' + ' ')
			.replace(/>/g, ' ' + ' ');
	}
	tempArray = tempItemData.split('\n'); //断句

	function replaceSpace() {
		for (var l = 0; l < tempArray.length; l++) {
			if (tempArray[l].replace(/(^\s*)/g, '').length == 0) {
				tempArray.splice(l, 1);
				replaceSpace();
			}
		}
	}

	function duandianNum(obj, num) {
		var tempArrays = obj.replace(/(.{50})/g, '$1\n');
		tempArray.splice(num, 1, tempArrays);
		tempArray = tempArray.join('\n').split('\n');
	}

	function edittext() {
		//单句超过50个字断句逻辑
		for (var l = 0; l < tempArray.length; l++) {
			if (tempArray[l].length > 50) {
				if (
					tempArray[l].indexOf(',') != -1 ||
					tempArray[l].indexOf('，') != -1 ||
					tempArray[l].indexOf('、') != -1 ||
					tempArray[l].indexOf('：') != -1 ||
					tempArray[l].indexOf(':') != -1 ||
					tempArray[l].indexOf('》') != -1 ||
					tempArray[l].indexOf('——') != -1 ||
					tempArray[l].indexOf(' ') != -1
				) {
					if (
						tempArray[l].indexOf(',') == tempArray[l].length - 1 ||
						tempArray[l].indexOf('，') == tempArray[l].length - 1 ||
						tempArray[l].indexOf('、') == tempArray[l].length - 1 ||
						tempArray[l].indexOf(':') == tempArray[l].length - 1 ||
						tempArray[l].indexOf('：') == tempArray[l].length - 1 ||
						tempArray[l].indexOf('》') == tempArray[l].length - 1 ||
						tempArray[l].indexOf('——') == tempArray[l].length - 1 ||
						tempArray[l].indexOf(' ') == tempArray[l].length - 1
					) {
						duandianNum(tempArray[l], l);
					} else {
						var tempArrays = tempArray[l]
							.replace(/\s/g, ' \n')
							.replace(/，/g, '，\n')
							.replace(/,/g, ',\n')
							.replace(/、/g, '、\n')
							.replace(/:/g, ':\n')
							.replace(/：/g, '：\n')
							.replace(/》/g, '》\n')
							.replace(/——/g, '——\n')
							.split('\n');
						duandianSymbol(tempArrays, l);
					}
				} else {
					if (tempArray[l].indexOf('.') != -1) {
						if (
							tempArray[l].indexOf('.') == tempArray[l].length - 1 ||
							trys > 4
						) {
							trys = 0;
							duandianNum(tempArray[l], l);
						} else {
							trys++;
							var tempArrays = tempArray[l].split('.');
							for (var a = 0; a < tempArrays.length; a++) {
								if (a != 0) {
									if (!/^[0-9]*$/.test(tempArrays[a].substr(0, 1))) {
										tempArrays[a] = '\n' + tempArrays[a];
									}
								}
							}
							tempArrays = tempArrays.join('.').split('\n');
							duandianSymbol(tempArrays, l);
						}
					} else {
						var tempArrays = tempArray[l].replace(/(.{50})/g, '$1 \n');
						tempArray.splice(l, 1, tempArrays);
						tempArray = tempArray.join('\n').split('\n');
						edittext();
					}
				}
			}
		}
	}

	function duandianSymbol(obj, num) {
		var temp = '',
			total_length = 0,
			isFirst = true;
		for (var h = 0; h < obj.length; h++) {
			if (obj[h].length > 50) {
				obj[h] = obj[h].replace(/(.{50})/g, '$1\n');
			}
			total_length += obj[h].length;
			if (total_length > 50 && isFirst) {
				isFirst = false;
				temp += '\n';
			}
			temp += obj[h];
		}
		tempArray.splice(num, 1, temp);
		tempArray = tempArray.join('\n').split('\n');
	}

	edittext();
	replaceSpace();
	return tempArray;
};
