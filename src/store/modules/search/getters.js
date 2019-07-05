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
};