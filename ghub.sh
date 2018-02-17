echo "Directory: $PWD"
git add -A
echo "Files Added"
git commit -m "$1"
echo "Files committed with $1"
git push origin master
echo "Class Repo Updated"