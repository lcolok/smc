const path = require('path');
const fs = require('fs');
const requireContext = require('require-context');
const tasksPath = path.resolve('./server/core/init/');
const tasks = requireContext(
        tasksPath, false, /init/)

tasks.keys()
        .filter(name => !name.includes(__filename.split('/').pop()))//排除掉自己
        .forEach(key => {
                const matched = key.match(/([A-Za-z0-9-_]+)\./i)
                if (matched && matched.length > 1) {
                        require(tasksPath + '/' + key);
                }
        })