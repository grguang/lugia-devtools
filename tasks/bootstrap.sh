root_path=$PWD
lugiacomplie="$root_path/node_modules/.bin/lugia-complie"
lerna="$root_path/node_modules/.bin/lerna"

cd "$root_path"
yarn --version
yarn config set registry http://192.168.102.79:5001/
yarn config get registry
$lerna bootstrap "$@"

cd "$root_path"/packages/devtools-core
$lugiacomplie build

cd "$root_path"/packages/devtools-material
$lugiacomplie build
cd "$root_path"/packages/devtools-conversion
$lugiacomplie build