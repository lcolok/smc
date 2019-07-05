export default {
        descriptionList(state) {
                let suffixJSON = {};
                let suffixList = state.suffixList;
                state.fileDescription.forEach((eachType, index) => {
                        eachType.suffix.forEach((eachSuffix, index) => {
                                suffixJSON[eachSuffix] = eachType;
                                // delete suffixJSON[eachSuffix].suffix;//可以删除json里的一项key
                        });

                        suffixList.push({
                                count: 0,
                                icon: eachType.icon,
                                size: eachType.size,
                                typeName: eachType.typeName,
                        })

                });
                return suffixJSON;
        },
        placeholderList(state) {
                let map = {};
                state.placeholderMapping.forEach((eachType, index) => {
                        let suffix = eachType.suffix||[eachType.name] 
                        suffix.forEach((eachSuffix, index) => {
                                map[eachSuffix] = eachType;
                                // delete suffixJSON[eachSuffix].suffix;//可以删除json里的一项key
                        });
                })
                return map;
        }
};