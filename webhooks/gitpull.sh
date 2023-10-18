cd $1
git checkout $2
git pull origin $2
npm i
pm2 restart $2