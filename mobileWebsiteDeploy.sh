REMOTE_USER="mobile@covidsupport.neera.ai"
yarn --cwd="web" build
rsync -r --exclude="node_modules" ./ $REMOTE_USER:~/covid_app
# The server is running as a pm2 process on the server and you restart it
# For frontend 
# serve -s build -p 3001
# is running
# TODO: The deployment script breaks if there is a new dependency on the backend
# I can fix it, but I am not bothering, it will just make the deployment script slow
# Will do it after I have users
ssh -o StrictHostKeyChecking=no $REMOTE_USER "pm2 reload all"
 
