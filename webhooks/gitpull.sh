echo $1 $2
cd $1
git checkout $2
git pull origin $2
npm i
pm2 restart $2 --watch --log-date-format 'DD-MM HH:mm:ss.SSS'